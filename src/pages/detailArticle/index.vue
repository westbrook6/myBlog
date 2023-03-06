<script lang="ts" setup>
import { useFetchArticle } from '~/api/article'
const router = useRouter()
const route = useRoute()
const articleId = ref(route.query.id as string)
const {
    result,
    fetch: fetchList,
    loading: listLoading,
} = useFetchArticle(articleId)
fetchList()
const loading = computed(() => {
    return listLoading.value
})
const detail = computed(() => {
    return {
        title: result.value?.data.attributes.title,
        content: result.value?.data.attributes.content
    }
})
const handleBack = ()=>{
    router.go(-1)
}
</script>
<template>
    <div v-loading="loading" class="container_box">
        <MyButton class="backBtn" @click="handleBack()">back</MyButton>
        <div>{{ detail.title }}</div>
        <div class="content">
            <div v-html="detail.content">
            </div>
        </div>
    </div>
</template>
<style lang="scss" scoped>
.backBtn{
    position: fixed;
    top: 20px;
    left: 20px;
}
</style>