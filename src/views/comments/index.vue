<script setup>
import { useRouter, useRoute } from 'vue-router'

import { showToast } from 'vant'
import { ref } from 'vue'
import { getArticelcommentlong, getArticelcommentshort } from '@/api/article'
const router = useRouter()
const route = useRoute()

const shortcomments = ref([])
const longcomments = ref([])
const TotalComments = ref(0)

const getLongComments = async () => {
  const res = await getArticelcommentlong(route.params.id)
  // console.log(res.data.comments[0].content)
  longcomments.value = res.data.comments
  TotalComments.value += longcomments.value.length
}
getLongComments()
const getShortComments = async () => {
  const res = await getArticelcommentshort(route.params.id)
  // console.log(res.data.comments)
  shortcomments.value = res.data.comments
  TotalComments.value += shortcomments.value.length
}
getShortComments()

// 将格式化时间戳
const formatDate = (time) => {
  const timestamp = time
  const date = new Date(timestamp * 1000)

  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  return `${month}-${day} ${hour}:${minute}`
}
</script>

<template>
  <van-nav-bar title="标题" left-arrow @click-left="router.go(-1)">
    <template #title>
      <span>{{ TotalComments }}条评论</span>
    </template>
  </van-nav-bar>
  <div class="longcomments" v-if="longcomments.length > 0">
    <div class="title">{{ longcomments.length }}条长评</div>
    <ul>
      <li v-for="item in longcomments" :key="item.id">
        <div class="body">
          <div class="avatar">
            <img :src="item.avatar" alt="" />
          </div>
          <div class="main">
            <div class="author">{{ item.author }}</div>
            <div class="content" v-html="item.content"></div>
            <div class="reply" v-if="item.reply_to">
              <span
                >//{{ item.reply_to.author }}：
                <van-text-ellipsis
                  rows="1"
                  :content="item.reply_to.content"
                  expand-text="展开"
                  collapse-text="收起"
              /></span>
            </div>
            <div class="footer">
              <div class="time">
                {{ formatDate(item.time) }}
              </div>
              <div class="likes">
                <span style="margin-right: 2vw">{{ item.likes }}</span>
                <van-icon name="good-job-o" />
                <van-icon name="comment-circle-o" class="comment" />
              </div>
            </div>
            <van-divider />
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div class="shortcomments" v-if="shortcomments.length > 0">
    <div class="title">{{ shortcomments.length }}条短评</div>
    <ul>
      <li v-for="item in shortcomments" :key="item.id">
        <div class="body">
          <div class="avatar">
            <img :src="item.avatar" alt="" />
          </div>
          <div class="main">
            <div class="author">{{ item.author }}</div>
            <div class="content" v-html="item.content"></div>
            <div class="reply" v-if="item.reply_to">
              <span
                >//{{ item.reply_to.author }}：
                <van-text-ellipsis
                  rows="1"
                  :content="item.reply_to.content"
                  expand-text="展开"
                  collapse-text="收起"
              /></span>
            </div>
            <div class="footer">
              <div class="time">
                {{ formatDate(item.time) }}
              </div>
              <div class="likes">
                <span style="margin-right: 2vw">{{ item.likes }}</span>
                <van-icon name="good-job-o" />
                <van-icon name="comment-circle-o" class="comment" />
              </div>
            </div>
            <van-divider />
          </div>
        </div>
      </li>
    </ul>
  </div>
  <div class="total">
    <span>已显示全部评论</span>
  </div>
</template>
<style lang="scss" scoped>
.title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
  margin-top: 1vw;
  margin-left: 2vw;
}
.body {
  width: 100vw;
  display: flex;
  margin-left: 2vw;
  white-space: pre-line;
  .avatar {
    flex: 1;
    img {
      width: 8vw;
      height: 8vw;
      border-radius: 50%;
    }
  }
  .main {
    flex: 9;
    padding: 2vw 4vw 2vw 2vw;
    .author {
      margin-top: -1vw;
      margin-bottom: 1vw;
      font-weight: bold;
    }
    .reply {
      color: #b6b5b5;
      font-size: 4vw;
      .van-text-ellipsis {
        display: inline;
      }
    }

    .footer {
      display: flex;
      justify-content: space-between;
      text-align: center;
      .time {
        color: #b6b5b5;
        font-size: 4vw;
        margin-top: 3vw;
      }
      .likes {
        color: #b6b5b5;
        font-size: 4vw;
        margin-top: 3vw;
        margin-left: 45vw;
        .comment {
          margin-left: 5vw;
        }
      }
    }
  }
}
.total {
  width: 100vw;
  height: 20vw;
  text-align: center;
  line-height: 20vw;
  color: #b6b5b5;
}
</style>
