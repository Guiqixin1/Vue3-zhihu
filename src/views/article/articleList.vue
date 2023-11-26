<script setup>
import { defineProps, ref } from 'vue'
// import { getArticledetail } from '@/api/article'
// 引入路由
import { useRouter } from 'vue-router'
const router = useRouter()
const loading = ref(false)
const finished = ref(false)
const props = defineProps({
  list: {
    type: Array
  },
  date: {
    type: String
  }
})
// const now = parseInt(props.date)
// const time = 1

// // 当组件滚动到底部时，出发onLoad事件
// const onLoad = async () => {
//   // 异步更新数据
//   console.log(11)
//   // 加载状态结束
//   // loading.value = false
// }

const goDetail = (id) => {
  //动态路由传参
  router.push(`/article/detail/${id}`)
}
</script>
<template>
  <ul>
    <li v-for="item in list" :key="item.id" @click="goDetail(item.id)">
      <div class="main">
        <div class="left" style="overflow: hidden">
          <div class="title">
            {{ item.title }}
          </div>
          <div class="author">{{ item.hint }}</div>
        </div>
        <div class="right">
          <img :src="item.images[0]" alt="" />
        </div>
      </div>
    </li>
  </ul>
</template>
<style lang="scss" scoped>
.main {
  width: 100vw;
  height: 20vw;
  padding: 4vw;
  display: flex;
  margin-bottom: 8vw;
  .left {
    flex: 9;
    height: 20vw;
    .title {
      width: 70vw;
      font-size: 5vw;
      height: 15vw;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2; /* 指定显示的行数 */
      line-height: 1.5; /* 指定行高 */
      max-height: calc(1.5 * 2); /* 计算最大高度，需与行数和行高相对应 */
      text-overflow: ellipsis;
      overflow: hidden;
    }
    .author {
      font-size: 3vw;
    }
  }
  .right {
    flex: 3;
    display: flex;
    flex-direction: column;
    align-items: end;
    img {
      flex: 1;
      width: 20vw;
    }
  }
}
</style>
