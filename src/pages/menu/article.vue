<script setup lang="ts">
import { useFetchArticles } from '~/api/article'
const router = useRouter()
const {
  result,
  fetch,
} = useFetchArticles(
  computed(() => {
    return {
      page: 1,
      pageSize: 999
    }
  })
)
fetch()
const articleData = computed(() => {
  if (result.value?.data.length) {
    return result.value?.data.map((item) => {
      return {
        id: item.id,
        ...item.attributes
      }
    })
  }
  return []
})
const goDetail = (articleId:any)=>{
  router.push({
    path: '/detailArticle',
    query: {
      id: articleId.id
    }
  })
}
const goHome = ()=>{
  router.push({
    path: '/',
  })
}
</script>
<template>
  <MyButton class="backBtn" @click="goHome()">home</MyButton>
  <h1>Article</h1>
  <p>enjoy it!</p>
  <section class="main">
    <div class="wrap wrap--3" @click="goDetail(item)"  v-for="(item,index) in articleData" :key="index">
      <div class="container container--3">
        <h2>{{ item.title }}</h2>
        <p>{{ item.subTitle }}</p>
      </div>
    </div>
    

  </section>
</template>
  
<style scoped>
*,
*::after,
*::before {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-size: 62.5%;
}

body {
  --background-color: hsl(180, 20%, 90%);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

  min-height: 100vh;
  padding: 2rem;

  color: hsla(0, 0%, 0%, .6);
  background: var(--background-color);
  text-align: center;
}

h1 {
  font-size: 3.2rem;
  padding-top: 2rem;
}

h1+p {
  font-size: 1.8rem;
  padding: 2rem 0 3rem;
}

.main {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
}

.wrap {
  margin: 2rem;

  transform-style: preserve-3d;
  transform: perspective(100rem);

  cursor: pointer;
}

.container {
  --rX: 0;
  --rY: 0;
  --bX: 50%;
  --bY: 80%;

  width: 30rem;
  height: 36rem;
  border: 1px solid var(--background-color);
  border-radius: 1.6rem;
  padding: 4rem;

  display: flex;
  align-items: flex-end;

  position: relative;
  transform: rotateX(calc(var(--rX) * 1deg)) rotateY(calc(var(--rY) * 1deg));

  background: linear-gradient(hsla(0, 0%, 100%, .1), hsla(0, 0%, 100%, .1)), url('~/assets/home/flower.png');
  background-position: var(--bX) var(--bY);
  background-size: 40rem auto;
  box-shadow: 0 0 3rem .5rem hsla(0, 0%, 0%, .2);

  transition: transform .6s 1s;
}

.container::before,
.container::after {
  content: "";

  width: 2rem;
  height: 2rem;
  border: 1px solid #fff;

  position: absolute;
  z-index: 2;

  opacity: .3;
  transition: .3s;
}

.container::before {
  top: 2rem;
  right: 2rem;

  border-bottom-width: 0;
  border-left-width: 0;
}

.container::after {
  bottom: 2rem;
  left: 2rem;

  border-top-width: 0;
  border-right-width: 0;
}

.container--active {
  transition: none;
}

.container--2 {
  filter: hue-rotate(80deg) saturate(140%);
}

.container--3 {
  filter: hue-rotate(160deg) saturate(140%);
}

.container p {
  color: hsla(0, 6%, 62%, 0.6);
  font-size: 1rem;
  word-wrap: break-word;
}
.container h2 {
  color: hsla(0, 0%, 100%, .6);
  font-size: 2.2rem;
  margin-right: 1rem;
}

.wrap:hover .container::before,
.wrap:hover .container::after {
  width: calc(100% - 4rem);
  height: calc(100% - 4rem);
}

.abs-site-link {
  position: fixed;
  bottom: 20px;
  left: 20px;
  color: hsla(0, 0%, 0%, .6);
  font-size: 1.6rem;
}
.backBtn{
  position: fixed;
  top: 20px;
  left: 20px;
}
</style>