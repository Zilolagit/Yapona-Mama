import { createRouter, createWebHistory } from 'vue-router'

import HomeView from "@/views/HomeView.vue"

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/news',
      name: 'News',
      component: () => import('@/views/NewsView.vue')
    },
    {
      path: '/restaurants',
      name: 'restaurants',
      component: () => import('@/views/RestaurantsView.vue')
    },
    {
      path: '/restaurants/:id',
      name: 'About Restaurant',
      component: () => import('@/views/RestaurantDetails.vue')
    },
    {
      path: '/gallery',
      name: 'gallery',
      component: () => import('@/views/GalleryView.vue')
    },
    {
      path: '/menu',
      name: 'menu',
      component: () => import('@/views/MenuView.vue')
    },
  ]
})

export default router
