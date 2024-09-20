<script setup>
import { ref, watch, computed } from 'vue'
import { useLanguageStore } from '@/stores/language'
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
import HeaderAIJBabies from '@/components/HeaderAIJBabies.vue'
import FooterAIJBabies from '@/components/FooterAIJBabies.vue'
import HeaderAIJBeginner from '@/components/HeaderAIJBeginner.vue'
import FooterAIJBeginner from '@/components/FooterAIJBeginner.vue'

let dir = ref('auto')

watch(() => useLanguageStore().code, function() {
  directionCalc()
});

const directionCalc = function () {
  let languageCode = useLanguageStore().locale.code
  dir = ['ar', 'fa', 'he'].includes(languageCode) ? 'rtl' : 'auto'
}

const isAIJBabies = computed(() => {
  return window.location.hostname.indexOf(import.meta.env.VITE_APP_AIJ_BABIES_HOST) === 0
})

const isAIJBeginner = computed(() => {
  return window.location.hostname.indexOf(import.meta.env.VITE_APP_AIJ_BEGINNER_HOST) === 0
})

directionCalc()
</script>

<template>
  <div :dir="dir" :class="{'aij-theme': isAIJBabies || isAIJBeginner}">
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
