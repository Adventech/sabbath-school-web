<template>
  <p :style="getTextStyle(block.style).style"
     :class="`${getTextStyle(block.style).class} select-none resource-block-heading resource-block-heading-${block.depth}`" v-html="render(block.markdown)"></p>
</template>

<script>
import { marked, renderer } from '../Renderer.js'
import { getTextStyle } from "@/plugins/Theme/TextStyle.js"

export default {
  props: ['block', 'userInput', 'blockData', 'documentId'],
  data () {
    return {
      getTextStyle,
    }
  },
  methods: {
    render: function (text) {
      return marked.parse(text, { renderer })
    }
  }
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