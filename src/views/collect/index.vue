<script setup>
import { useCollectStore } from '@/stores/index.js'
import { useRouter } from 'vue-router'
const router = useRouter()
const collectStore = useCollectStore()
const collectList = collectStore.collectList
console.log(collectList)
// 取消收藏
const closeCollect = (id) => {
  collectStore.removeCollect(id)
}
</script>
<template>
  <van-nav-bar title="我的收藏" left-arrow @click-left="router.go(-1)" />
  <ul>
    <li
      v-for="item in collectList"
      :key="item.id"
      @click="router.push(`/article/detail/${item.id}`)"
    >
      <van-swipe-cell>
        <div class="main">
          <div class="left" style="overflow: hidden">
            <div class="title">{{ item.title }}</div>
          </div>
          <div class="right">
            <img :src="item.image" alt="" />
          </div>
        </div>
        <van-divider />
        <template #right>
          <van-button
            square
            text="取消收藏"
            type="danger"
            class="delete-button"
            style="height: 100%"
            @click="closeCollect(item.id)"
          />
        </template>
      </van-swipe-cell>
    </li>
    <div class="finishText">没有更多内容</div>
  </ul>
</template>
<style lang="scss" scoped>
.finishText {
  width: 100vw;
  height: 15vw;
  font-size: 5vw;
  color: #999;
  text-align: center;
  line-height: 15vw;
  // margin-top: 10vw;
  background-color: #e8e8e8;
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
  .span {
    width: 100vw;
    height: 1vw;
    text-align: center;
    margin-top: -3vw;
  }
}
</style>
