<script setup>
import { ref, onMounted } from 'vue'
import { getArticledetail, getArticelcomment } from '@/api/article.js'
// 引入路由
import { useRouter, useRoute } from 'vue-router'
// 引入仓库
import { useCollectStore, useArrayIdStore } from '@/stores'
import { showToast } from 'vant'
import 'vant/es/toast/style'
const collectStore = useCollectStore()
const ArrayIdStore = useArrayIdStore()
// console.log(ArrayIdStore.arrayId)

const route = useRoute()
const router = useRouter()
const body = ref(null)
// 设置一个ref变量，用来存储api返回回来的css样式
const apiStyle = ref('')
// 设置id,title,和image的变量,为了收藏做准备
const id = ref('')
const Title = ref('')
const image = ref('')

const getPage = async () => {
  const res = await getArticledetail(route.params.id)
  // console.log(res)
  id.value = res.data.id
  Title.value = res.data.title
  image.value = res.data.image
  apiStyle.value = res.data.css
  const linkElement = document.createElement('link')
  // 引入外部css样式
  linkElement.rel = 'stylesheet'
  linkElement.href = apiStyle.value
  document.head.appendChild(linkElement)
  body.value.innerHTML = res.data.body
  const imageDiv = document.querySelector('.img-place-holder')
  // console.log(imageDiv)
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
}
// 在onmounted中发送请求，获取数据
onMounted(() => {
  getPage()
})

// 底部定位
const goback = () => {
  router.go(-1)
}
// 新闻额外信息
// 评论总数
const comments = ref('')
// 点赞总数
const likes = ref('')
const getExtraInfo = async () => {
  const res = await getArticelcomment(route.params.id)
  // console.log(res)
  comments.value = res.data.comments
  likes.value = res.data.popularity
}
getExtraInfo()
// 收藏 -- 持久化使用pinia
const isCollect = collectStore.collectList.some((item) => {
  return item.id === route.params.id
})
// console.log(isCollect)
let collect = ref(isCollect)
const goCollect = () => {
  // 如果一开始不是确认收藏
  collect.value = !collect.value
  if (collect.value) {
    const obj = {
      id: route.params.id,
      title: Title.value,
      image: image.value,
      isCollect: true
    }
    collectStore.setCollect(obj)
    showToast('收藏成功')
  } else {
    collectStore.removeCollect(route.params.id)
    showToast('取消收藏成功')
  }
}
const SwipeLeft = () => {
  const ProxyArray = Object.values(ArrayIdStore.arrayId)
  const index = ProxyArray.indexOf(+route.params.id)

  if (index < ProxyArray.length - 1) {
    router.replace(`/article/detail/${ProxyArray[index + 1]}`)
    getPage()
    getExtraInfo()
  }
}
const SwipeRight = () => {
  const ProxyArray = Object.values(ArrayIdStore.arrayId)
  const index = ProxyArray.indexOf(+route.params.id)
  if (index > 0) {
    router.replace(`/article/detail/${ProxyArray[index - 1]}`)
    getPage()
    getExtraInfo()
  }
}
</script>
<template>
  <div
    class="body"
    ref="body"
    v-touch:swipe.left="SwipeLeft"
    v-touch:swipe.right="SwipeRight"
  ></div>
  <div class="footer">
    <div class="footer-left">
      <van-icon name="arrow-left" @click="goback" />
    </div>
    <div
      class="footer-commont"
      @click="router.push(`/comments/${route.params.id}`)"
    >
      <van-icon name="comment-o" :badge="comments" />
    </div>
    <div class="footer-good">
      <van-icon name="good-job-o" :badge="likes" />
    </div>
    <div class="footer-collect" @click="goCollect">
      <van-icon name="star" v-if="collect" />
      <van-icon name="star-o" v-else />
    </div>
  </div>
</template>
<style lang="scss" scoped>
// 给headline样式设置important，保证样式优先级

.headline {
  width: 100vw !important;
  height: 45vw !important;
}
.body {
  margin-bottom: 20vw;
}

.footer {
  width: 100vw;
  height: 12vw;
  background-color: #fefefe;
  z-index: 9999999999999;
  display: flex;
  position: fixed;
  bottom: 0;
  font-size: 5vw;
  justify-content: center;
  align-items: center;
  color: #5e5d5d;
  .footer-left {
    flex: 1;
  }
  .footer-commont {
    flex: 1;
  }
  .footer-good {
    flex: 1;
  }
  .footer-collect {
    flex: 1;
  }
}
</style>
