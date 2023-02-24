import { MaybeRef } from '@vueuse/core'
import { useRequest } from '~/composables/useGqlRequest'
import { DmsData, TableResponse } from '~/type'
import lawArticleListGql from '~/graphql/lawArticle/list'
import lawArticleItemsGql from '~/graphql/lawArticle/item'
export interface LawArticle {
  id?: string
  title: string
  subTitle: string
  content: string
  createdAt?: Date
}

export interface LawArticleVars {
  page: number
  pageSize: number
}

export const useFetchLawArticles = (params: MaybeRef<LawArticleVars>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    TableResponse<LawArticle>,
    MaybeRef<LawArticleVars>
  >('lawArticles', lawArticleListGql, params, {
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

export const useFetchLawArticle = (id: MaybeRef<string>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    DmsData<LawArticle>,
    MaybeRef<{ id: string }>
  >(
    'lawArticle',
    lawArticleItemsGql,
    computed(() => {
      return { id: unref(id) }
    }),
    {
      immediate: true
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
