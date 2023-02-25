import { ref } from 'vue'

export const useError = () => {
  const error = ref<Error>()
  const setError = (e?: Error) => (error.value = e)
  return { error, setError }
}
