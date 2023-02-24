import { Ref, ref } from 'vue'
import { MaybeRef } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { useRequest } from '~/composables/useGqlRequest'
import authLogin from '~/graphql/user/authLogin'

import { useUser } from '~/store/user'
import usersPermissionsUserGql from '~/graphql/user/usersPermissionsUser'

import { DmsData, DmsDataArr, TableResponse } from '~/type'
import { useMutate, useQuery } from '~/composables/useApollo'
import { ElMessage } from 'element-plus'

export interface UserInfo {
  id: string
  username: string
  email: string
  confirmed: boolean
}

export interface Login {
  jwt: string
  user: UserInfo
}

interface LoginVars {
  identifier: string
  password: string
}

export interface UserDetail {
  id?: string
  username: string
  email: string
  createdAt: string
}

export interface FetchUsersVars {
  userName?: string
  email?: string
  page: number
  pageSize?: number
}

export const useLogin = (loginForm: MaybeRef<LoginVars>) => {
  const jwt = ref<string | undefined>()
  const user = ref<UserInfo | undefined>()
  const isAdmin = ref(true)
  const userStore = useUser()
  const router = useRouter()
  const { logout } = useLogout()

  const {
    result,
    onSuccess,
    onFail,
    fetch: login,
    loading
  } = useRequest<Login, MaybeRef<LoginVars>>(
    'login',
    authLogin,
    computed(() => {
      return unref(loginForm)
    }),
    {
      immediate: false,
      apolloContext: {
        forbidToken: true
      }
    }
  )

  onSuccess(async () => {
    try {
      if (result.value) {
        sessionStorage.setItem('token', result.value.jwt)
        jwt.value = result.value.jwt
        user.value = result.value.user
        userStore.token = result.value.jwt
        const userDetail = await directFetchUser(result.value?.user.id)
        if (userDetail.error) {
          throw new Error('error in fetch user detail')
        }
        const userDetailData = userDetail.data?.usersPermissionsUser?.data
        if (userDetailData) {
          userStore.userInfo = {
            id: userDetailData.id || '',
            ...userDetailData.attributes
          }
        }
        // router.push("/")
      }
    } catch (error) {
      ElMessage.error('failed to login')
      logout()
      console.error('error from login', error)
    }
  })

  const resObj = {
    jwt,
    user,
    isAdmin,
    login,
    onSuccess,
    onFail,
    loading
  }
  return resObj
}

export const useLogout = () => {
  const router = useRouter()
  const userStore = useUser()

  const logout = () => {
    userStore.clearUserData()
    sessionStorage.removeItem('token')
    router.push({
      path: "/login"
    })
  }
  return { logout }
}

export const directFetchUser = (id: string) => {
  return useQuery<
    { usersPermissionsUser: DmsData<UserDetail> },
    MaybeRef<{ id: string }>
  >({
    query: usersPermissionsUserGql,
    variables: { id }
  })()
}


export const useJudgeLogin = () => {
  const userStore = useUser()
  const { logout } = useLogout()
  const judgeLogin = ({
    tipOnly = false,
    showTip = true
  }: {
    tipOnly?: boolean
    showTip?: boolean
  }) => {
    if (!userStore.isLogin) {
      if (showTip) {
        ElMessage.warning('Please login first')
      }
      if (!tipOnly) {
        logout()
      }
      return false
    }
    return true
  }
  return {
    judgeLogin
  }
}
