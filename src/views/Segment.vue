<template>
  <div :style="`background-image:url('${segment.background}')`"
       class="bg-top bg-no-repeat relative pb-5 rounded">
    <div v-if="segment.type === 'block'"
         :class="themeStore().getClassList()">
      <div class="flex justify-end absolute right-5 top-5">
        <Theme></Theme>
      </div>
      <SegmentBlocks :segment="segment"></SegmentBlocks>
    </div>
    <SegmentStory v-if="segment.type === 'story'" :segment="segment"></SegmentStory>
    <SegmentPDF v-if="segment.type === 'pdf'" :segment="segment"></SegmentPDF>
  </div>
</template>

<script>
import SegmentBlocks from '@/views/SegmentBlocks.vue'
import SegmentStory from '@/views/SegmentStory.vue'
import SegmentPDF from '@/views/SegmentPDF.vue'
import { themeStore } from '@/plugins/Theme/ThemeStore.js'
import Theme from '@/plugins/Theme/Theme.vue'

export default {
  components: { SegmentBlocks, SegmentPDF, SegmentStory, Theme },
  props: ['segment'],
  data () {
    return {
      themeStore,
    }
  },
}
</script>