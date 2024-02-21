import { defineStore } from 'pinia'
import { ref } from 'vue'
import Cookies from 'js-cookie'
// 手动添加cookie
const cookiesStorage = {
    setItem(key) {
        const store = loginStore()
        return Cookies.set(key, store.token)
    },
    getItem(key) {
        return JSON.stringify({
            token: Cookies.get(key)
        })
    }
}

const loginStore = defineStore(
    'login',
    () => {
        const token = ref('')
        const setToken = (val: string) => {
            token.value = val
        }
        const resetToken = () => {
            token.value = ''
        }
        return {
            token,
            setToken,
            resetToken
        }
    },
    {
        persist: {
            storage: cookiesStorage
        }
    }
)

export default loginStore
