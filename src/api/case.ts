import { MaybeRef } from '@vueuse/core'
import { useRequest } from '~/composables/useGqlRequest'
import { DmsData, TableResponse } from '~/type'
import caseListGql from '~/graphql/case/list'
import caseUpdateGql from '~/graphql/case/update'
import caseCreateGql from '~/graphql/case/create'
import caseItemGql from '~/graphql/case/item'
import caseDeleteGql from '~/graphql/case/delete'

export interface Case {
  id?: string
  number: string
  idNumber: string
  name: string
  phone: string
  cause: string
  status: string
  createdAt?: Date
}

interface CaseVars extends Partial<Case> {
  page: number
  pageSize: number
}

export const useFetchCases = (vars: MaybeRef<CaseVars>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    TableResponse<Case>,
    MaybeRef<CaseVars>
  >('cases', caseListGql, vars, {
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

export const useFetchCase = (id: MaybeRef<string>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    DmsData<Case>,
    MaybeRef<{ id: string }>
  >(
    'case',
    caseItemGql,
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

export const useCreateCase = (params: MaybeRef<Partial<Case>>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    DmsData<Case>,
    MaybeRef<Partial<Case>>
  >('createCase', caseCreateGql, params, {
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

export const useUpdateCase = (params: MaybeRef<Partial<Case>>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    DmsData<Case>,
    MaybeRef<Partial<Case>>
  >('updateCase', caseUpdateGql, params, {
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

export const useDeleteCase = (id: MaybeRef<string>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    DmsData<Case>,
    MaybeRef<{ id: string }>
  >(
    'deleteCase',
    caseDeleteGql,
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
