<template>
  <li v-bible-links="{blockId: block.id}"
      class="list-item-block" v-if="listItemValue" v-html="listItemValue"></li>
</template>

<script>
import HighlighterMixin from '@/plugins/Highlighter/HighlighterMixin.js'
import { BlockStyle } from "../Style/BlockStyle"

export default {
  props: ['block', 'userInput', 'blockData', 'documentId'],
  mixins: [HighlighterMixin],
  computed: {
    listItemValue () {
      return BlockStyle.getRenderedInlineText(this.block.markdown)
    }
  },
}
</script>

<style lang="scss" scoped>
.list-item-block {
  @apply mb-2 #{!important};
}
</style>