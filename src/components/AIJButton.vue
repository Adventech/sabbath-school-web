<template>
  <router-link :to="{name: 'resources', params: {lang: 'en', resourceType: 'aij'}}" class="flex gap-2 hover:bg-app-hover p-2 items-center rounded">
    <AIJIcon class="w-4 flex-shrink-0 aij-icon"></AIJIcon>
    <span class="hidden md:inline">Alive in Jesus</span>
  </router-link>
</template>

<script setup>
import AIJIcon from '@/assets/img/aij-icon.svg'
</script>

<style scoped>
html[data-theme="dark"] .aij-icon {
  --aij-icon-color: #ffffff;
}
</style>
