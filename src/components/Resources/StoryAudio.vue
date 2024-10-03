<template>
  <div class="w-10 overflow-hidden">
    <audio class="story-audio" controls></audio>
  </div>
</template>

<script setup>
import Plyr from "plyr"

import { ref, watch, computed, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps(['audio'])

let player = ref(null)
let playing = ref(false)

const setupPlayer = () => {
  player = new Plyr('.story-audio', { controls: ['play']})

  let playing = function (e) {
    playing.value = e.detail.plyr.playing
  }

  player.on('playing', playing)
  player.on('pause', playing)

  player.source = {
    type: 'audio',
    sources: [ { src: props.audio.src } ],
  }
}

onMounted(() => {
  setupPlayer()
})

onBeforeUnmount(() => {
  if (player) player.destroy()
})
</script>

<style lang="scss">

</style>