// 收藏模块

import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useCollectStore = defineStore(
  'collect',
  () => {
    const collectList = ref([])
    // const id = ref('')
    // const images = ref('')
    // const title = ref('')
    // const collect = ref(false)
    const setCollect = (obj) => {
      collectList.value.push(obj)
    }
    const removeCollect = (id) => {
      collectList.value.forEach((item, index) => {
        if (item.id === id) {
          collectList.value.splice(index, 1)
        }
      })
    }
    return {
      setCollect,
      removeCollect,
      collectList
    }
  },
  {
    persist: true
  }
)
