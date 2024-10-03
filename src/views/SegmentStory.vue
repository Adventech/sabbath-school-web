<template>
  <div class="flex gap-3 flex-col py-5">

    <div class="flex justify-between items-center">
      <div>
        <div class="px-5">
          <slot name="auxPdfStory"></slot>
        </div>

        <template v-if="$slots.pdf && $slots.pdf().length">
          <slot name="pdf"></slot>
        </template>
      </div>
      <div class="px-6 flex flex-row gap-5 items-center">
        <FullScreenIcon @click="enterFullScreen()" class="w-4 mt-1 cursor-pointer" />
        <slot name="auxAudio"></slot>
      </div>
    </div>

    <Block v-if="!$slots.pdf || !$slots.pdf().length" v-for="(block) in segment.blocks"
           :block="block"
           :key="`segment_block_${block.id}`"
    ></Block>
  </div>
</template>

<script>
import FullScreenIcon from '@/assets/img/fullscreen-icon.svg'
export default {
  props: ['segment'],
  components: { FullScreenIcon, },
  methods: {
    enterFullScreen () {
      this.emitter.emit('enterFullScreen')
    }
  },
}
</script>