import { MaybeRef } from '@vueuse/core'
import { useRequest } from '~/composables/useGqlRequest'
import { DmsData, TableResponse } from '~/type'
import articleListGql from '~/graphql/jjArticle/list'
import articleUpdateGql from '~/graphql/jjArticle/update'
import articleCreateGql from '~/graphql/jjArticle/create'
import articleItemGql from '~/graphql/jjArticle/item'
import articleDeleteGql from '~/graphql/jjArticle/delete'

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
  >('jingjianArticles', articleListGql, vars, {
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
    'jingjianArticle',
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
  >('createJingjianArticle', articleCreateGql, params, {
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
  >('updateJingjianArticle', articleUpdateGql, params, {
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
    'deleteJingjianArticle',
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
