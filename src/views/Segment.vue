<template>
  <div>
    <div v-if="sSegment" class="relative rounded">
      <SegmentBlocks v-if="sSegment.type === 'block'" :segment="sSegment">
        <template #auxTheme>
          <slot name="auxTheme"></slot>
        </template>
        <template #auxAudio>
          <slot name="auxAudio"></slot>
        </template>
        <template #auxVideo>
          <slot name="auxVideo"></slot>
        </template>
        <template #auxPdf>
          <slot name="auxPdf"></slot>
        </template>

        <template v-if="$slots.pdf && $slots.pdf().length" #pdf>
          <slot name="pdf"></slot>
        </template>
      </SegmentBlocks>
      <SegmentStory v-if="sSegment.type === 'story'" :segment="sSegment">
        <template #auxPdfStory>
          <slot name="auxPdfStory"></slot>
        </template>
        <template v-if="$slots.pdf && $slots.pdf().length" #pdf>
          <slot name="pdf"></slot>
        </template>
      </SegmentStory>
      <SegmentPDF v-if="sSegment.type === 'pdf'" :segment="sSegment"></SegmentPDF>
      <SegmentVideo v-if="sSegment.type === 'video'" :segment="sSegment"></SegmentVideo>
    </div>

    <Popup :open="bibleOpen" @closed="bibleOpen = false" :noPadding="true">
      <Bible :bible="bibleData" :verse="bibleVerse"></Bible>
    </Popup>

    <Popup :open="egwOpen" @closed="egwOpen = false" :noPadding="true">
      <EGW :egwData="egwData" :reference="egwReference"></EGW>
    </Popup>
  </div>
</template>

<script>
import SegmentBlocks from '@/views/SegmentBlocks.vue'
import SegmentStory from '@/views/SegmentStory.vue'
import SegmentPDF from '@/views/SegmentPDF.vue'
import SegmentVideo from '@/views/SegmentVideo.vue'
import StoryAudio from '@/components/Resources/StoryAudio.vue'
import { themeStore } from '@/plugins/Theme/ThemeStore.js'
import Popup from '@/components/Popup.vue'
import Bible from '@/components/Resources/Bible.vue'
import EGW from '@/components/Resources/EGW.vue'

export default {
  components: { SegmentBlocks, SegmentPDF, SegmentStory, SegmentVideo, Popup, Bible, EGW, StoryAudio },
  props: ['segment', 'segmentIndex'],
  provide () {
    return {
      getSegment: () => this.sSegment
    }
  },
  data () {
    return {
      themeStore,
      loading: false,
      loadedSegment: null,
      bibleOpen: false,
      bibleVerse: null,
      bibleData: null,
      egwOpen: false,
      egwReference: null,
      egwData: null,
    }
  },
  computed: {
    sSegment () {
      return this.segment || this.loadedSegment
    },

  },
  async mounted () {
    this.emitter.on('bible-click', async (v) => {
      if (!v.blockId || !v.verse) return
      const block = this.findBlockById(this.sSegment.blocks, v.blockId)
      const verse = v.verse.replace(/sspmbible:\/\//i, '')

      if (block && verse) {
        this.bibleData = block?.data?.bible
        this.bibleVerse = verse
        this.bibleOpen = true
      }
    });

    this.emitter.on('egw-click', async (v) => {
      if (!v.blockId || !v.reference) return
      const block = this.findBlockById(this.sSegment.blocks, v.blockId)
      const reference = v.reference.replace(/sspmEgw:\/\//i, '')

      if (block) {
        this.egwData = block?.data?.egw
        this.egwReference = reference
        this.egwOpen = true
      }
    });

    if (!this.segment && this.segmentIndex) {
      await this.getSegment()
    }
  },
  methods: {
    async getSegment () {
      this.loading = true
      const segment = await this.$apiResources.get(`${this.segmentIndex}/index.json`)
      this.loadedSegment = segment.data
      this.loading = false
    },
    findBlockById (items, blockId) {
      for (const block of items) {
        if (block.id === blockId) {
          return block
        }
        if (block.items && block.items.length) {
          const found = this.findBlockById(block.items, blockId)
          if (found) {
            return found
          }
        }
      }
      return null;
    },
  },
}
</script>