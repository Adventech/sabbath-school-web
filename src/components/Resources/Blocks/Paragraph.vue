<template>
  <div v-bible-links="{blockId: block.id}" :style="getTextStyle(block.style).style" class="paragraph-block" :class="getTextStyle(block.style).class" v-if="paragraphText" v-html="paragraphText"></div>
</template>

<script>
import HighlighterMixin from '@/plugins/Highlighter/HighlighterMixin.js'
import { marked, renderer } from "@/components/Resources/Renderer.js"
import { getTextStyle } from "@/plugins/Theme/TextStyle.js"

export default {
  props: ['block', 'userInput'],
  mixins: [HighlighterMixin],
  data () {
    return {
      paragraphText: null,
      getTextStyle,
    }
  },
  mounted () {
    this.paragraphText = marked.parse(this.block.markdown, { renderer })
  },
}
</script>

<style lang="scss">
.resource-link-sspm-bible,
.resource-link-sspm-egw {
  @apply border-b border-ss-primary font-bold;
}

.paragraph-block {
  a {
    @apply text-ss-primary;
  }
}
</style>