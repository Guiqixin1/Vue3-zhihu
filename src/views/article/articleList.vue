<script setup>
import { defineProps, ref } from 'vue'
import { getArticelbefore } from '@/api/article'
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
const emits = defineEmits(['update:list'])
// 设置一个时间来计数
let time = 0
const today = new Date()
// 当组件滚动到底部时，出发onLoad事件
// 获取到往日消息，通过子传父，更新list数组
const onLoad = async () => {
  // 异步更新数据
  const before = new Date(today)
  before.setDate(today.getDate() - time)
  const year = before.getFullYear()
  const month = (before.getMonth() + 1).toString().padStart(2, '0')
  const day = before.getDate().toString().padStart(2, '0')

  const formattedDate = year + month + day
  // console.log(formattedDate) // 输出格式化后的日期字符串，例如：20231202
  const res = await getArticelbefore(formattedDate)
  emits('update:list', res.data.stories, formattedDate)
  // 加载状态结束
  loading.value = false
  time++
}

const goDetail = (id) => {
  //动态路由传参
  router.push(`/article/detail/${id}`)
}
</script>
<template>
  <ul>
    <van-list
      v-model:loading="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <!-- <van-cell v-for="item in list" :key="item" :title="item" /> -->
      <template v-for="(item, index) in list" :key="item.id">
        <div class="date" v-if="index % 5 === 0 && index > 0">
          {{ item.date.substring(4, 6) }}月{{ item.date.substring(6, 8) }}日
          ————————————————————
        </div>
        <div class="main" @click="goDetail(item.id)">
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
      </template>
    </van-list>
  </ul>
</template>
<style lang="scss" scoped>
.date {
  width: 100vw;
  font-size: 4vw;
  color: #999;
}
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
