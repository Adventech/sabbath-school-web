<template>
  <div>
    <div class="flex justify-end absolute right-5 top-5">
      <slot></slot>
    </div>
    <div
         class="w-full bg-no-repeat bg-cover bg-center rounded-t flex flex-col justify-end"
         :class="{'h-48 md:h-ss-cover mb-5': cover}"
         :style="`background-image:url('${cover}')`"
    >
      <div class="flex flex-col"
           :class="{
        'p-5 text-white bg-gradient-to-b from-transparent to-black/40': cover,
        'mx-5 mb-5 mt-5': !cover,
      }"
      >
        <p v-if="segment.date" class="text-gray-300">{{ DayJS(segment.date, 'DD/MM/YYYY').format('dddd, MMMM DD') }}</p>
        <p class="text-xl md:text-3xl font-bold w-10/12 lg:w-full line-clamp-3">{{ segment.title }}</p>
        <p v-if="segment.subtitle" class="text-gray-400">{{ segment.subtitle }}</p>
      </div>
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

export default {
  props: ['segment'],
  inject: ['getDocument'],
  computed: {
    cover () {
      return this.segment.cover || this.document.cover
    },
    document () {
      return this.getDocument()
    },
  },
  data () {
    return {
      DayJS,
    }
  },
}
</script>