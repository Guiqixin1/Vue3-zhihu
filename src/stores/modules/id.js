// 用来创建数组id的模块
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useArrayIdStore = defineStore('arrayId', () => {
  const arrayId = ref(0)
  const setArrayId = (newArrayId) => {
    arrayId.value = newArrayId
  }
  return {
    arrayId,
    setArrayId
  }
})
