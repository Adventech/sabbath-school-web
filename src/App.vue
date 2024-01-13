<script setup>
import { ref, watch } from 'vue'
import { useLanguageStore } from '@/stores/language'
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'

let dir = ref('auto')

watch(() => useLanguageStore().code, function() {
  directionCalc()
});

const directionCalc = function () {
  let languageCode = useLanguageStore().locale.code
  dir = ['ar', 'fa', 'he'].includes(languageCode) ? 'rtl' : 'auto'
}

directionCalc()
</script>

<template>
  <div :dir="dir" class="container mx-auto px-5 lg:px-20">
    <Header />
    <RouterView :key="$route.fullPath" />
  </div>
</template>
