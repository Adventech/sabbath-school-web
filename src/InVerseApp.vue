<script setup>
import { ref, watch, computed, onMounted } from 'vue'
import { useLanguageStore } from '@/stores/language'
import { RouterView } from 'vue-router'
import InVerseHeader from '@/components/InVerse/InVerseHeader.vue'
import InVerseFooter from '@/components/InVerse/InVerseFooter.vue'

let dir = ref('auto')

watch(() => useLanguageStore().code, function() {
  directionCalc()
});

const directionCalc = function () {
  let languageCode = useLanguageStore().locale.code
  dir = ['ar', 'fa', 'he'].includes(languageCode) ? 'rtl' : 'auto'
}

directionCalc()

onMounted(() => {
  let iconSource = '/assets/logo.png'

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
