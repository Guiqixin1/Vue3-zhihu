import request from '@/utils/request'

// 获取文章最新列表数据
export const getArticelLaest = () => {
  return request.get('/news/latest')
}

// 获取往日文章列表
export const getArticelbefore = (date) => {
  return request.get(`/news/before/${date}`)
}

// 获取文章内容详情
export const getArticledetail = (id) => {
  return request.get(`/news/${id}`)
}

// 获取文章评论数
export const getArticelcomment = (id) => {
  return request.get(`/story-extra/${id}`)
}
