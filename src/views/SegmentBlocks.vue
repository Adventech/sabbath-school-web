<template>
  <div>
    <div class="flex justify-end absolute right-5 top-5">
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
          <p :style="`${titleClassesAndStyle.style}`" :class="`${titleClassesAndStyle.class}`" class="segment-title text-xl md:text-3xl font-bold w-full line-clamp-3" v-html="title"></p>
          <p :style="`${subTitleClassesAndStyle.style}`" :class="`${subTitleClassesAndStyle.class}`" v-if="segment.subtitle" class="text-gray-400">{{ segment.subtitle }}</p>
        </div>
      </div>
    </div>

    <div class="p-5" v-if="titleBelowCover">
      <p v-if="segment.date" class="text-gray-300">{{ DayJS(segment.date, 'DD/MM/YYYY').format('dddd, MMMM DD') }}</p>
      <p :style="`${titleClassesAndStyle.style}`" :class="`${titleClassesAndStyle.class}`" class="segment-title text-xl md:text-3xl font-bold w-full line-clamp-3" v-html="title"></p>
      <p :style="`${subTitleClassesAndStyle.style}`" :class="`${subTitleClassesAndStyle.class}`" v-if="segment.subtitle" class="text-gray-400">{{ segment.subtitle }}</p>
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
import { marked, renderer } from "@/components/Resources/Renderer.js"
import { getInlineTextStyle } from "../plugins/Theme/TextStyle"
import PDFAuxiliary from '@/components/Resources/PDFAuxiliary.vue'
import { THEME_COLOR, themeStore } from '@/plugins/Theme/ThemeStore.js'

export default {
  props: ['segment'],
  inject: ['getDocument', 'getDefaultStyles'],
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
    title () {
      return this.segment.markdownTitle ?
          marked.parse(this.segment.markdownTitle, { renderer }) :
          this.segment.title
    },
    titleBelowCover () {
      return this.document.titleBelowCover || this.segment.titleBelowCover
    },
    titleClassesAndStyle () {
      let ret = { class: "", style: "" }
      let defaultStyles = this.segment.defaultStyles || this.defaultStyles
      if (!defaultStyles || !defaultStyles.title) return ret
      let b = { ...ret, ...getInlineTextStyle(defaultStyles.title) }
      return b
    },
    subTitleClassesAndStyle () {
      let ret = { class: "", style: "" }
      let defaultStyles = this.segment.defaultStyles || this.defaultStyles
      if (!defaultStyles || !defaultStyles.subtitle) return ret
      if (!defaultStyles || !defaultStyles.subtitle) return ret
      let b = { ...ret, ...getInlineTextStyle(defaultStyles.subtitle) }
      return b
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
.segment-title.text-center {
  @apply px-10;
}
</style>