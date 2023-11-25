<script setup>
import { ref } from 'vue'
import image from '@/asset/TX1582_05.jpg'
import articleList from '@/views/article/articleList.vue'
import { getArticelLaest } from '@/api/article'

const list = ref([])
const date = ref('')
const month = ref('')
const day = ref('')
// 轮播图
const imageList = ref([])
// 一进入页面就发请求
const getNew = async () => {
  const res = await getArticelLaest()
  console.log(res)
  list.value = res.data.stories
  date.value = res.data.date
  month.value = date.value.substring(4, 6)
  day.value = date.value.substring(6, 8)
  imageList.value = res.data.top_stories
}
getNew()
</script>
<template>
  <!-- 顶部导航栏是固定定位 -->
  <div class="header">
    <div class="date">
      <span class="day" style="color: black">{{ day }}</span>
      <span class="month">{{ month }}月</span>
    </div>

    <div class="title">| 知乎日报</div>
    <div class="image">
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
  <articleList :list="list" :date="date"></articleList>
</template>

<style lang="scss" scoped>
.header {
  width: 100vw;
  height: 14vw;
  // background-color: beige;
  display: flex;

  .date {
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
