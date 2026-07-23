import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ProjectDetailView from '../views/ProjectDetailView.vue'

const router = createRouter({
  history: createWebHistory(),

  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/projects/:slug',
      name: 'project-detail',
      component: ProjectDetailView,
    },
  ],

  scrollBehavior(to) {
    if (to.hash) {
        return {
        el: to.hash,
        behavior: 'smooth',
        top: 100,
        }
    }

    return {
        top: 0,
        behavior: 'smooth',
    }
  },
})

export default router