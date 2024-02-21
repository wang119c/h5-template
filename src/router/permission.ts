import { getObjectType } from '@/utils'
import { ROUTE_WHITE_LIST } from '@/constant/enums'
import router from '@/router'
import { storeToRefs } from 'pinia'
import loginStore from "@/stores/login.ts";

router.beforeEach(async (to: any, _from: any, next: any) => {
    const store = loginStore()
    const { token } = storeToRefs(store)
    const { path } = to
    const isInWhiteList = ROUTE_WHITE_LIST.filter((item) => {
        if (
            (getObjectType(item) === 'string' && item === path) ||
            (getObjectType(item) === 'regexp' && item.test(path))
        ) {
            return true
        } else {
            return false
        }
    })
    // 判断是否登录
    if (token.value) {
        // 获取最新的用户信息
        try {
            next()
        } catch (err) {
            console.log(err)
        }
    } else {
        if (isInWhiteList.length > 0) {
            next()
        } else {
            next({
                name: 'Login'
            })
        }
    }
})
