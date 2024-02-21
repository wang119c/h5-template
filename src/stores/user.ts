import { getProfileApi } from '@/api/user'
import { defineStore } from 'pinia'
import { ref } from 'vue'
const userStore = defineStore(
  'user',
  () => {
    const profile = ref(null)
    const getProfile = async () => {
      try {
        const res = await getProfileApi({})
        profile.value = res.data
      } catch (e) {
        console.log(e)
      }
    }
    const clearProfile = () => {
      profile.value = null
    }
    return {
      getProfile,
      clearProfile,
      profile
    }
  },
  {
    persist: true
  }
)
export default userStore
