<template>
  <div class="ss-grid">
    <div v-for="card in Array.from(Array(12).keys())" class="min-w-ss-cover max-w-ss-cover max-h-ss-cover min-h-ss-cover">
      <div class="animate-pulse bg-gray-200 rounded h-64 mb-2"></div>
      <div class="animate-pulse bg-gray-200 rounded h-2 mb-2"></div>
      <div class="animate-pulse bg-gray-200 rounded h-2 mb-2 w-1/2"></div>
      <div class="animate-pulse bg-gray-200 rounded h-2 mb-2 w-2/3"></div>
    </div>
  </div>
</template>