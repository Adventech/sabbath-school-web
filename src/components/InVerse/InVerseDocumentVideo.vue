<template>
  <div v-if="videos" class="flex flex-col gap-5">
    <div class="flex flex-col gap-5">
      <div class="text-3xl font-bold">{{ currentVideo?.title ?? title }}</div>

      <div v-show="s || selectDefault" class="max-w-screen">
        <video class="aspect-[16/9] rounded-lg sspm-video" playsinline controls></video>
      </div>
    </div>

    <div v-for="v in videos">
      <div class="text-sspm-accent-600 font-bold">{{ v.artist }}</div>
      <div>
        <Splide :options="{ fixedWidth: 168, gap: 10, pagination: false }">
          <SplideSlide v-for="vg in v.clips" :key="`video_clip_${vg.id}`">
            <div @click="currentVideo=vg" class="cursor-pointer">
              <div class="relative">
                <img class="aspect-[16/9] rounded-lg" :src="vg.thumbnail"
                     :alt="`Video thumbnail for ${vg.title}`"
                     :class="{'border border-4 border-sspm-accent-600': currentVideo === vg}"
                />
                <div v-if="currentVideo && currentVideo === vg" class="absolute top-2 right-2 rotate-180 h-5">
                  <div class="flex">
                    <div :class="{'sspm-playing-icon-active sspm-playing-icon-active-slow': playing }" class="sspm-playing-icon ml-0.5 h-1 w-1 bg-sspm-accent-600"></div>
                    <div :class="{'sspm-playing-icon-active sspm-playing-icon-active-medium': playing }" class="sspm-playing-icon ml-0.5 h-2 w-1 bg-sspm-accent-600"></div>
                    <div :class="{'sspm-playing-icon-active sspm-playing-icon-active-fast': playing }" class="sspm-playing-icon ml-0.5 h-3 w-1 bg-sspm-accent-600"></div>
                  </div>
                </div>
              </div>
              <p class="font-bold">{{ vg.title }}</p>
            </div>
          </SplideSlide>
        </Splide>
      </div>
    </div>
  </div>
</template>

<script>
import '@splidejs/vue-splide/css'
import { Splide, SplideSlide } from '@splidejs/vue-splide'
import { ChevronRightIcon, ChevronLeftIcon } from '@heroicons/vue/24/solid'
import Plyr from "plyr"
export default {
  components: { ChevronRightIcon, ChevronLeftIcon, Splide, SplideSlide },
  props: ['segmentName', 'video', 'title', 'date', 'selectDefault'],
  data () {
    return {
      player: null,
      videos: null,
      currentVideo: null,
      s: false,
      playing: false,
    }
  },

  async mounted () {
    if (!this.video || !this.video.length) { return }

    this.videos = this.video

    if (this.$route.query.video) { this.s = true }

    if (this.videos && this.videos.length > 0 && (this.selectDefault || this.$route.query.video)) {
      this.$nextTick(() => {
        this.player = new Plyr('.sspm-video')

        this.currentVideo = this.videos[0].clips[0]

        if (this.$route.query.video) {
          const foundClip = this.videos.flatMap(item => item.clips).find(clip => clip.id === this.$route.query.video)
          if (foundClip) {
            this.currentVideo = foundClip
          }
        }

        let self = this
        let playing = function (e) {
          self.playing = e.detail.plyr.playing
        }
        this.player.on('playing', playing)
        this.player.on('pause', playing)

        this.player.source = {
          type: 'video',
          sources: [{src: this.currentVideo.src, title: this.currentVideo.title}],
          poster: this.currentVideo.thumbnail
        }
      })
    }
  },
  watch: {
    currentVideo(newVideo, oldVideo) {
      if (!this.player) {
        this.$nextTick(() => {
          this.player = new Plyr('.sspm-video')

          this.s = true

          this.currentVideo = this.videos[0].clips[0]

          let self = this
          let playing = function (e) {
            self.playing = e.detail.plyr.playing
          }
          this.player.on('playing', playing)
          this.player.on('pause', playing)

          this.player.source = {
            type: 'video',
            sources: [{src: this.currentVideo.src, title: this.currentVideo.title}],
            poster: this.currentVideo.thumbnail
          }

          if (!this.selectDefault) { this.player.play() }
        })
      }

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

<style lang="scss" scoped>
.absg-carousel::-webkit-scrollbar {
  display: none;
}
.sspm-playing-icon {
  &-active {
    animation: scale 0.5s 0s linear infinite alternate;
    &-slow { animation-duration: 0.5s }
    &-medium { animation-duration: 0.4s }
    &-fast { animation-duration: 0.2s }
  }
}

@keyframes scale {
  to { @apply h-4 }
}
</style>