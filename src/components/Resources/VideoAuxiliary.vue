<template>
  <div v-if="video">
    <div>
      <VideoIcon class="auxiliary-icon -mb-2 -mr-1" @click="videoAuxOpen=true" />
    </div>
    <Popup :open="videoAuxOpen" @closed="videoAuxOpen = false" :large="true">
      <VideoPlaylist :video="video" />
    </Popup>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance } from 'vue'
import Popup from '@/components/Popup.vue'
import VideoIcon from '@/assets/img/video-icon.svg'
import VideoPlaylist from '@/components/Resources/VideoPlaylist.vue'

const props = defineProps(['resource'])
const { proxy } = getCurrentInstance()

let videoAuxOpen = ref(false)
let video = ref(null)

const checkIfVideoAuxAvailable = async () => {
  try {
    let response = await proxy.$apiResources.get(`${props.resource.index}/video.json`)
    const contentType = response.headers["content-type"]
    if (contentType && contentType.indexOf("application/json") !== -1) {
      video.value = response.data
    }
  } catch (e) {}
}

onMounted(async () => {
  await checkIfVideoAuxAvailable()
})
</script>