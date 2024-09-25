<template>
  <div v-for="credit in credits">
    <p class="text-black font-bold text-sm">{{ credit.name }}</p>
    <p class="text-gray-500 text-sm">{{ credit.value }}</p>
  </div>
</template>

<script setup>
const props = defineProps(['credits'])
</script>