<template>
  <li v-if="listItemValue" v-html="listItemValue"></li>
</template>

<script>
import HighlighterMixin from '@/plugins/Highlighter/HighlighterMixin.js'
import { marked } from "../Renderer.js"
export default {
  props: ['block', 'userInput', 'blockData', 'documentId'],
  mixins: [HighlighterMixin],
  data () {
    return {
      listItemValue: null,
    }
  },
  async mounted () {
    this.listItemValue = marked.parse(this.block.markdown)
  },
}
</script>