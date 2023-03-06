import { Ref, ref } from 'vue'
import { MaybeRef } from '@vueuse/core'
import { useRouter } from 'vue-router'
import { useRequest, useBatchMutate } from '~/composables/useGqlRequest'
import authLogin from '~/graphql/user/authLogin'
import { useUser } from '~/store/user'
import usersPermissionsUserGql from '~/graphql/user/usersPermissionsUser'
import usersPermissionsUsersGql from '~/graphql/user/usersPermissionsUsers'
import createUsersPermissionsUserGql from '~/graphql/user/register'
import updateUsersPermissionsUserGql from '~/graphql/user/update'
import deleteUserGql from '~/graphql/user/delete'
import { DmsData, DmsDataArr, TableResponse } from '~/type'
import { useMutate, useQuery } from '~/composables/useApollo'
import { ElMessage } from 'element-plus'

export interface UserInfo {
  id: string
  username: string
  email: string
  confirmed: boolean
  permissions: string
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
  userType: string
  subAccounts: DmsDataArr<UserDetail>
  gender: string
  birthday: string
  phone: string
  displayName: string
  createdAt: string
  permissions: string
}
interface UserFormVars extends Omit<Partial<UserDetail>, 'user'> {
  id?: string
  password: string | undefined
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
          const permissionStr = userDetailData.attributes.permissions
          if (permissionStr) {
            userStore.userPermissions = JSON.parse(permissionStr) || []
          }
          if (userStore.userInfo.username === 'admin') {
            router.push('/case')
          }
          if (userStore.userPermissions.length) {
            router.push(userStore.userPermissions[0])
          }
        }
      }
    } catch (error) {
      ElMessage.error('failed to login')
      logout()
      console.error('error from login', error)
    }
  })

  onFail(() => {
    ElMessage.error('用户名或密码错误')
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
      path: '/login'
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
export const updateUserFn = useMutate<
  { updateUsersPermissionsUser: DmsData<UserDetail> },
  MaybeRef<UserFormVars>
>({
  mutation: updateUsersPermissionsUserGql
})
export const directUpdateUser = (params: MaybeRef<UserFormVars>) => {
  return updateUserFn(params)
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
export const useCreateUser = (params: Ref<UserFormVars>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    DmsData<UserDetail>,
    Ref<UserFormVars>
  >('register', createUsersPermissionsUserGql, params, {
    immediate: false
  })

  return {
    result,
    onSuccess,
    onFail,
    fetch,
    loading
  }
}
export const useUpdateUser = (params: Ref<UserFormVars>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    DmsData<UserDetail>,
    Ref<UserFormVars>
  >('updateUsersPermissionsUser', updateUsersPermissionsUserGql, params, {
    immediate: false
  })

  return {
    result,
    onSuccess,
    onFail,
    fetch,
    loading
  }
}

export const useFetchUsers = (params: MaybeRef<FetchUsersVars>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    TableResponse<UserDetail>,
    MaybeRef<FetchUsersVars>
  >('usersPermissionsUsers', usersPermissionsUsersGql, params, {
    immediate: true
  })

  return {
    result,
    onSuccess,
    onFail,
    fetch,
    loading
  }
}
export const useFetchUserDetail = (id: Ref<string>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    DmsData<UserDetail>,
    Ref<{ id: string }>
  >(
    'usersPermissionsUser',
    usersPermissionsUserGql,
    computed(() => {
      return { id: id.value }
    }),
    {
      immediate: false
    }
  )

  return {
    result,
    onSuccess,
    onFail,
    fetch,
    loading
  }
}
export const useBatchDeleteUser = () => {
  const deleteFn = useMutate<DmsData<UserDetail>, MaybeRef<{ id: string }>>({
    mutation: deleteUserGql
  })
  return useBatchMutate(deleteFn, 'deleteUsersPermissionsUser')
}
export const useDeleteUser = (id: MaybeRef<string>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    DmsData<UserDetail>,
    MaybeRef<{ id: string }>
  >(
    'deleteUsersPermissionsUser',
    deleteUserGql,
    computed(() => {
      return { id: unref(id) }
    }),
    {
      immediate: false
    }
  )
  return {
    result,
    onSuccess,
    onFail,
    fetch,
    loading
  }
}
