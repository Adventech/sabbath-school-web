import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import locales from '@/locales'
import { useLanguageStore } from '@/stores/language'

const routes = [
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

const absgroutes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/ABSG/ABSGHome.vue')
  },

  {
    path: '/this-week',
    name: 'this-week',
    component: () => import('../views/ABSG/ABSGThisWeek.vue')
  },

  {
    path: '/about',
    name: 'about',
    component: () => import('../views/ABSG/ABSGAbout.vue')
  },

  {
    path: '/scope-and-sequence',
    name: 'scope',
    component: () => import('../views/ABSG/ABSGScopeAndSequence.vue')
  },

  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/ABSG/ABSGContact.vue')
  },

  {
    path: '/media',
    name: 'media',
    component: () => import('../views/ABSG/ABSGMedia.vue')
  },

  {
    path: '/study/:type?',
    name: 'study',
    component: () => import('../views/ABSG/ABSGStudy.vue')
  },

  {
    path: '/lang/:resourceLanguage',
    name: 'language',
    component: () => import('../views/ABSG/ABSGStudyNonEnglish.vue')
  },

  {
    path: '/:resourceLanguage/:resourceName',
    name: 'publication',
    component: () => import('../views/ABSG/ABSGResource.vue')
  },

  {
    path: '/:resourceLanguage/:resourceName/:documentName/:segmentName?',
    name: 'document',
    component: () => import('../views/ABSG/ABSGDocument.vue')
  },


]

const inverseroutes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/InVerse/InVerseHome.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('../views/ABSG/ABSGAbout.vue')
  },

  {
    path: '/contact',
    name: 'contact',
    component: () => import('../views/InVerse/InVerseContact.vue')
  },

  {
    path: '/media',
    name: 'media',
    component: () => import('../views/InVerse/InVerseMedia.vue')
  },

  {
    path: '/study',
    name: 'study',
    component: () => import('../views/InVerse/InVerseStudy.vue')
  },

  {
    path: '/:resourceLanguage/:resourceName',
    name: 'publication',
    component: () => import('../views/InVerse/InVerseResource.vue')
  },

  {
    path: '/:resourceLanguage/:resourceName/:documentName/:segmentName?',
    name: 'document',
    component: () => import('../views/InVerse/InVerseDocument.vue')
  }
]

const getRoutes = function () {
  return window.location.hostname.includes(import.meta.env.VITE_APP_SSPM_INVERSE_HOST) ? inverseroutes :
      (window.location.hostname.includes(import.meta.env.VITE_APP_SSPM_ABSG_HOST) ? absgroutes : routes)
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  scrollBehavior() {
    return { top: 0, left: 0 }
  },
  routes: getRoutes()
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
