<template>
  <li v-bible-links="{blockId: block.id}"
      class="list-item-block" v-if="listItemValue" v-html="listItemValue"></li>
</template>

<script>
import HighlighterMixin from '@/plugins/Highlighter/HighlighterMixin.js'
import CompletionMixin from '@/plugins/Completion/CompletionMixin.js'
import { BlockStyle } from "../Style/BlockStyle"

export default {
  props: ['block', 'userInput', 'blockData', 'documentId'],
  mixins: [HighlighterMixin, CompletionMixin],
  computed: {
    listItemValue () {
      return BlockStyle.getRenderedInlineText(
          this.block.markdown,
          this.block.data,
          this.userInput,
          this.contextData,
      )
    }
  },
}
</script>

<style lang="scss" scoped>
.list-item-block {
  @apply mb-2 #{!important};
}
</style>