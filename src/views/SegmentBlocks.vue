<template>
  <div>
    <div :class="[{'absolute right-5 top-5': cover}, {'pt-5 pr-5': !cover}]" class="flex justify-end">
      <div class="auxiliary auxiliary-light"
           :class="[{'auxiliary-dark': cover || themeStore().color === THEME_COLOR.DARK}]" >
        <slot name="auxTheme"></slot>
        <slot name="auxAudio"></slot>
        <slot name="auxVideo"></slot>
        <slot name="auxPdf"></slot>
      </div>
    </div>

    <div
         class="w-full bg-no-repeat bg-cover rounded-t flex flex-col justify-end bg-center bg-auto "
         :class="{'h-64 md:h-ss-cover': cover}"
         :style="`background-image:url('${cover}');`"
    >
      <div class="flex flex-col"
           :class="{
        'p-5 text-white bg-gradient-to-b from-transparent to-black/40': cover && !titleBelowCover,
        'p-5 text-white': cover && titleBelowCover,
        'mx-5 mb-5 mt-5': !cover,
      }"
      >
        <div v-if="!titleBelowCover">
          <p v-if="segment.date" class="text-gray-300">{{ DayJS(segment.date, 'DD/MM/YYYY').format('dddd, MMMM DD') }}</p>
          <p :style="`${segmentTitleTextStyle.style}`" :class="['segment-title', `${segmentTitleTextStyle.class}`, {'segment-title-plain': !segment.markdownTitle}]" v-html="title"></p>
          <p :style="`${segmentSubtitleTextStyle.style}`" :class="['segment-subtitle', `${segmentSubtitleTextStyle.class}`]" v-html="subtitle"></p>
        </div>
      </div>
    </div>

    <div class="p-5" v-if="titleBelowCover">
      <p v-if="segment.date" class="text-gray-300">{{ DayJS(segment.date, 'DD/MM/YYYY').format('dddd, MMMM DD') }}</p>
      <p :style="`${segmentTitleTextStyle.style}`" :class="['segment-title', `${segmentTitleTextStyle.class}`, {'segment-title-plain': !segment.markdownTitle}]" v-html="title"></p>
      <p :style="`${segmentSubtitleTextStyle.style}`" :class="['segment-subtitle', `${segmentSubtitleTextStyle.class}`]" v-html="subtitle"></p>
    </div>

    <slot v-if="$slots.pdf" name="pdf"></slot>
    <div v-else v-context-menu>
      <div class="flex gap-4 flex-col py-5">
        <Block v-for="(block) in segment.blocks"
               :block="block"
               :key="`segment_block_${block.id}`"
        ></Block>
      </div>
    </div>
  </div>
</template>

<script>
import DayJS from 'dayjs'
import PDFAuxiliary from '@/components/Resources/PDFAuxiliary.vue'
import { THEME_COLOR, themeStore } from '@/plugins/Theme/ThemeStore.js'
import { SegmentTitleTextStyle, SegmentSubtitleTextStyle } from "../components/Resources/Style/SegmentTextStyle"

export default {
  props: ['segment'],
  inject: ['getDocument', 'getStyle', 'getDefaultStyles'],
  components: { PDFAuxiliary },
  computed: {
    cover () {
      return this.segment.cover || this.document.cover
    },
    document () {
      return this.getDocument()
    },
    defaultStyles() {
      return this.getDefaultStyles()
    },
    style() {
      return this.getStyle()
    },

    titleBelowCover () {
      return this.document.titleBelowCover || this.segment.titleBelowCover
    },

    title () {
      return this.segment.markdownTitle ?
          SegmentTitleTextStyle.getRenderedInlineText(this.segment.markdownTitle) :
          this.segment.title
    },

    subtitle () {
      return this.segment.markdownSubtitle ?
          SegmentSubtitleTextStyle.getRenderedInlineText(this.segment.markdownSubtitle) :
          this.segment.subtitle
    },

    segmentTitleTextStyle () {
      return SegmentTitleTextStyle.getTextStyle(this.segment.style ?? this.style, 'segment.title')
    },

    segmentSubtitleTextStyle () {
      return SegmentSubtitleTextStyle.getTextStyle(this.segment.style ?? this.style, 'segment.subtitle')
    },
  },
  data () {
    return {
      DayJS,
      themeStore,
      THEME_COLOR,
    }
  },
}
</script>

<style lang="scss" scoped>
.segment-title {
  @apply text-lg md:text-2xl lg:text-3xl w-full;

  &-plain {
    @apply font-bold;
  }

  &-text-center {
    @apply px-10;
  }
}

.segment-subtitle {
  @apply text-gray-400;
}
</style>