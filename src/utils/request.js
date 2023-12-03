import axios from 'axios'
// Toast
import { showLoadingToast, closeToast } from 'vant'
import 'vant/es/toast/style'
const request = axios.create({
  baseURL: '/baseurl',
  timeout: 10000
})

// 添加请求拦截器
request.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    showLoadingToast({
      message: '加载中...',
      forbidClick: true,
      duration: 0
    })
    return config
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)
// 添加响应拦截器
request.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    // 数据响应回来后关闭showLoadingToast
    closeToast()
    return response
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error)
  }
)
export default request
