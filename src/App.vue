<script setup>
import { watch, computed, onMounted } from 'vue'
import { useLanguageStore } from '@/stores/language'
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import HeaderAIJBabies from '@/components/HeaderAIJBabies.vue'
import FooterAIJBabies from '@/components/FooterAIJBabies.vue'
import HeaderAIJBeginner from '@/components/HeaderAIJBeginner.vue'
import FooterAIJBeginner from '@/components/FooterAIJBeginner.vue'

const languageStore = useLanguageStore()

/**
 * Updates the dir attribute on the HTML element for RTL language support
 * Required for WCAG 1.3.2 Meaningful Sequence (Level A) compliance
 */
const updateDocumentDirection = () => {
  document.documentElement.setAttribute('dir', languageStore.direction)
  document.documentElement.setAttribute('lang', languageStore.code)
}

// Watch for language changes and update document direction
watch(() => languageStore.code, updateDocumentDirection)

const isAIJBabies = computed(() => {
  return window.location.hostname.indexOf(import.meta.env.VITE_APP_AIJ_BABIES_HOST) === 0
})

const isAIJBeginner = computed(() => {
  return window.location.hostname.indexOf(import.meta.env.VITE_APP_AIJ_BEGINNER_HOST) === 0
})

const changeFavicon = function (src) {
  let link = document.querySelector("link[rel*='icon']") || document.createElement('link')
  link.rel = 'icon'
  link.href = src
  document.getElementsByTagName('head')[0].appendChild(link)
}

onMounted(() => {
  let iconSource = '/assets/logo.png'

  if (isAIJBabies.value || isAIJBeginner.value) {
    iconSource = '/assets/aij-favicon.ico'
  }

  changeFavicon(iconSource)
})

// Set initial direction on component setup
updateDocumentDirection()
</script>

<template>
  <div :class="{'aij-theme': isAIJBabies || isAIJBeginner}">
    <div>
      <HeaderAIJBabies v-if="isAIJBabies" />
      <HeaderAIJBeginner v-else-if="isAIJBeginner" />
      <Header v-else />
    </div>
    <div class="container pt-5 mx-auto px-5 lg:px-24">
      <RouterView :key="$route.fullPath" />
    </div>
    <FooterAIJBabies  v-if="isAIJBabies" />
    <FooterAIJBeginner  v-if="isAIJBeginner" />
  </div>
</template>
