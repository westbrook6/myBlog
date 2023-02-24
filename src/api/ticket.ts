import { MaybeRef } from '@vueuse/core'
import { useRequest } from '~/composables/useGqlRequest'
import { DmsData, TableResponse } from '~/type'
import ticketListGql from '~/graphql/ticket/list'
import ticketUpdateGql from '~/graphql/ticket/update'
import ticketCreateGql from '~/graphql/ticket/create'
import ticketItemGql from '~/graphql/ticket/item'
import ticketDeleteGql from '~/graphql/ticket/delete'

export interface Ticket {
  id?: string
  number: string
  typeName: string
  status: number
  submitter: string
  phone: string
  detail: any
  createdAt?: Date
}

interface TicketVars {
  page: number
  pageSize: number
}

export const useFetchTickets = () => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    TableResponse<Ticket>,
    MaybeRef<TicketVars>
  >(
    'tickets',
    ticketListGql,
    computed(() => {
      return {
        page: 1,
        pageSize: 9999
      }
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

export const useFetchTicket = (id: MaybeRef<string>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    DmsData<Ticket>,
    MaybeRef<{ id: string }>
  >(
    'ticket',
    ticketItemGql,
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

export const useCreateTicket = (params: MaybeRef<Ticket>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    DmsData<Ticket>,
    MaybeRef<Ticket>
  >('createTicket', ticketCreateGql, params, {
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

export const useUpdateTicket = (params: MaybeRef<Ticket>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    DmsData<Ticket>,
    MaybeRef<Ticket>
  >('updateTicket', ticketUpdateGql, params, {
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

export const useDeleteTicket = (id: MaybeRef<string>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    DmsData<Ticket>,
    MaybeRef<{ id: string }>
  >(
    'deleteTicket',
    ticketDeleteGql,
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
