import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import locales from '@/locales'
import { useLanguageStore } from '@/stores/language'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/:lang',
      name: 'quarterlies',
      component: () => import('../views/Quarterlies.vue')
    },
    {
      path: '/:lang/:quarter',
      name: 'lessons',
      component: () => import('../views/Lessons.vue')
    },
    {
      path: '/:lang/:quarter/:lesson/:day?',
      name: 'read',
      component: () => import('../views/Read.vue')
    },
    {
      path: '/language',
      name: 'languages',
      component: () => import('../views/Languages.vue')
    },
  ]
})

/**
 * TODO: refactor to use the store that fetches the languages from API instead of using locales
 */
router.beforeEach(async (to, from, next) => {
  if (to.params.lang) {
    const found = locales.find(element => element.code === to.params.lang);
    if (!found) {
      next('/')
    } else {
      useLanguageStore().locale = found
    }
  }
  next()
})

export default router
