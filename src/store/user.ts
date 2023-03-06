import { defineStore, storeToRefs } from 'pinia'
import { ref, computed } from 'vue'
import { UserDetail } from '@/api/user/user'

export const useUser = defineStore(
  'user',
  () => {
    const userInfo = ref<UserDetail | undefined>()
    const token = ref('')
    const userPermissions = ref<string[]>([])
    const isLogin = computed(() => {
      return !!userInfo.value?.username
    })
    const clearUserData = () => {
      userInfo.value = undefined
      token.value = ''
      userPermissions.value = []
    }

    return {
      userInfo,
      token,
      userPermissions,
      clearUserData,
      isLogin
    }
  },
  {
    persist: {
      storage: sessionStorage
    }
  }
)
export const useUserStore = () => {
  const userStore = useUser()
  return { ...userStore, ...storeToRefs(userStore) }
}
