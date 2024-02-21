import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Vant from 'vant'
import 'vant/lib/index.css'
import 'virtual:svg-icons-register'
import { initMockServer } from '@/mock/index'
import { initEruda } from '@/utils/tools'
// 引入pinia
import { createPinia } from 'pinia'
// 引入pinia 持久化插件
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import '@/styles/index.less'
import '@/router/permission'
import installComponents from '@/components/index'


// 初始化
initEruda()
initMockServer()

const app = createApp(App)
// 注册全局组件
installComponents(app)
// 注册pinia
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(Vant)
app.use(pinia)
app.use(router)

app.mount('#app')
