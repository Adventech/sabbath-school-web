<template>

  <div class="flex flex-col lg:flex-row">
    <div class="w-full lg:w-9/12 flex-grow flex flex-col order-2 lg:order-1">
      <div class="flex flex-col gap-5 p-5">
        <video class="w-full rounded shadow" controls :poster="currentVideo.thumbnail" :key="currentVideo.src">
          <source :src="currentVideo.src" />
        </video>
        <div class="flex flex-col gap-1">
          <p class="text-2xl font-bold">{{ currentVideo.title }}</p>
          <p class="text-lg">{{ currentVideo.artist }}</p>
        </div>
      </div>

      <div v-context-menu>
        <div class="flex gap-5 flex-col pb-5">
          <Block v-for="(block) in segment.blocks"
                 :block="block"
                 :key="`segment_block_${block.id}`"
          ></Block>
        </div>
      </div>
    </div>
    <div v-if="segment.video.length > 1"
         class="w-full lg:w-2/12 pl-5 lg:pl-0 py-5 pr-5 flex flex-row flex-wrap lg:flex-col gap-5 order-1 lg:order-2">
      <div v-for="(video, index) in segment.video"
           @click="currentVideoIndex = index"
           class="w-32 lg:w-full rounded flex flex-col gap-1 text-xs cursor-pointer hover:bg-gray-200 p-2">
        <img class="rounded" :src="video.thumbnail" />
        <p class="font-bold">{{ video.title }}</p>
        <p>{{ video.artist }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['segment'],
  data () {
    return {
      currentVideoIndex: 0,
    }
  },
  computed: {
    currentVideo () {
      if (!this.segment.video || !this.segment.video.length) { return null }
      return this.segment.video[this.currentVideoIndex]
    },
  },
}
</script>