<template>
  <div v-bible-links="{blockId: block.id}" :style="getTextStyle(block.style).style" class="paragraph-block" :class="getTextStyle(block.style).class" v-if="paragraphText" v-html="paragraphText"></div>
</template>

<script>
import HighlighterMixin from '@/plugins/Highlighter/HighlighterMixin.js'
import { marked, renderer } from "../Renderer.js"
import { getTextStyle } from "../../../plugins/Theme/TextStyle.js"

export default {
  props: ['block', 'userInput', 'blockData', 'documentId'],
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
</style>