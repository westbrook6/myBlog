import { MaybeRef } from '@vueuse/core'
import { useRequest } from '~/composables/useGqlRequest'
import { DmsData, TableResponse } from '~/type'
import ticketFileListGql from '~/graphql/ticketFile/list'
import ticketFileUpdateGql from '~/graphql/ticketFile/update'
import ticketFileCreateGql from '~/graphql/ticketFile/create'
import ticketFileItemGql from '~/graphql/ticketFile/item'
import ticketFileDeleteGql from '~/graphql/ticketFile/delete'
import { InjectionKey } from 'vue'

export interface File {
  id?: string
  url: string
  ext: string
  name: string
}

export interface TicketFile {
  id?: string
  guid: string
  files: TableResponse<File>
  createdAt?: Date
}

interface TicketFileVars extends Partial<TicketFile> {
  page: number
  pageSize: number
}

interface TicketFileInputVars extends Omit<Partial<TicketFile>, 'files'> {
  files?: string[]
}

export const useFetchTicketFiles = (vars: MaybeRef<TicketFileVars>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    TableResponse<TicketFile>,
    MaybeRef<TicketFileVars>
  >('ticketFiles', ticketFileListGql, vars, {
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

export const useFetchTicketFile = (id: MaybeRef<string>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    DmsData<TicketFile>,
    MaybeRef<{ id: string }>
  >(
    'ticketFile',
    ticketFileItemGql,
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

export const useCreateTicketFile = (params: MaybeRef<TicketFileInputVars>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    DmsData<TicketFile>,
    MaybeRef<TicketFileInputVars>
  >('createTicketFile', ticketFileCreateGql, params, {
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

export const useUpdateTicketFile = (params: MaybeRef<TicketFileInputVars>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    DmsData<TicketFile>,
    MaybeRef<TicketFileInputVars>
  >('updateTicketFile', ticketFileUpdateGql, params, {
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

export const useDeleteTicketFile = (id: MaybeRef<string>) => {
  const { result, onSuccess, onFail, fetch, loading } = useRequest<
    DmsData<TicketFile>,
    MaybeRef<{ id: string }>
  >(
    'deleteTicketFile',
    ticketFileDeleteGql,
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
const TicketFileKey: InjectionKey<ReturnType<typeof useProvideTicketFile>> =
  Symbol('ticket-file-key')

export const useProvideTicketFile = () => {
  const guid = ref('')

  const {
    fetch: fetchFiles,
    result: resultFiles,
    loading
  } = useFetchTicketFiles(
    computed(() => {
      return {
        guid: guid.value,
        page: 1,
        pageSize: 99
      }
    })
  )

  const refreshGuid = () => {
    guid.value = 'guid_' + Date.now()
  }

  const ticketFileId = computed(() => {
    if (resultFiles.value?.data.length) {
      return resultFiles.value?.data?.[0].id
    }
    return ''
  })

  const fileList = computed(() => {
    const files = resultFiles.value?.data?.[0]?.attributes?.files?.data
    if (files?.length) {
      return files.map((item) => {
        return {
          id: item.id,
          ...item.attributes,
          url: import.meta.env.VITE_DMS_HOST + item.attributes.url
        }
      })
    }
    return []
  })
  let timer = null as any

  onMounted(() => {
    timer = setInterval(() => {
      if (!guid.value) {
        clearInterval(timer)
      } else {
        fetchFiles()
      }
    }, 3000)
  })
  onUnmounted(() => {
    clearLoopQuery()
  })

  const clearLoopQuery = () => {
    timer && clearInterval(timer)
  }

  const returnObj = {
    guid,
    ticketFileId,
    fileList,
    refreshGuid,
    clearLoopQuery,
    loading,
    fetchFiles
  }
  provide(TicketFileKey, returnObj)
  return returnObj
}

export const useInjectTicketFile = () => {
  const resData = inject(TicketFileKey)
  if (!resData) {
    throw new Error('please provide key before inject')
  }
  return resData
}
