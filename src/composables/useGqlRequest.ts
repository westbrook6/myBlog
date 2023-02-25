import { Ref, onMounted, ref } from 'vue'
import { DocumentNode } from 'graphql'
import { MaybeRef } from '@vueuse/core'
import { useBoolean } from '~/composables/useBoolean'
import { useError } from '~/composables/useError'
import { useQuery } from '~/composables/useApollo'

export interface ApolloContext {
  forbidToken?: boolean
}

export interface RequestOptions<Result> {
  success?: (res: Result) => void
  fail?: (error: Error) => void
  final?: () => void
  init?: Result | null
  immediate?: boolean
  apolloContext?: ApolloContext
}

export const useRequestWrap = <Result>(
  fetchFn: () => Promise<Result>,
  options: RequestOptions<Result> & { immediate?: boolean } = {}
) => {
  const { error, setError } = useError()
  const { bool: loading, set: setLoading } = useBoolean()
  const { bool: loaded, open } = useBoolean()
  const success: RequestOptions<Result>['success'][] = []
  const fail: RequestOptions<Result>['fail'][] = [(err) => console.error(err)]
  const final: RequestOptions<Result>['final'][] = []
  const result: Ref<Result | null> = ref(
    options.init || null
  ) as Ref<Result | null>
  options.success && success.push(options.success)
  options.fail && fail.push(options.fail)
  options.final && final.push(options.final)
  const immediate = options.immediate === undefined ? true : options.immediate
  const fetch = async () => {
    setLoading(true)
    try {
      const data = await fetchFn()
      result.value = data
      for (const fn of success) {
        typeof fn === 'function' && (await fn(data))
      }
      setError()
    } catch (e) {
      result.value = null
      for (const fn of fail) {
        typeof fn === 'function' && (await fn(e as Error))
      }
      setError(e as Error)
    } finally {
      setLoading(false)
      open()
      for (const fn of final) {
        typeof fn === 'function' && (await fn())
      }
    }
    return result.value
  }
  onMounted(async () => {
    if (immediate) {
      await fetch()
    }
  })
  return {
    loaded,
    result,
    error,
    loading,
    fetch,
    onSuccess: (fn: RequestOptions<Result>['success']) => success.push(fn),
    onFail: (fn: RequestOptions<Result>['fail']) => fail.push(fn),
    onFinal: (fn: RequestOptions<Result>['final']) => fail.push(fn),
  }
}

export const useRequest = <Result, Vars>(
  propName: string,
  gql: DocumentNode,
  variables: Vars,
  options: RequestOptions<Result> = {}
) => {
  const fetchFn = async () => {
    const res: any = await useQuery<Result>({
      query: gql,
      variables,
      context: options.apolloContext || {},
    })()
    if (res.error) {
      throw new Error(res.error)
    }
    return res.data[propName] as Result
  }
  return useRequestWrap(fetchFn, options)
}

export const useBatchMutate = <Vars, Result>(
  mutateFn: (variables?: MaybeRef<Vars>) => Promise<{ data: Result }>,
  key: string
) => {
  const loading = ref(false)
  const success: (() => any)[] = []
  const fail: (() => any)[] = []
  const result = ref<Result[]>([])

  const promiseArr = [] as Promise<any>[]
  const batchOperate = (params: MaybeRef<Vars[]>) => {
    loading.value = true
    const data = unref(params)
    if (data.length) {
      for (let i = 0; i < data.length; i++) {
        promiseArr.push(mutateFn(data[i]))
      }
      Promise.all(promiseArr)
        .then(async (data) => {
          loading.value = false
          if (data.length) {
            result.value = data.map((item) => item[key])
            const hasError = data.find((item: any) => item?.error)
            if (hasError) {
              for (const fn of fail) {
                typeof fn === 'function' && (await fn())
              }
              return
            }
          }
          result.value = []
          for (const fn of success) {
            typeof fn === 'function' && (await fn())
          }
        })
        .catch(async () => {
          loading.value = false
          result.value = []
          for (const fn of fail) {
            typeof fn === 'function' && (await fn())
          }
        })
    }
  }

  return {
    onSuccess: (fn: () => any) => success.push(fn),
    onFail: (fn: () => any) => fail.push(fn),
    batchOperate,
    loading,
    result,
  }
}
