<template>
  <router-link :to="{name: 'resources', params: {lang: 'en', resourceType: 'aij'}}" class="flex gap-2 hover:bg-gray-200 hover:bg-gray-200 p-2 items-center rounded">
    <AIJIcon class="w-4"></AIJIcon>
    <span>Alive in Jesus</span>
  </router-link>
</template>

<script setup>
import AIJIcon from '@/assets/img/aij-icon.svg'
</script>
