<template>
  <component :is="headingTag" :class="`select-none resource-block-heading resource-block-heading-${block.depth}`" v-html="headingText"></component>
</template>

<script>
import { BlockStyle } from "../Style/BlockStyle"

export default {
  props: ['block', 'userInput', 'blockData', 'documentId'],
  computed: {
    headingTag () {
      // Map depth 1-6 to h1-h6, default to h2 for accessibility
      const depth = Math.min(Math.max(parseInt(this.block.depth) || 2, 1), 6)
      return `h${depth}`
    },
    headingText () {
      return BlockStyle.getRenderedInlineText(this.block.markdown)
    }
  },
}
</script>

<style lang="scss">
.resource-block {
  &-heading {
    @apply font-bold;
    > p {
      @apply mt-4;
      > span {
        @apply block;
      }
    }
  }
  &-heading-1 {
    @apply text-4xl;
  }
  &-heading-2 {
    @apply text-3xl;
  }
  &-heading-3 {
    @apply text-2xl;
  }
  &-heading-4 {
    @apply text-xl;
  }
  &-heading-5 {
    @apply text-lg;
  }
  &-heading-6 {
    @apply text-base;
  }
}
</style>