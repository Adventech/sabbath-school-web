import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import locales from '@/locales'
import { useLanguageStore } from '@/stores/language'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0, left: 0 }
  },
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
    {
      path: '/resources/:lang/:resourceType',
      name: 'resources',
      component: () => import('../views/Resources.vue')
    },
    {
      path: '/resources/:lang/:resourceType/:resourceName',
      name: 'resource',
      component: () => import('../views/Resource.vue')
    },
    {
      path: '/resources/:lang/:resourceType/:resourceName/:documentName/:segmentName?',
      name: 'document',
      component: () => import('../views/Document.vue')
    },
    {
      path: '/resources/:lang/categories',
      name: 'categories',
      component: () => import('../views/Categories.vue')
    },
    {
      path: '/resources/:lang/category/:category',
      name: 'category',
      component: () => import('../views/Category.vue')
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

router.scrollBehavior = () => {
  return { x: 0, y: 0 }
}

export default router
