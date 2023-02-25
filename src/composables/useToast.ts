import { InjectionKey } from 'vue'

interface ToastParam {
  dialogType?: 'tip' | 'confirm'
  type?: 'success' | 'error'
  title?: string
  content?: string
  msg?: string
  closeCb?: Function
}
const ToastKey: InjectionKey<ReturnType<typeof useToast>> = Symbol('toast-key')
export const useToast = () => {
  const visible = ref(false)
  const dialogType = ref<'tip' | 'confirm'>()
  const type = ref<'success' | 'error'>('success')
  const title = ref('')
  const content = ref('')
  const msg = ref('')
  const closeCb = ref()
  const showToast = (params: ToastParam) => {
    visible.value = true
    dialogType.value = params.dialogType || 'tip'
    type.value = params.type || 'success'
    title.value = params.title || ''
    content.value = params.content || ''
    msg.value = params.msg || ''
    closeCb.value = params.closeCb
  }
  const hideToast = () => {
    visible.value = false
    if (typeof closeCb.value === 'function') {
      closeCb.value()
      closeCb.value = undefined
    }
  }
  const returnObj = {
    msg,
    visible,
    showToast,
    hideToast,
    dialogType,
    title,
    content,
    type
  }
  provide(ToastKey, returnObj)
  return returnObj
}
export const useInjectToast = () => {
  const resData = inject(ToastKey)
  if (!resData) {
    throw new Error('please provide fetch-toast-key before inject')
  }
  return resData
}
