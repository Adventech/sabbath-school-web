<script setup>
import { watch, onMounted } from 'vue'
import { useLanguageStore } from '@/stores/language'
import { RouterView } from 'vue-router'
import InVerseHeader from '@/components/InVerse/InVerseHeader.vue'
import InVerseFooter from '@/components/InVerse/InVerseFooter.vue'

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

// Set initial direction on component setup
updateDocumentDirection()

onMounted(() => {
  let iconSource = '/assets/inverse-favicon.png'

  let link = document.querySelector("link[rel*='icon']") || document.createElement('link')
  link.rel = 'icon'
  link.href = iconSource
  document.getElementsByTagName('head')[0].appendChild(link)
})
</script>

<template>
  <InVerseHeader :key="$route.fullPath" />
  <RouterView :key="$route.fullPath" />
  <InVerseFooter />
</template>

<style lang="scss">
* {font-family: 'manrope'}
body { @apply bg-white }
</style>
