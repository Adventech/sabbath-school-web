<template>
  <router-link :to="'/language'" class="flex w-auto justify-center md:justify-left hover:bg-gray-200 p-2 rounded">
    <span class="mr-1">{{ useLanguageStore().locale.flag }} {{ useLanguageStore().locale.native }}</span><ChevronDownIcon class="w-6 h-6"></ChevronDownIcon>
  </router-link>
</template>

<script setup>
import { ChevronDownIcon } from '@heroicons/vue/solid'
import { useLanguageStore } from '@/stores/language'
</script>