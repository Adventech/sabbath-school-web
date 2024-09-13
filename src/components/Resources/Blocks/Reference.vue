<template>
  <RouterLinkWithExternal class="select-none" :externalURL="block.resource.externalURL" :to="`/resources/${block.target}`">
    <div class="reference-block">
      <div class="flex-none" v-if="block.resource">
        <img class="w-12 h-12 rounded object-cover" :src="block.resource.covers.square" />
      </div>
      <div class="w-full">
        <p class="reference-block-title">{{ block.title }}</p>
        <p class="reference-block-subtitle">{{ block.subtitle }}</p>
      </div>
      <LinkIcon class="flex-none w-4" />
    </div>
  </RouterLinkWithExternal>
</template>

<script>
import { LinkIcon } from '@heroicons/vue/24/outline'
import RouterLinkWithExternal from '../../RouterLinkWithExternal.vue'

export default {
  components: { LinkIcon, RouterLinkWithExternal },
  props: ['block', 'userInput', 'blockData', 'documentId']
}
</script>

<style lang="scss">
.reference-block {
  @apply
    theme-sepia:bg-yellow-800 theme-sepia:hover:bg-yellow-700 theme-sepia:text-gray-300
    theme-dark:bg-gray-900 theme-dark:hover:bg-gray-800
    bg-gray-300 hover:bg-gray-200
    flex justify-between w-full p-3 rounded-lg items-center gap-3;

  &-title {

  }
  &-subtitle {
    @apply
    theme-sepia:text-gray-400
    text-sm text-gray-500
  }
}
</style>