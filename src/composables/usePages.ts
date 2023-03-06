import { ref } from 'vue'

interface PageInitOptions {
  page?: number
  pageSize?: number
}

export const usePages = (options?: PageInitOptions) => {
  const page = ref(options?.page || 1)
  const pageSize = ref(options?.pageSize || 10)
  const total = ref(0)

  const resetPage = () => {
    page.value = 1
    pageSize.value = options?.pageSize || 10
  }

  return {
    page,
    pageSize,
    total,
    resetPage,
  }
}
