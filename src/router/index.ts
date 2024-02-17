import { createRouter, createWebHistory } from 'vue-router'
import { allRoutes } from '@/router/routes'
const router = createRouter({
  history: createWebHistory(),
  routes: allRoutes
})

export default router
