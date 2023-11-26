<script setup>
import { ref, onMounted } from 'vue'
import { getArticledetail } from '@/api/article.js'
// 引入路由
import { useRoute } from 'vue-router'
const route = useRoute()
const body = ref(null)
// 设置一个ref变量，用来存储api返回回来的css样式
const apiStyle = ref('')
// 在onmounted中发送请求，获取数据
onMounted(async () => {
  const res = await getArticledetail(route.params.id)
  console.log(res)
  apiStyle.value = res.data.css
  const linkElement = document.createElement('link')
  linkElement.rel = 'stylesheet'
  linkElement.href = apiStyle.value
  document.head.appendChild(linkElement)
  body.value.innerHTML = res.data.body
  const imageDiv = document.querySelector('.img-place-holder')
  console.log(imageDiv)
  imageDiv.style.height = '100vw'
  const img = document.createElement('img')
  img.src = res.data.image
  imageDiv.appendChild(img)
  img.style.height = '100vw'
  const title = document.createElement('h1')
  title.innerText = res.data.title
  imageDiv.appendChild(title)
  imageDiv.style.position = 'relative'
  title.style.position = 'absolute'
  title.style.top = '82vw'
  title.style.left = '4vw'
  title.style.color = '#fff'
})
</script>
<template>
  <div class="body" ref="body"></div>
</template>
<style lang="scss" scoped>
// 给headline样式设置important，保证样式优先级
.headline {
  width: 100vw !important;
  height: 45vw !important;
}
</style>
