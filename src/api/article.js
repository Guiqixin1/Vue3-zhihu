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

// 获取文章额外参数
export const getArticelcomment = (id) => {
  return request.get(`/story-extra/${id}`)
}

// 获取新闻对应长评
export const getArticelcommentlong = (id) => {
  return request.get(`/story/${id}/long-comments`)
}

// 获取新闻对应短评
export const getArticelcommentshort = (id) => {
  return request.get(`/story/${id}/short-comments`)
}
