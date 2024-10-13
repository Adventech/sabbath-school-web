<template>
  <div v-bible-links="{blockId: block.id}"
       v-if="paragraphText"
       v-html="paragraphText"
       class="paragraph-block"></div>
</template>

<script>
import HighlighterMixin from '@/plugins/Highlighter/HighlighterMixin.js'
import CompletionMixin from '@/plugins/Completion/CompletionMixin.js'
import { BlockStyle } from "../Style/BlockStyle"

export default {
  props: ['block', 'userInput', 'parent'],
  mixins: [HighlighterMixin, CompletionMixin],
  computed: {
    paragraphText () {
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

<style lang="scss">
.resource-link {
  @apply break-words;

  &-sspm-egw, &-sspm-bible {
    @apply outline-none underline underline-offset-4;
  }

  &-sspm-completion {
    @apply px-2 rounded bg-gray-200 select-none;
    &-correct {
      @apply bg-green-200;
    }

    &-incorrect {
      @apply bg-red-100;
    }
  }

  &-other {
    @apply text-ss-primary hover:border-b hover:border-ss-primary;
  }
}

</style>