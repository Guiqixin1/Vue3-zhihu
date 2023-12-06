<script setup>
import { defineComponent, ref } from 'vue'
import image from '@/asset/TX1582_05.jpg'
import articleList from '@/views/article/articleList.vue'
import { getArticelLaest } from '@/api/article'
import { useRouter } from 'vue-router'
// 引入数组id的仓库
import { useArrayIdStore } from '@/stores'
const IdStore = useArrayIdStore()
const router = useRouter()
const list = ref([])
const date = ref('')
const month = ref('')
const day = ref('')
// 设置一个id数组
const idArr = ref([])
// 轮播图
const imageList = ref([])

// 一进入页面就发请求
const getNew = async () => {
  const res = await getArticelLaest()
  // console.log(res)
  list.value = res.data.stories
  date.value = res.data.date
  month.value = date.value.substring(4, 6)
  day.value = date.value.substring(6, 8)
  imageList.value = res.data.top_stories
  idArr.value = res.data.stories.map((item) => item.id)
  // console.log(idArr.value)
  IdStore.setArrayId(idArr.value)
}
getNew()

// 路由跳转进入详情页
const MouseEvent = (id) => {
  router.push(`/article/detail/${id}`)
}

const updateList = (newList, date) => {
  newList.forEach((item) => {
    item.date = date
    idArr.value.push(item.id)
  })
  // console.log(newList, date)
  // console.log(idArr.value)
  // idArr是首页中存储的数组id
  IdStore.setArrayId(idArr.value)
  list.value.push(...newList)
}

// 回到顶部,加上过渡效果
const backTop = () => {
  // document.documentElement.scrollTop = 0
  window.scrollTo({
    top: 0,
    behavior: 'smooth' // 平滑滚动效果
  })
}

defineComponent({
  name: 'layoutIndex'
})
</script>
<template>
  <!-- 顶部导航栏是固定定位 -->
  <div class="header">
    <div class="date" @click="backTop">
      <span class="day" style="color: black">{{ day }}</span>
      <span class="month">{{ month }}月</span>
    </div>

    <div class="title">| 知乎日报</div>
    <div class="image" @click="router.push('user')">
      <img :src="image" alt="" />
    </div>
  </div>

  <van-swipe
    class="my-swipe"
    :autoplay="4000"
    lay-render
    indicator-color="white"
  >
    <van-swipe-item
      v-for="item in imageList"
      :key="item.id"
      style="height: 100vw; width: 100vw; position: relative"
      @click="MouseEvent(item.id)"
    >
      <img :src="item.image" style="width: 100vw" />
      <div
        class="title"
        style="color: #fff; position: absolute; top: 57vw; left: 4vw"
      >
        {{ item.title }}
      </div>
      >
      <div
        class="author"
        style="
          color: #fff;
          position: absolute;
          top: 62vw;
          left: 4vw;
          font-size: 3vw;
        "
      >
        {{ item.hint }}
      </div>
    </van-swipe-item>
  </van-swipe>
  <!-- 文章列表 -->
  <articleList
    :list="list"
    :date="date"
    @update:list="updateList"
  ></articleList>
</template>

<style lang="scss" scoped>
.header {
  width: 100vw;
  height: 14vw;
  display: flex;
  position: fixed;
  z-index: 999;
  top: 0vw;
  background-color: #fff;

  .date {
    position: relative;
    display: flex;
    flex: 1;
    flex-direction: column;
    text-align: center;
    justify-content: center;
    margin-left: 2vw;
    .day {
      font-size: 6vw;
    }
    .month {
      font-size: 3vw;
    }
  }
  .title {
    flex: 6;
    font-size: 7vw;
    // background-color: aquamarine;
    line-height: 14vw;
    color: black;
    font-weight: bold;
  }
  .image {
    flex: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      width: 12vw;
      border-radius: 50%;
    }
  }
}
.my-swipe .van-swipe-item {
  color: #fff;
  font-size: 20px;
  line-height: 60vw;
  text-align: center;
  background-color: #39a9ed;
}
</style>
