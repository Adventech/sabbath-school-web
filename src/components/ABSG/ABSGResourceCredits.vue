<template>
  <div class="flex flex-col gap-5">
    <div v-for="credit in credits">
      <p class="text-gray-600 font-bold text-sm">{{ credit.name }}</p>
      <p class="text-gray-500 text-sm">{{ credit.value }}</p>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['credits'])
</script>