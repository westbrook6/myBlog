import { MaybeRef } from '@vueuse/core'
import { useRequest } from '~/composables/useGqlRequest'
import { DmsData, TableResponse } from '~/type'
import articleListGql from '~/graphql/reportArticle/list'
import articleUpdateGql from '~/graphql/reportArticle/update'
import articleCreateGql from '~/graphql/reportArticle/create'
import articleItemGql from '~/graphql/reportArticle/item'
import articleDeleteGql from '~/graphql/reportArticle/delete'

export interface Article {
  id?: string
  title: string
  subTitle: string
  content: string
  createdAt?: Date
}

interface ArticleVars extends Partial<Article> {
  page: number
  pageSize: number
}

export const useFetchArticles = (vars: MaybeRef<ArticleVars>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    TableResponse<Article>,
    MaybeRef<ArticleVars>
  >('reportArticles', articleListGql, vars, {
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

export const useFetchArticle = (id: MaybeRef<string>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    DmsData<Article>,
    MaybeRef<{ id: string }>
  >(
    'reportArticle',
    articleItemGql,
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

export const useCreateArticle = (params: MaybeRef<Partial<Article>>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    DmsData<Article>,
    MaybeRef<Partial<Article>>
  >('createReportArticle', articleCreateGql, params, {
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

export const useUpdateArticle = (params: MaybeRef<Partial<Article>>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    DmsData<Article>,
    MaybeRef<Partial<Article>>
  >('updateReportArticle', articleUpdateGql, params, {
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

export const useDeleteArticle = (id: MaybeRef<string>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    DmsData<Article>,
    MaybeRef<{ id: string }>
  >(
    'deleteReportArticle',
    articleDeleteGql,
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
