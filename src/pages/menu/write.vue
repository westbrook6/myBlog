<script setup lang="ts" name="basetable">
import { ref, reactive } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { Delete, Edit, Search, Plus } from '@element-plus/icons-vue'
import { useFetchArticles, useDeleteArticle, Article } from '~/api/article'
import { usePages } from '~/composables/usePages'
import CreateArticle from '~/components/CreateArticle.vue'
import dayjs from 'dayjs'
import { useRouter } from 'vue-router'

const query = reactive({
  type: '',
  title: '',
  name: ''
})
const router = useRouter()
const articleFormVisible = ref(false)
const articleId = ref()

const tableData = computed(() => {
  if (result.value?.data.length) {
    return result.value?.data.map((item) => {
      return {
        id: item.id,
        ...item.attributes,
        createdAt:
          item.attributes.createdAt &&
          dayjs(item.attributes.createdAt).format('YYYY-MM-DD HH:mm:ss')
      }
    })
  }
  return []
})

const { page, pageSize, resetPage, total } = usePages()
const { fetch, onSuccess, result } = useFetchArticles(
  computed(() => {
    return {
      title: query.title,
      name: query.name,
      page: page.value,
      pageSize: pageSize.value,
      sort: ['createdAt:desc']
    }
  })
)
onSuccess(() => {
  total.value = result.value?.meta.pagination.total || 0
})
fetch()
const { onSuccess: onSuccessDelete, fetch: fetchDelete } =
  useDeleteArticle(articleId)

onSuccessDelete(() => {
  ElMessage.success('删除成功')
  handleSearch()
})

const handleSearch = () => {
  resetPage()
  fetch()
}
const handlePageChange = () => {
  fetch()
}

// 删除操作
const handleDelete = (id: string) => {
  articleId.value = id
  // 二次确认删除
  ElMessageBox.confirm('确定要删除吗？', '提示', {
    type: 'warning'
  })
    .then(() => {
      fetchDelete()
      fetch()
    })
    .catch(() => {})
}

const handleEdit = (item: Article) => {
  articleId.value = item.id
  articleFormVisible.value = true
}

const handleAdd = () => {
  articleId.value = ''
  articleFormVisible.value = true
}

const handleSuccessArticle = () => {
  handleSearch()
}
const goHome=()=>{
  router.push('/')
}

</script>
<template>
  <div>
    <div class="container">
      <MyButton class="homeBtn" @click="goHome()">Home</MyButton>
      <h1 class="pb-20 text-4xl text-gray-400 m-5">My Article</h1>
      <div class="handle-box">
        <span class="input-name">标题名称：</span>
        <el-input
          v-model="query.title"
          placeholder="标题名称"
          class="handle-input mr10"
        ></el-input>
        <el-button type="primary" :icon="Search" @click="handleSearch">
          搜索
        </el-button>
        <el-button type="primary" :icon="Plus" @click="handleAdd">
          新增
        </el-button>
      </div>
      <el-table :data="tableData" border ref="multipleTable" class="table-box">
        <el-table-column prop="title" label="标题" align="center">
        </el-table-column>
        <el-table-column prop="phone" label="发布日期" align="center">
          <template #default="scope">
            {{ scope.row.createdAt }}
          </template>
        </el-table-column>
        <el-table-column label="操作" width="220" align="center">
          <template #default="scope">
            <el-button text :icon="Edit" @click="handleEdit(scope.row)">
              编辑
            </el-button>
            <el-button
              text
              :icon="Delete"
              class="red"
              @click="handleDelete(scope.row.id)"
            >
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          layout="total, prev, pager, next"
          v-model:current-page="page"
          v-model:page-size="pageSize"
          :total="total"
          @current-change="handlePageChange"
        ></el-pagination>
      </div>
    </div>
    <CreateArticle
      v-model:visible="articleFormVisible"
      :editId="articleId"
      @submit="handleSuccessArticle"
    />
  </div>
</template>

<style scoped>
.homeBtn{
  position: fixed !important;
  top: 20px;
  left: 20px;
}
.container {
  margin: 0 auto;
}
.input-name {
  margin-left: 40px;
}
.table-box {
  margin-top: 24px;
}
.handle-box{
  text-align: left;
}
.handle-input {
  width: 300px;
}
.red {
  color: #f56c6c;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
