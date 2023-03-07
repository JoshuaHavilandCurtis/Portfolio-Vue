import { createRouter, createWebHistory } from 'vue-router'


import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import WorkView from '../views/WorkView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { transition: 'slide-left' }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: { transition: 'slide-left' }
    },
    {
      path: '/work',
      name: 'work',
      component: WorkView,
      meta: { transition: 'slide-left' }
    }
  ]
})

export default router
