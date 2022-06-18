<template>
  <div v-if="versions.length > 1" class="p-4">
    <button @click="$emit('bibleSelected', version)" v-for="(version, i) in versions" :key="`bible_version_${i}`"
            :class="{'bg-gray-200': version === selectedVersion}"
            class="py-2 px-3 hover:bg-gray-100 first:rounded-l-md last:rounded-r-md border-l border-t border-b last:border-r border-gray-200 shadow-sm">{{ version }}</button>
  </div>
</template>

<script setup>
const props = defineProps({
  selectedVersion: String,
  versions: Array
})
</script>