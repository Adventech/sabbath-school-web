<template>
  <li v-bible-links="{blockId: block.id}"
      class="list-item-block" v-if="listItemValue" v-html="listItemValue"></li>
</template>

<script>
import HighlighterMixin from '@/plugins/Highlighter/HighlighterMixin.js'
import { marked, renderer } from "../Renderer.js"
export default {
  props: ['block', 'userInput', 'blockData', 'documentId'],
  mixins: [HighlighterMixin],
  data () {
    return {
      listItemValue: null,
    }
  },
  async mounted () {
    this.listItemValue = marked.parse(this.block.markdown, { renderer })
  },
}
</script>

<style lang="scss" scoped>
.list-item-block {
  @apply mb-2;
}
</style>