import type { App } from 'vue'
import SvgIcon from './SvgIcon/index.vue'

export const components = {
    SvgIcon
}
export default (app: App) => {
    // 注册全局组件
    Object.keys(components).forEach((key) => {
        app.component(key, components[key])
    })
}
