<template>
  <div class="collapse-block">
    <div @click="opened = !opened" :class="{'rounded-lg': !opened}" class="collapse-block-caption">
      <p>{{ block.caption }}</p>
      <ChevronDownIcon :class="{'rotate-180': opened}" class="w-4"/>
    </div>
    <div v-show="opened" class="collapse-block-content">
      <slot />
    </div>
  </div>
</template>

<script>
import { ChevronDownIcon } from '@heroicons/vue/24/outline'
export default {
  components: { ChevronDownIcon },
  props: ['block', 'userInput', 'blockData', 'documentId'],
  data () {
    return {
      opened: false
    }
  }
}
</script>

<style lang="scss">
.collapse-block {
  &-caption {
    @apply
    theme-dark:bg-gray-900
    bg-gray-200
    cursor-pointer select-none p-3 rounded-t-lg flex justify-between;
  }
  &-content {
    @apply
    theme-dark:bg-gray-800
    bg-gray-100
    pt-1 pb-2 rounded-b-lg;
  }
}
</style>