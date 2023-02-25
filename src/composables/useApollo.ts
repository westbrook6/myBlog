import type { QueryOptions } from '@apollo/client/core/watchQueryOptions'
import type { MutationOptions } from '@apollo/client'
import { unref } from 'vue'
import type { MaybeRef } from '@vueuse/core'
import apolloClient from '~/apollo/client'
import { filerRedundantProps } from '~/utils/utilFunc'

export const useQuery = <Result, Var = {}>(
  request: QueryOptions<Var, Result>
) => {
  return async () => {
    const options: QueryOptions<Var, Result> = {
      ...request,
      variables:
        request.variables &&
        unref(request.variables) &&
        filerRedundantProps(unref(request.variables)),
      fetchPolicy: 'no-cache'
    }
    try {
      const { data, errors } = await apolloClient.query<Result, Var>(options)
      return {
        error: errors,
        data: JSON.parse(JSON.stringify(data)) as Result
      }
    } catch (e: any) {
      if ((e + '').includes('401')) {
        sessionStorage.removeItem('token')
      }
      return {
        error: e,
        data: null
      }
    }
  }
}

export const useMutate = <Result, Var = {}>(
  request: MutationOptions<Result, Var>
) => {
  return async (variables?: MaybeRef<Var>) => {
    const unrefVariables = unref(variables || {}) as Var
    const options: MutationOptions<Result, Var> = {
      ...request,
      variables: unrefVariables
    }
    if (variables) options.variables = variables as Var
    try {
      const { data, errors } = await apolloClient.mutate<Result, Var>(options)
      return {
        error: errors,
        data: JSON.parse(JSON.stringify(data)) as Result
      }
    } catch (e) {
      return {
        error: e,
        data: null
      }
    }
  }
}
