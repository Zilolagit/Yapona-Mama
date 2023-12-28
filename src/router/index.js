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
    {
      path : "/gallery/:id",
      name : "Gallery Details",
      component : () => import("@/views/GalleryDetails.vue")
    },
    {
      path : "/about-us",
      name : "About Us",
      component : () => import("@/views/AboutUs.vue")
    },
    {
      path : "/delivery",
      name : "Delivery",
      component : () => import("@/views/DeliveryView.vue")
    },
    {
      path : "/contact",
      name : "Contacts",
      component : () => import("@/views/ContactView.vue")
    },
    {
      path : "/vacancy",
      name : "Vacancy",
      component : () => import("@/views/VacancyView.vue")
    },
    {
      path : "/offer",
      name : "Public Offer",
      component : () => import("@/views/PublicOffer.vue")
    },
    {
      path : "/:pathMatch(.*)*",
      name : "Not FOund",
      component : () => import("@/views/NotFound.vue")
    }
  ]
})

export default router
