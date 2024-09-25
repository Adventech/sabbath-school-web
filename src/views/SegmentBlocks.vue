<template>
  <div>
    <div class="flex justify-end absolute right-5 top-5">
      <slot></slot>
      <slot name="test"></slot>
    </div>
    <div
         class="w-full bg-no-repeat bg-cover bg-center rounded-t flex flex-col justify-end"
         :class="{'h-48 md:h-ss-cover mb-5': cover}"
         :style="`background-image:url('${cover}')`"
    >
      <div class="flex flex-col"
           :class="{
        'p-5 text-white bg-gradient-to-b from-transparent to-black/40': cover && !document.titleBelowCover,
        'p-5 text-white': cover && document.titleBelowCover,
        'mx-5 mb-5 mt-5': !cover,
      }"
      >
        <div class="p-5 px-10" v-if="!document.titleBelowCover">

          <p v-if="segment.date" class="text-gray-300">{{ DayJS(segment.date, 'DD/MM/YYYY').format('dddd, MMMM DD') }}</p>
          <p :style="`${titleClassesAndStyle.style}`" :class="`${titleClassesAndStyle.class}`" class="text-xl md:text-3xl font-bold w-10/12 lg:w-full line-clamp-3">{{ segment.title }}</p>
          <p :style="`${subTitleClassesAndStyle.style}`" :class="`${subTitleClassesAndStyle.class}`" v-if="segment.subtitle" class="text-gray-400">{{ segment.subtitle }}</p>
        </div>

      </div>
    </div>

    <div class="p-5 px-10" v-if="document.titleBelowCover">
      <p v-if="segment.date" class="text-gray-300">{{ DayJS(segment.date, 'DD/MM/YYYY').format('dddd, MMMM DD') }}</p>
      <p :style="`${titleClassesAndStyle.style}`" :class="`${titleClassesAndStyle.class}`" class="text-xl md:text-3xl font-bold w-full line-clamp-3">{{ segment.title }}</p>
      <p :style="`${subTitleClassesAndStyle.style}`" :class="`${subTitleClassesAndStyle.class}`" v-if="segment.subtitle" class="text-gray-400">{{ segment.subtitle }}</p>
    </div>

    <div v-context-menu>
      <div class="flex gap-4 flex-col pb-5">
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
import { getInlineTextStyle } from "../plugins/Theme/TextStyle"

export default {
  props: ['segment'],
  inject: ['getDocument', 'getDefaultStyles'],
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
    titleClassesAndStyle () {
      let ret = { class: "", style: "" }
      if (!this.defaultStyles || !this.defaultStyles.title) return ret
      let b = { ...ret, ...getInlineTextStyle(this.defaultStyles.title) }
      return b
    },
    subTitleClassesAndStyle () {
      let ret = { class: "", style: "" }
      if (!this.defaultStyles || !this.defaultStyles.subtitle) return ret
      let b = { ...ret, ...getInlineTextStyle(this.defaultStyles.subtitle) }
      return b
    },
  },
  data () {
    return {
      DayJS,
    }
  },
}
</script>