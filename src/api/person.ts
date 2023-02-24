import { MaybeRef } from '@vueuse/core'
import { useRequest } from '~/composables/useGqlRequest'
import { DmsData, TableResponse } from '~/type'
import personListGql from '~/graphql/person/list'
import personUpdateGql from '~/graphql/person/update'
import personCreateGql from '~/graphql/person/create'
import personItemGql from '~/graphql/person/item'
import personDeleteGql from '~/graphql/person/delete'

export interface Person {
  id?: string
  name: string
  phone: string
  createdAt?: Date
}

interface PersonVars extends Partial<Person> {
  page: number
  pageSize: number
}

export const useFetchPersons = (vars: MaybeRef<PersonVars>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    TableResponse<Person>,
    MaybeRef<PersonVars>
  >('people', personListGql, vars, {
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

export const useFetchPerson = (id: MaybeRef<string>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    DmsData<Person>,
    MaybeRef<{ id: string }>
  >(
    'person',
    personItemGql,
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

export const useCreatePerson = (params: MaybeRef<Partial<Person>>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    DmsData<Person>,
    MaybeRef<Partial<Person>>
  >('createPerson', personCreateGql, params, {
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

export const useUpdatePerson = (params: MaybeRef<Partial<Person>>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    DmsData<Person>,
    MaybeRef<Partial<Person>>
  >('updatePerson', personUpdateGql, params, {
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


export const useDeletePerson = (id: MaybeRef<string>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    DmsData<Person>,
    MaybeRef<{ id: string }>
  >(
    'deletePerson',
    personDeleteGql,
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

