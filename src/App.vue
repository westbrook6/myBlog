<template>
  <main text="center gray-700 dark:gray-200">
    <RouterView />
  </main>
</template>
<script setup lang="ts">
onMounted(() => {
  document.title = `Russell's Blog`
})
</script>
