import { createRouter, createWebHistory } from 'vue-router'


import HomeView from '../views/HomeView.vue';
import AboutView from '../views/AboutView.vue';
import WorkView from '../views/WorkView.vue';


export default createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        enterClass: 'animate__animated',
        leaveClass: 'animate__animated',
      }
    },
    {
      path: '/about',
      name: 'about',
      component: AboutView,
      meta: {
        enterClass: 'animate__animated animate__fadeInLeft',
        leaveClass: 'animate__animated animate__fadeOutRight',
      }
    },
    {
      path: '/work',
      name: 'work',
      component: WorkView,
      meta: {
        enterClass: 'animate__animated animate__fadeInRight',
        leaveClass: 'animate__animated animate__fadeOutLeft',
      }
    }
  ]
});
