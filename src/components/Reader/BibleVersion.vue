<template>
  <div v-if="versions.length > 1" class="p-4 bg-app">
    <button @click="$emit('bibleSelected', version)" v-for="(version, i) in versions" :key="`bible_version_${i}`"
            :class="{'bg-app-hover border-app': version === selectedVersion}"
            class="py-2 px-3 hover:bg-app-hover first:rounded-l-md last:rounded-r-md border-l border-t border-b last:border-r border-app shadow-sm text-app-primary">{{ version }}</button>
  </div>
</template>

<script setup>
const props = defineProps({
  selectedVersion: String,
  versions: Array
})
</script>