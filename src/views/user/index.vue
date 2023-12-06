<script setup>
import { useRouter } from 'vue-router'
import image from '@/asset/TX1582_05.jpg'
const router = useRouter()
</script>
<template>
  <van-nav-bar title="个人中心" left-arrow @click-left="router.go(-1)" />
  <div class="avatar">
    <img :src="image" alt="" />
    <span class="name">大大咧咧</span>
  </div>
  <div class="myCollect" @click="router.push('/collect')">
    <van-divider />
    <span>我的收藏</span>
    <van-icon name="arrow" class="left" />
    <van-divider />
  </div>
</template>
<style lang="scss" scoped>
.avatar {
  width: 100vw;
  height: 40vw;
  //   margin: 0 auto;
  img {
    width: 20vw;
    height: 20vw;
    border-radius: 50%;
    display: block;
    margin: 10vw auto;
  }
  .name {
    font-size: 6vw;
    color: black;
    font-weight: bold;
    display: block;
    width: 100vw;
    text-align: center;
    margin-top: -6vw;
  }
}
.myCollect {
  width: 100vw;
  height: 10vw;
  span {
    font-size: 4vw;
    margin-left: 3vw;
  }
  .left {
    float: right;
    font-size: 4vw;
    color: #d3d0d0;
    margin-right: 3vw;
  }
}
</style>
