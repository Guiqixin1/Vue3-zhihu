import { createApp } from 'vue'
import Vant from 'vant'

import App from './App.vue'
import router from './router'
// 统一仓库管理，导入pinia
import pinia from '@/stores/index.js'
// // 因为Toast,Dialog等组件以函数的形式提供，自动导入无法解析，需要手动导入
// // 这里设置为全局
// // Dialog
// import { showDialog } from 'vant'
// import 'vant/es/dialog/style'
// // Toast

// 引入重置默认样式
import '@/asset/reset.css'
import Vue3TouchEvents from 'vue3-touch-events'
const app = createApp(App)

app.use(pinia)
app.use(router)
app.use(Vant)
app.use(Vue3TouchEvents)

app.mount('#app')
