import { MaybeRef } from '@vueuse/core'
import { useRequest } from '~/composables/useGqlRequest'
import { DmsData, TableResponse, } from '~/type'
import { Attachment } from '~/api/media'
import homeListGql from '~/graphql/home/list'
import homeUpdateGql from '~/graphql/home/update'
import homeCreateGql from '~/graphql/home/create'
import homeItemGql from '~/graphql/home/item'
import homeDeleteGql from '~/graphql/home/delete'

export interface Home {
  id?: string
  name: string
  description: string
  avatar: DmsData<Attachment>
  createdAt?: Date
}

interface HomeVars extends Partial<Home> {
  page: number
  pageSize: number
}

export const useFetchHomes = (vars: MaybeRef<HomeVars>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    TableResponse<Home>,
    MaybeRef<HomeVars>
  >('homes', homeListGql, vars, {
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

export const useFetchHome = (id: MaybeRef<string>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    DmsData<Home>,
    MaybeRef<{ id: string }>
  >(
    'home',
    homeItemGql,
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

export const useCreateHome = (params: MaybeRef<Partial<Home>>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    DmsData<Home>,
    MaybeRef<Partial<Home>>
  >('createHome', homeCreateGql, params, {
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

export const useUpdateHome = (params: MaybeRef<Partial<Home>>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    DmsData<Home>,
    MaybeRef<Partial<Home>>
  >('updateHome', homeUpdateGql, params, {
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

export const useDeleteHome = (id: MaybeRef<string>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    DmsData<Home>,
    MaybeRef<{ id: string }>
  >(
    'deleteReportHome',
    homeDeleteGql,
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
