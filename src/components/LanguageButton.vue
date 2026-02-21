<template>
  <router-link :to="'/language'" class="flex items-center hover:bg-gray-200 p-2 rounded">
    <span class="mr-1">{{ useLanguageStore().locale.flag }}</span>
    <span class="hidden lg:inline mr-1">{{ useLanguageStore().locale.native }}</span>
    <ChevronDownIcon class="w-5 h-5 md:w-6 md:h-6 flex-shrink-0"></ChevronDownIcon>
  </router-link>
</template>

<script setup>
import { ChevronDownIcon } from '@heroicons/vue/24/solid'
import { useLanguageStore } from '@/stores/language'
</script>