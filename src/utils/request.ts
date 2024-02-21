import loginStore from '@/stores/login'
import { getEnvValue } from './index'
import axios, { type AxiosRequestConfig, type AxiosRequestHeaders } from 'axios'
import { storeToRefs } from 'pinia'
import httpEnums from '@/constant/httpEnums'
import { showFailToast, showNotify } from 'vant'
import router from '@/router'
// create an axios instance
const service = axios.create({
  baseURL: getEnvValue('VITE_APP_BASE_API'),
  timeout: 10000
})

// 一段时间内的提示显示的防抖，防抖时间设置为5秒
let errMsgDebounceTimer: any = null
const errMsgDebounceWait = 500

const store = loginStore()
const { token } = storeToRefs(store)

// 1、自定义请求接口headers头参数类型
type RequestHeader = AxiosRequestHeaders & { token?: string }

// 2、自定义请求接口request参数类型，可以加一些自己自定义的参数
interface RequestConfig extends AxiosRequestConfig {
  isApp?: boolean // 是否是App
}
// 3、自定义请求接口response参数类型
export interface RequestInterceptorsConfig extends RequestConfig {
  headers?: RequestHeader
}
// request interceptor
service.interceptors.request.use(
  async (config: any) => {
    if (token.value) {
      config.headers!.token = `${token.value}`
    }
    return config
  },
  (error) => {
    console.log(error) // for debug
    return Promise.reject(error)
  }
)
// response interceptor
service.interceptors.response.use(
  async (response) => {
    const res = response.data
    const statusCode = res.code

    // blob文件流
    if (res instanceof Blob) {
      return res
    }
    // 成功
    if (statusCode === httpEnums.CODES.Success || [0, 1].includes(statusCode)) {
      return res
    }

    // token失效
    if (statusCode === httpEnums.CODES.UnAuthorized) {
      return Promise.reject(new Error('token过期!'))
    }

    const errMsg = res.message || res.msg

    showNotify({
      message: errMsg || 'Error',
      type: 'danger',
      duration: 5 * 1000,
      position: 'bottom'
    })

    return Promise.reject(new Error(errMsg || 'Error'))
  },
  async (error) => {
    // 定时器提示报错的防抖
    const errorDebounceHandler = (errorMessage: string) => {
      if (errMsgDebounceTimer) clearTimeout(errMsgDebounceTimer)
      const callNow = !errMsgDebounceTimer
      errMsgDebounceTimer = setTimeout(() => {
        errMsgDebounceTimer = null
      }, errMsgDebounceWait)
      if (callNow) {
        showFailToast({ message: errorMessage })
        // showNotify({
        //   message: errorMessage,
        //   type: 'danger',
        //   duration: errMsgDebounceWait,
        //   position: 'bottom'
        // })
      }
    }

    const errorData = error.response.data
    const errorStatus = error.response.status
    // console.log('=====', error.response.data.msg)
    if (errorStatus === httpEnums.HTTP_STATUS.REQUEST_ERROR.UnAuthorized) {
      // errorDebounceHandler(error.message)
      // 删除下token
      store.resetToken()
      errorDebounceHandler(error.response.data.msg)
      router.push({
        name: 'Login'
      })
    } else if (errorData.code === httpEnums.HTTP_STATUS.SERVER_ERROR.InternalServerError) {
      // 500 特殊处理
      return Promise.reject(error)
    } else {
      // errorDebounceHandler(error.response.data.msg)
      return Promise.reject(error)
    }
  }
)
export default service
