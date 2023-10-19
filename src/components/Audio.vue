<template>
  <h3 :class="{'text-3xl mb-6': !minimized, 'text-xl mb-2': minimized}" class="font-bold">Audio</h3>
  <audio class="ss-audio w-9/12" controls></audio>

  <ul v-if="!minimized" class="flex flex-col mt-4">
    <li @click="selectedAudio = a" v-for="(a, i) in audio" :key="`audio_${audio.id}`" class="flex items-center justify-between p-3 hover:bg-gray-100 rounded hover:cursor-pointer">
      <div class="grow">
        <div class="font-bold">{{ a.title }}</div>
        <div class="text-sm text-gray-400">{{ a.artist }}</div>
      </div>
      <div v-if="selectedAudio && selectedAudio.src === a.src && playing" class="shrink-0 stretch-0 relative h-4 rotate-180">
        <div class="flex">
          <div class="playing-icon playing-icon-slow ml-0.5 h-1 w-1 bg-ss-primary"></div>
          <div class="playing-icon playing-icon-medium ml-0.5 h-2 w-1 bg-ss-primary"></div>
          <div class="playing-icon playing-icon-fast ml-0.5 h-3 w-1 bg-ss-primary"></div>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import Plyr from 'plyr'

export default {
  props: ['audio', 'target', 'minimized'],
  data () {
    return {
      player: null,
      selectedAudio: null,
      playing: false
    }
  },
  mounted () {
    if (this.audio.length > 0) {
      this.player = new Plyr('.ss-audio')
      let self = this
      let playing = function (e) {
        self.playing = e.detail.plyr.playing
      }
      this.player.on('playing', playing)
      this.player.on('pause', playing)
      this.selectedAudio = this.audio[this.audio.findIndex((item) => item.targetIndex === self.target) || 0]
    }
  },
  beforeUnmount () {
    if (this.player) this.player.destroy()
  },
  watch: {
    selectedAudio(newAudio) {
      if (newAudio && this.player) {
        this.player.source = {
          type: 'audio',
          sources: [ { src: newAudio.src, title: newAudio.title } ],
        }
        this.player.play()
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
.plyr--full-ui {
  @apply z-10
}
.plyr--audio .plyr__controls {
  @apply rounded;
}
.plyr--audio .plyr__menu__container {
  bottom: auto;
  top: 40px;
  &:after {
    @apply bg-white;
    transform: rotate(180deg);
    top: -8px;
  }
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