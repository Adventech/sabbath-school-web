<template>
  <div>
    <div v-if="segment.type === 'block'"
         :class="themeStore().getClassList()">
      <div class="flex justify-end px-10">
        <Theme></Theme>
      </div>
      <SegmentBlocks :segment="segment"></SegmentBlocks>
    </div>
    <SegmentPDF v-if="segment.type === 'pdf'" :segment="segment"></SegmentPDF>
  </div>
</template>

<script>
import SegmentBlocks from '@/views/SegmentBlocks.vue'
import SegmentPDF from '@/views/SegmentPDF.vue'
import { themeStore } from '@/plugins/Theme/ThemeStore.js'
import Theme from '@/plugins/Theme/Theme.vue'

export default {
  components: { SegmentBlocks, SegmentPDF, Theme },
  props: ['segment'],
  data () {
    return {
      themeStore,
    }
  },
}
</script>