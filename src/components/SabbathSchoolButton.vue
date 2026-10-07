<template>
  <router-link to="/" class="flex gap-2 hover:bg-app-hover p-2 items-center rounded">
    <SabbathSchoolIcon class="w-4 flex-shrink-0 ss-icon"></SabbathSchoolIcon>
    <span class="hidden md:inline">Sabbath School</span>
  </router-link>
</template>

<script setup>
import SabbathSchoolIcon from '@/assets/img/sabbath-school-icon.svg'
</script>

<style scoped>
html[data-theme="dark"] .ss-icon {
  --ss-icon-color: #ffffff;
}
</style>
