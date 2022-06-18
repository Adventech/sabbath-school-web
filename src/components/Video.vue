<template>
  <h3 v-if="selectedVideo" class="text-3xl font-bold mb-6">Video</h3>
  <div class="">
    <div class="mb-4 min-h-96 relative">
      <video class="min-h-96 ss-video" playsinline controls></video>
    </div>
    <div class="">
      <div v-for="(artist, i) in video" :key="`video_artist_${i}`" class="mb-8">
        <p class="text-ss-primary uppercase font-bold text-sm mb-3">{{ artist.artist }}</p>
        <div class="">
          <Splide :options="{ fixedWidth: 194, gap: 10, pagination: false }">
            <SplideSlide v-for="clip in artist.clips" :key="`video_clip_${clip.id}`">
              <div @click="selectedVideo = clip" class="cursor-pointer">
                <div :class="{'border-2 border-ss-primary': selectedVideo && selectedVideo.src === clip.src && playing}" :style="`background-image:url('${clip.thumbnail}')`" class="rounded h-24 w-48 bg-cover bg-center relative">
                  <div v-if="selectedVideo && selectedVideo.src === clip.src && playing" class="absolute top-3 right-2 shrink-0 stretch-0 relative rotate-180 h-5">
                    <div class="flex">
                      <div class="playing-icon playing-icon-slow ml-0.5 h-1 w-1 bg-white"></div>
                      <div class="playing-icon playing-icon-medium ml-0.5 h-2 w-1 bg-white"></div>
                      <div class="playing-icon playing-icon-fast ml-0.5 h-3 w-1 bg-white"></div>
                    </div>
                  </div>
                </div>
                <p class="mt-2 text-sm">{{clip.title}}</p>
              </div>
            </SplideSlide>
          </Splide>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Plyr from 'plyr'
import '@splidejs/vue-splide/css'
import { Splide, SplideSlide } from '@splidejs/vue-splide'

export default {
  props: ['video', 'target'],
  components: { Splide, SplideSlide },
  data () {
    return {
      player: null,
      selectedVideo: null,
      playing: false
    }
  },
  mounted () {
    if (this.video.length && this.video[0].clips.length) {
      this.player = new Plyr('.ss-video')
      let self = this
      let playing = function (e) {
        self.playing = e.detail.plyr.playing
      }
      this.player.on('playing', playing)
      this.player.on('pause', playing)
      let index = this.video[0].clips.findIndex((item) => item.targetIndex === self.target)
      this.selectedVideo = this.video[0].clips[index || 0]
    }
  },
  beforeUnmount () {
    this.player.destroy()
  },
  watch: {
    selectedVideo(newVideo, oldVideo) {
      if (newVideo && this.player) {
        this.player.source = {
          type: 'video',
          sources: [ { src: newVideo.src, title: newVideo.title } ],
          poster: newVideo.thumbnail
        }
        if (oldVideo) { this.player.play() }
      }
    }
  }
}

</script>

<style lang="scss">
:root {
  --plyr-color-main: theme('colors.ss-primary');
  --plyr-audio-controls-background: theme('colors.gray.100');
}
.plyr--video {
  @apply rounded-md;
}
.playing-icon {
  animation: scale 0.5s 0s linear infinite alternate;
  &-slow { animation-duration: 0.5s }
  &-medium { animation-duration: 0.4s }
  &-fast { animation-duration: 0.2s }
}

@keyframes scale {
  to { @apply h-4 }
}
</style>