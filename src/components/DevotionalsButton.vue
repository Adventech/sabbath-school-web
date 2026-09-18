<template>
  <router-link :to="{name: 'resources', params: {lang: 'en', resourceType: 'devo'}}" class="flex gap-2 hover:bg-app-hover p-2 rounded">
    <DevotionalsIcon class="w-4 text-blue-700"></DevotionalsIcon> Devotionals
  </router-link>
</template>

<script setup>
import DevotionalsIcon from '@/assets/img/devotionals-icon.svg'
</script>
