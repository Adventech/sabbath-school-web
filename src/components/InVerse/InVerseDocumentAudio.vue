<template>
  <div v-if="resource" class="flex flex-col gap-5">

    <div class="bg-white rounded-b-xl mt-4">
      <audio class="ss-audio w-full" controls></audio>
    </div>

    <div v-for="section in resource.sections">
      <template v-for="document in section.documents">
        <div v-if="hasAudio(document).length > 0" class="border-b border-gray-200 bg-gray-100 p-4 ">
          <div @click="toggle(document)" class="flex justify-between cursor-pointer">
            <div class="flex gap-3 items-center">
              <div class="shrink-0 text-xl font-bold text-black/35">
                {{ document.sequence }}
              </div>
              <div>
                <p class="text-lg font-bold">{{ document.title }}</p>
                <p class="" v-if="document.startDate && document.endDate">{{DayJS(document.startDate, 'DD/MM/YYYY').format('MMM DD')}} - {{DayJS(document.endDate, 'DD/MM/YYYY').format('MMM DD')}}</p>
              </div>
            </div>

            <ChevronDownIcon class="w-6"></ChevronDownIcon>
          </div>
          <div v-if="collapses[document.name]" class="mt-4 ml-6 rounded-xl bg-white p-4 flex flex-col gap-4">
            <p class="text-xl font-bold">Playlist</p>
            <div v-for="a in hasAudio(document)">
              <div @click="autoplay = true; selectedAudio = a" class="px-4 py-2 rounded cursor-pointer" :class="{'bg-gray-100': selectedAudio.id === a.id}">
                <p class="text-gray-600 text-xs">{{ a.artist }}</p>
                <p class="">{{ a.title }}</p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import DayJS from 'dayjs'
import Plyr from "plyr"
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/solid'

export default {
  components: { ChevronDownIcon, ChevronUpIcon },
  props: ['resource', 'document', 'audio'],
  data () {
    return {
      player: null,
      collapses: {},
      selectedAudio: null,
      autoplay: false,
      DayJS,
    }
  },

  async mounted () {
    if (!this.audio) { return }

    this.selectedAudio = this.audio.find((a) => a.target.indexOf(`${this.document.index}`) === 0)

    this.collapses[this.$route.params.documentName] = true

    this.player = new Plyr('.ss-audio')
  },

  methods: {
    hasAudio (document) {
      if (!this.audio) return false

      return this.audio.filter((a) => a.target.indexOf(document.index) >= 0 && /Adult/.test(a.artist))
    },

    toggle (document) {
      this.collapses[document.name] = !(!!this.collapses[document.name])
    }
  },

  watch: {
    selectedAudio(newAudio) {
      if (newAudio && this.player) {
        this.player.source = {
          type: 'audio',
          sources: [ { src: newAudio.src, title: newAudio.title } ],
        }
        if (this.autoplay) {
          this.player.play()
        }
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