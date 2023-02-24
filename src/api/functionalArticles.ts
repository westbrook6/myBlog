import { MaybeRef } from '@vueuse/core'
import { useRequest } from '~/composables/useGqlRequest'
import { DmsData, TableResponse } from '~/type'
import functionalListGql from '~/graphql/functionalArticle/list'
import functionalItemsGql from '~/graphql/functionalArticle/item'
export interface Functional {
  id?: string
  title: string
  subTitle: string
  content: string
  createdAt?: Date
}

export interface FunctionalVars {
  page: number
  pageSize: number
}

export const useFetchFunctionals = (params: MaybeRef<FunctionalVars>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    TableResponse<Functional>,
    MaybeRef<FunctionalVars>
  >('functionalArticles', functionalListGql, params, {
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

export const useFetchFunctional = (id: MaybeRef<string>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    DmsData<Functional>,
    MaybeRef<{ id: string }>
  >(
    'functionalArticle',
    functionalItemsGql,
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
