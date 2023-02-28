import { MaybeRef } from '@vueuse/core'
import { useRequest } from '~/composables/useGqlRequest'
import { DmsData, TableResponse } from '~/type'
import articleListGql from '~/graphql/article/list'
import articleItemGql from '~/graphql/article/item'

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
  >('articles', articleListGql, vars, {
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
    'article',
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
