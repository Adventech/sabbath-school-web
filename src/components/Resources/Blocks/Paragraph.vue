<template>
  <div v-bible-links="{blockId: block.id}"
       v-if="paragraphText"
       v-html="paragraphText"
       class="paragraph-block"></div>
</template>

<script>
import HighlighterMixin from '@/plugins/Highlighter/HighlighterMixin.js'
import { BlockStyle } from "../Style/BlockStyle"

export default {
  props: ['block', 'userInput', 'parent'],
  mixins: [HighlighterMixin],
  data () {
    return {
      paragraphText: null,
    }
  },
  mounted () {
    this.paragraphText = BlockStyle.getRenderedInlineText(this.block.markdown)
  },
}
</script>

<style lang="scss">
.resource-link {
  @apply break-words;
  &-sspm-bible {
    @apply border-b-2 outline-none;
  }

  &-sspm-egw {
    @apply border-b border-black outline-none;
  }

  &-other {
    @apply text-ss-primary hover:border-b hover:border-ss-primary;
  }
}

</style>