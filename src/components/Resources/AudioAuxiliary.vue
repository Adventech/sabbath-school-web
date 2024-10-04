<template>
  <div v-if="audio && audio.length > 0">
    <div>
      <AudioIcon class="auxiliary-icon -mb-2 -mr-1" @click="audioAuxOpen=true" />
    </div>
    <Popup :open="audioAuxOpen" @closed="audioAuxOpen = false" :large="true">
      <AudioPlaylist :audio="audio" :target="target" />
    </Popup>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import Popup from '@/components/Popup.vue'
import AudioIcon from '@/assets/img/audio-icon.svg'
import AudioPlaylist from '@/components/Resources/AudioPlaylist.vue'

const props = defineProps(['resource', 'target'])
const { proxy } = getCurrentInstance()

let audioAuxOpen = ref(false)
let audio = ref(null)

const checkIfAudioAuxAvailable = async () => {
  try {
    let response = await proxy.$apiResources.get(`${props.resource.index}/audio.json`)
    const contentType = response.headers["content-type"]
    if (contentType && contentType.indexOf("application/json") !== -1) {
      audio.value = response.data.filter((item) => props.target.startsWith(item.target))
    }
  } catch (e) {}
}

onMounted(async () => {
  await checkIfAudioAuxAvailable()
})
</script>