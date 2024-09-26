<template>
  <div class="collapse-block">
    <div @click="opened = !opened" :class="{'rounded-lg': !opened}" class="collapse-block-caption">
      <p>{{ block.caption }}</p>
      <ChevronDownIcon :class="{'rotate-180': opened}" class="w-4"/>
    </div>
    <div v-show="opened" class="collapse-block-content">
      <div class="flex flex-col gap-3">
        <slot></slot>
      </div>
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
    theme-sepia:bg-yellow-50
    theme-dark:bg-gray-900
    bg-gray-200
    cursor-pointer select-none p-3 rounded-t-lg flex justify-between;
  }
  &-content {
    @apply
    theme-sepia:border-amber-200 theme-sepia:border-t-0
    theme-dark:bg-black theme-dark:border-gray-900
    border border-gray-200
    p-5 rounded-b-lg;
  }
}
</style>