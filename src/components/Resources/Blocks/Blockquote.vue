<template>
  <div class="blockquote-block">
    <div v-if="!block.callout" class="flex-none w-1 rounded-sm bg-ss-primary"></div>
    <div :class="{'blockquote-block-callout': block.callout}">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  props: ['block', 'userInput', 'blockData', 'documentId'],
}
</script>

<style lang="scss">
.blockquote-block {
  @apply flex gap-5;

  &-callout {
    @apply mx-auto italic text-lg;
  }
  &-caption {
    @apply
    theme-sepia:text-amber-900
    theme-dark:text-gray-400
    text-gray-600
    select-none uppercase text-sm font-bold mb-5;
  }
  &-citation {
    @apply
    theme-sepia:text-amber-900
    theme-dark:text-gray-400
    text-gray-600
    select-none italic self-end text-sm mt-3 mt-5;
  }
}
</style>