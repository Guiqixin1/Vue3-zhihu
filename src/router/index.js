import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/layout',
      component: () => import('@/views/layout/layoutIndex.vue')
    },
    {
      path: '/layout',
      name: 'layoutIndex',
      component: () => import('@/views/layout/layoutIndex.vue')
    },
    {
      path: '/article/list',
      component: () => import('@/views/article/articleList.vue')
    },
    {
      path: '/article/detail/:id',
      component: () => import('@/views/article/index.vue')
    },
    {
      path: '/collect',
      component: () => import('@/views/collect/index.vue')
    }
  ]
})

export default router
