import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)
export default pinia

export * from './modules/collect.js' // 接收collect模块的所有按需导出
