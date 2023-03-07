<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import {
  useCreateArticle,
  useFetchArticle,
  useUpdateArticle
} from '~/api/article'
import { Editor, Toolbar } from '@wangeditor/editor-for-vue'
import '@wangeditor/editor/dist/css/style.css'
import { Attachment } from '~/api/media'
import { usePost } from '~/composables/useAxios'

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

const fileList = ref<Attachment[]>([])
const flieUploading = ref(false)

// 编辑器实例，必须用 shallowRef
const editorRef = shallowRef()
const toolbarConfig = {
  excludeKeys: ['codeBlock'],
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
      maxFileSize: 50 * 1024 * 1024,
      server: import.meta.env.VITE_DMS_HOST + '/api/upload',
      maxNumberOfFiles: 1,
      customInsert(res: any, insertFn: any) {
        if (res[0].url) {
          const img = import.meta.env.VITE_DMS_HOST + res[0].url
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
      content: formData.value.content,
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
      content: formData.value.content,
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
  ElMessage.error('保存失败')
})
const loading = computed(() => {
  return detailLoading.value || createLoading.value || updateLoading.value
})
const resetForm = () => {
  formData.value.title = ''
  formData.value.subTitle = ''
  formData.value.content = ''
  fileList.value = []
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

const uploadFileRequest = usePost<any, Attachment[]>('/api/upload')

const customUpload = async (param: { file: any }) => {
  const fileSize = param.file.size / 1024 / 1024
  if (fileSize > 30) {
    ElMessage.warning('文件超过30M')
    fileList.value = []
    return
  }
  let fileArr
  // 处理成数组
  if (param.file instanceof Array) {
    fileArr = param.file
  } else {
    fileArr = [param.file]
  }
  try {
    flieUploading.value = true
    const formData = new FormData()
    fileArr.forEach((item: any) => {
      formData.append('files', item)
    })
    const data = await uploadFileRequest({
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' }
    })
    const resData: any = data.map((item: any) => {
      return {
        ...item,
        url: import.meta.env.VITE_HOST_URL + item.url,
        status: 'done'
      }
    })
    fileList.value = resData
  } catch (error) {
    fileList.value = []
  } finally {
    flieUploading.value = false
  }
}

const handleRemove = (uploadFile: Attachment) => {
  if (fileList.value?.length) {
    const index = fileList.value.findIndex((item) => {
      return item.url === uploadFile.url
    })
    if (index > -1) {
      fileList.value.splice(index, 1)
    }
  }
}

const handlePreview = (uploadFile: Attachment) => {
  window.open(uploadFile.url, '_blank')
}
</script>
<template>
  <el-dialog
    v-model="dialogFormVisible"
    :destroy-on-close="true"
    title="文章详情"
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

<style scoped lang="scss">
:deep(.upload-box) {
  width: 100%;
}

:deep(.upload-disable) {
  .el-upload {
    display: none;
  }
 
  .el-upload-list {
    margin-top: 0px;
  }
}
</style>
