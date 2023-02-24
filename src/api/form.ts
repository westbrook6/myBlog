import { MaybeRef } from '@vueuse/core'
import { useRequest } from '~/composables/useGqlRequest'
import { DmsData, TableResponse } from '~/type'
import formsBySlugGql from '~/graphql/form/formsBySlug'

export interface Form {
  id?: string
  rule?: string
  option?: string
  createdAt?: Date
}

export const useFetchFroms = (slug: MaybeRef<string>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    TableResponse<Form>,
    MaybeRef<{ slug: string }>
  >(
    'forms',
    formsBySlugGql,
    computed(() => {
      return { slug: unref(slug) }
    }),
    {
      immediate: true
    }
  )
  const formRule = computed(() => {
    return JSON.parse(
      JSON.stringify(result.value?.data?.[0].attributes.rule || [])
    )
  })
  const formOption = computed(() => {
    return JSON.parse(
      JSON.stringify(result.value?.data?.[0].attributes.option || [])
    )
  })

  return {
    formRule,
    formOption,
    result,
    onSuccess,
    onFail,
    fetch,
    loading
  }
}
