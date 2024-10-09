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
  computed: {
    paragraphText () {
      return BlockStyle.getRenderedInlineText(this.block.markdown)
    }
  },
}
</script>

<style lang="scss">
.resource-link {
  @apply break-words;

  &-sspm-egw, &-sspm-bible {
    @apply outline-none underline underline-offset-4;
  }

  &-other {
    @apply text-ss-primary hover:border-b hover:border-ss-primary;
  }
}

</style>