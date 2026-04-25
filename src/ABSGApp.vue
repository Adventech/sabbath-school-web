<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useLanguageStore } from '@/stores/language'
import { RouterView } from 'vue-router'
import ABSGHeader from '@/components/ABSG/ABSGHeader.vue'
import ABSGFooter from '@/components/ABSG/ABSGFooter.vue'
import { READER_THEME, readerOptionsStore, applyGlobalTheme, initGlobalTheme } from '@/components/Reader/ReaderOptionsStore'

let dir = ref('auto')

watch(() => useLanguageStore().code, function() {
  directionCalc()
});

const directionCalc = function () {
  let languageCode = useLanguageStore().locale.code
  dir = ['ar', 'fa', 'he'].includes(languageCode) ? 'rtl' : 'auto'
}

// Watch for theme changes and apply globally
watch(() => readerOptionsStore().theme, (newTheme) => {
  applyGlobalTheme(newTheme)
})

directionCalc()

onMounted(() => {
  initGlobalTheme()

  let iconSource = '/assets/logo.png'

  let link = document.querySelector("link[rel*='icon']") || document.createElement('link')
  link.rel = 'icon'
  link.href = iconSource
  document.getElementsByTagName('head')[0].appendChild(link)
})
</script>

<template>
  <ABSGHeader :key="$route.fullPath" />
  <RouterView :key="$route.fullPath" />
  <ABSGFooter />
</template>

<style lang="scss">
* {font-family: 'manrope'}
body { @apply bg-white }
</style>
