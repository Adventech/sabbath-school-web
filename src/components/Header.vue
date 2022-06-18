<template>
  <header class="mt-3 md:flex w-full justify-between py-4 border-b items-center">
    <router-link :to="'/'" class="flex flex-grow justify-center md:justify-start mb-2 md:mb-0">
      <img class="w-9 h-9 mr-3" src="/assets/logo.png" />
      <p class="font-bold text-2xl">Sabbath School</p>
    </router-link>
    <div>
      <LanguageButton></LanguageButton>
    </div>
  </header>
</template>

<script setup>
import LanguageButton from '@/components/LanguageButton.vue'
</script>
