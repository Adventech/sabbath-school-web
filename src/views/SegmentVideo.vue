<template>
  <div class="flex flex-col lg:flex-row">
    <div class="w-full lg:w-9/12 flex-grow flex flex-col order-2 lg:order-1">
      <div class="flex flex-col gap-5 p-5">
        <video-player class="w-full"
                      :src="currentVideo.hls || currentVideo.src"
                      :aspectRatio="'16:9'"
                      :preload="'auto'"
                      :poster="currentVideo.thumbnail"
                      :key="currentVideo.src" controls>
        </video-player>

        <div class="flex flex-col gap-1">
          <p class="text-2xl font-bold">{{ currentVideo.title || segment.title }}</p>
          <p v-if="currentVideo.artist" class="text-lg text-gray-500">{{ currentVideo.artist }}</p>
          <p v-if="segment.subtitle" class="text-lg text-gray-500">{{ segment.subtitle }}</p>
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
         class="w-full lg:w-3/12 pl-5 lg:pl-0 py-5 pr-5 flex flex-row flex-wrap lg:flex-col gap-5 order-1 lg:order-2">
      <div v-for="(video, index) in segment.video"
           @click="currentVideoIndex = index"
           class="w-32 lg:w-full rounded flex flex-col gap-1 text-xs cursor-pointer hover:bg-gray-200 p-2">
        <img class="rounded" :src="video.thumbnail" />
        <p class="font-bold line-clamp-2">{{ video.title }}</p>
        <p class=" line-clamp-2">{{ video.artist }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { VideoPlayer } from '@videojs-player/vue'

export default {
  props: ['segment'],
  components: { VideoPlayer },
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

<style lang="scss">
.video-js {
  .vjs-big-play-button {
    width: 1.63332em;
    border: 0;
    border-radius: 100%;
    margin: auto;
    transform: translate(-50%, -50%);
    @apply bg-ss-primary #{!important};
    @apply hover:opacity-80 #{!important};
  }

  .vjs-poster {
    @apply rounded;
    picture, img {
      @apply rounded-lg;
    }
  }
  @apply rounded-lg bg-transparent ;
  video {
    @apply rounded-lg;
  }
  .vjs-control-bar {
    @apply bg-transparent mb-2;
  }
}
</style>