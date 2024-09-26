<template>
  <div v-bible-links="{blockId: block.id}"
       v-if="paragraphText"
       v-html="paragraphText"
       class="paragraph-block"></div>
</template>

<script>
import HighlighterMixin from '@/plugins/Highlighter/HighlighterMixin.js'
import { marked, renderer } from "@/components/Resources/Renderer.js"

export default {
  props: ['block', 'userInput', 'parent'],
  mixins: [HighlighterMixin],
  data () {
    return {
      paragraphText: null,
    }
  },
  mounted () {
    this.paragraphText = marked.parse(this.block.markdown, { renderer })
  },
}
</script>

<style lang="scss">
.resource-link {
  @apply break-words;
  &-sspm-bible,
  &-sspm-egw {
    @apply border-b border-ss-primary font-bold text-ss-primary;
  }

  &-other {
    @apply text-ss-primary hover:border-b hover:border-ss-primary;
  }
}

</style>