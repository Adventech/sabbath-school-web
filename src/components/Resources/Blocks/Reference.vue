<template>
  <RouterLinkWithExternal class="select-none" :externalURL="block.resource.externalURL" :to="block.scope === 'resource' ? `/resources/${block.resource.index}` : `/resources/${block.document.index}`">
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
    theme-dark:bg-gray-900
    bg-gray-200
    flex justify-between w-full p-3 rounded-lg items-center gap-3;
  &-title {}
  &-subtitle {
    @apply text-sm text-gray-400
  }
}
</style>