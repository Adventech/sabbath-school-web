<script setup>
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
</script>

<template>
  <div class="container mx-auto px-5 lg:px-20">
    <Header />
    <RouterView :key="$route.fullPath" />
  </div>
</template>
