<script setup lang="ts" generic="T extends any, O extends any">
import userImg from '~/assets/home/user.jpg'
import { useFetchHomes } from '~/api/home'
import {useFetchCategories} from '~/api/category'
import { Attachment } from '~/api/media'
defineOptions({
  name: 'IndexPage'
})
const router = useRouter()
const fileList = ref<Attachment[]>([])
const formData = ref<{
  id?: string
  name?: string
  description?: string
  avatar?: string
}>({
  name: '',
  description: '',
  avatar: ''
})
const {
  result,
  fetch: fetchList,
  loading,
  onSuccess
} = useFetchHomes(
  computed(() => {
    return {
      page: 1,
      pageSize: 999
    }
  })
)
fetchList()
onSuccess(() => {
  const logoData = result.value?.data?.[0]?.attributes?.avatar
  const resData = result.value?.data?.[0].attributes
  if (logoData?.data) {
    fileList.value = [
      {
        id: logoData?.data.id,
        url: import.meta.env.VITE_DMS_HOST + logoData?.data.attributes.url
      }
    ]
  }
  formData.value.avatar = logoData?.data.attributes.url
  formData.value.name = resData?.name
  formData.value.description = resData?.description
})
const avatarUrl = computed(() => {
  return import.meta.env.VITE_DMS_HOST + formData.value.avatar
})
const {
  result:categoryRes,
  fetch: fetchCategories,
} = useFetchCategories(
  computed(() => {
    return {
      page: 1,
      pageSize: 999
    }
  })
)
fetchCategories()
const menuData = computed(()=>{
  return categoryRes.value?.data
})
onMounted(() => {
  document.title = `Russell's Blog`
})
const goBlog = () => {
  router.push({
    path: '/menu/article'
  })
}
const goMenu = ((menu: any)=>{
  router.push({
    path: `/menu/${menu.attributes.name}`,
  })
})
</script>

<template>
  <div class="header">
    <div class="sides">
      <a class="logo" @click="goBlog()">BLOG</a>
    </div>
    <div class="sides" >
      <div href="#" class="menu" v-for="(item,index) in menuData" :key="index" >
        <div class="s" @click="goMenu(item)">{{ item.attributes.name }}</div>
      </div>
    </div>

    <div class="info">
      <h4><a href="#category"><el-avatar :size="50" :src="avatarUrl" /></a></h4>
      <h1>ENJOY CODING, WHY NOT ?</h1>
      <div class="meta">

        By <a href="https://github.com/westbrook6" target="_b">{{ formData.name }}</a> on May 7, 2023
      </div>
    </div>
  </div>
  <section class="content">
    <p>{{ formData.description }}</p>
    <p align="center"> <a href="https://github.com/westbrook6" class="btn2 twtr" target="_b">Follow me on
        Github</a>
    </p>
  </section>
</template>
<style  scoped>
html,
body {
  margin: 0;
  height: 120%;
  font-family: 'Josefin Sans', sans-serif;

}

a {
  text-decoration: none
}

.header {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
  align-content: flex-start;
  height: 50vw;
  min-height: 400px;
  max-height: 550px;
  min-width: 300px;
  color: #eee;
}

.header:after {
  content: "";
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: -1;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0.12) 40%, rgba(27, 32, 48, 1) 100%);
}

.header:before {
  content: "";
  width: 100%;
  height: 200%;
  position: absolute;
  top: 0;
  left: 0;
  -webkit-backface-visibility: hidden;
  -webkit-transform: translateZ(0);
  backface-visibility: hidden;
  transform: translateZ(0);
  background: #1B2030 url(~/assets/home/home.png) 50% 0 no-repeat;
  background-size: 100%;
  background-attachment: fixed;
  animation: grow 360s linear 10ms infinite;
  transition: all 0.4s ease-in-out;
  z-index: -2
}

.header a {
  color: #eee
}

.logo
 {
  border: 2px solid #fff;
  border-radius: 3px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  align-content: center;
  margin: 20px;
  padding: 0px 10px;
  font-weight: 900;
  font-size: 1.1em;
  line-height: 1;
  box-sizing: border-box;
  height: 40px
}
.menu {
  border: 1px solid #fff;
  border-radius: 3px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  align-content: center;
  margin: 10px;
  padding: 0px 10px;
  font-weight: 900;
  font-size: 1.1em;
  line-height: 1;
  box-sizing: border-box;
  height: 40px;
  color: #fff
}

.sides,
.info {
  flex: 0 0 auto;
  width: 50%;
  margin-bottom: 10px;
}

.info {
  width: 100%;
  padding: 15% 10% 0 10%;
  text-align: center;
  text-shadow: 0 2px 3px rgba(0, 0, 0, 0.2)
}

.author {
  display: inline-block;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-size: cover;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.3);
  margin-bottom: 3px
}

.info h4,
.meta {
  font-size: 0.7em
}

.meta {
  font-style: italic;
}

@keyframes grow {
  0% {
    transform: scale(1) translateY(0px)
  }

  50% {
    transform: scale(1.2) translateY(-400px)
  }
}

.content {
  padding: 5% 10%;
  text-align: justify
}

.btn2 {
  color: #333;
  border: 2px solid;
  border-radius: 3px;
  text-decoration: none;
  display: inline-block;
  padding: 5px 10px;
  font-weight: 600
}

.twtr {
  margin-top: 100px
}

.btn2.twtr:after {
  content: "🚀";
  padding-left: 5px
}</style>
