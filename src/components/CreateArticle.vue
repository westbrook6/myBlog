<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  useCreateArticle,
  useFetchArticle,
  useUpdateArticle
} from '~/api/article'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'

const props = withDefaults(
  defineProps<{ visible: boolean; editId: string }>(),
  {
    visible: false,
    editId: ''
  }
)
const emits = defineEmits(['update:visible', 'submit'])
const dialogFormVisible = ref(false)
const formData = ref({
  title: '',
  subTitle: '',
  content: ''
})

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const toolbarConfig = {
  excludeKeys: ['codeBlock', 'insertVideo'],
  insertKeys: {
    index: 1,
    keys: ['fontSize']
  }
}
const editorConfig = {
  placeholder: '请输入',
  MENU_CONF: {
    uploadImage: {
      fieldName: 'files',
      server: import.meta.env.VITE_HOST_URL + '/api/upload',
      maxNumberOfFiles: 1,
      headers: {
        Authorization: 'Bearer ' + sessionStorage.getItem('token')
      },
      customInsert(res: any, insertFn: any) {
        if (res[0].url) {
          const img = import.meta.env.VITE_HOST_URL + res[0].url
          insertFn(img, '', '')
        }
      },
      // 单个文件上传成功之后
      onSuccess(file: File, res: any) {
        console.log(`${file.name} 上传成功`, res)
      },

      // 单个文件上传失败
      onFailed(file: File, res: any) {
        console.log(`${file.name} 上传失败`, res)
      },

      // 上传错误，或者触发 timeout 超时
      onError(file: File, err: any, res: any) {
        console.log(`${file.name} 上传出错`, err, res)
      }
    }
  }
}
onBeforeUnmount(() => {
  const editor = editorRef.value
  if (editor == null) return
  editor.destroy()
})

const handleCreated = (editor: any) => {
  editorRef.value = editor // 记录 editor 实例，重要！
}

const formRef = ref()
const rules = ref({
  title: [
    {
      required: true,
      message: '请输入',
      trigger: 'blur'
    }
  ],
  subTitle: [
    {
      required: true,
      message: '请输入',
      trigger: 'blur'
    }
  ]
})
const {
  onSuccess: onSuccessDetail,
  result,
  fetch: fetchDetail,
  loading: detailLoading
} = useFetchArticle(
  computed(() => {
    return props.editId
  })
)
onSuccessDetail(() => {
  formData.value.title = result.value?.data.attributes.title || ''
  formData.value.subTitle = result.value?.data.attributes.subTitle || ''
  formData.value.content = result.value?.data.attributes.content || ''
})

const {
  onSuccess: onSuccessCreate,
  onFail: onFailCreate,
  fetch: fetchCreate,
  loading: createLoading,
  result: createResult
} = useCreateArticle(
  computed(() => {
    return {
      title: formData.value.title || '',
      subTitle: formData.value.subTitle || '',
      content: formData.value.content
    }
  })
)
onSuccessCreate(() => {
  ElMessage.success('保存成功')
  dialogFormVisible.value = false
  emits('submit', createResult.value?.data)
  resetForm()
})
onFailCreate(() => {
  ElMessage.error('保存失败')
})

const {
  onSuccess: onSuccessUpdate,
  onFail: onFailUpdate,
  fetch: fetchUpdate,
  loading: updateLoading
} = useUpdateArticle(
  computed(() => {
    return {
      id: props.editId,
      title: formData.value.title || '',
      subTitle: formData.value.subTitle || '',
      content: formData.value.content
    }
  })
)
onSuccessUpdate(() => {
  ElMessage.success('保存成功')
  dialogFormVisible.value = false
  emits('submit')
  resetForm()
})
onFailUpdate(() => {
  ElMessage.success('保存失败')
})
const loading = computed(() => {
  return detailLoading.value || createLoading.value || updateLoading.value
})
const resetForm = () => {
  formData.value.title = ''
  formData.value.subTitle = ''
  formData.value.content = ''
  formRef.value && formRef.value.resetFields()
}
watch(
  () => props.visible,
  (val) => {
    if (val !== dialogFormVisible.value) {
      dialogFormVisible.value = val
    }
  }
)
watch(dialogFormVisible, (val) => {
  if (val !== props.visible) {
    emits('update:visible', val)
  }
})

watch(
  () => props.visible,
  (val) => {
    if (val && props.editId) {
      fetchDetail()
    } else {
      resetForm()
    }
  },
  {
    immediate: true
  }
)

const handleSubmit = () => {
  formRef.value.validate(async (valid: boolean) => {
    if (valid) {
      if (props.editId) {
        fetchUpdate()
      } else {
        fetchCreate()
      }
    }
  })
}
</script>
<template>
  <el-dialog
    v-model="dialogFormVisible"
    :destroy-on-close="true"
    title="详情"
    width="1000px"
  >
    <el-form
      ref="formRef"
      v-loading="loading"
      :model="formData"
      :rules="rules"
      label-width="140px"
      class="pl-20 pr-32"
    >
      <el-form-item label="标题" prop="title">
        <el-input v-model="formData.title" />
      </el-form-item>
      <el-form-item label="副标题" prop="subTitle">
        <el-input v-model="formData.subTitle" />
      </el-form-item>
      <el-form-item label="文章详情" prop="content">
        <div style="border: 1px solid #ccc; width: 100%">
          <Toolbar
            style="border-bottom: 1px solid #ccc"
            :editor="editorRef"
            :default-config="toolbarConfig"
            :mode="'simple'"
          />
          <Editor
            v-model="formData.content"
            style="height: 400px; overflow-y: hidden"
            :default-config="editorConfig"
            :mode="'simple'"
            @on-created="handleCreated"
          />
        </div>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSubmit"> 保存 </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss"></style>
