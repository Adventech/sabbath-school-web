<template>
  <template v-if="loading">
    <LoadingDetail class="sspm-container"></LoadingDetail>
  </template>
  <div v-else-if="document && resource" class="sspm-container mx-auto">
    <div class="flex gap-5 my-10 flex-col md:flex-row">
      <div class="order-1 md:order-0 md:w-3/12 lg:w-3/12 xl:w-2/12 md:text-right shrink-0">
        <div class="flex flex-col gap-5">
          <div class="w-3/2 md:w-full items-center md:items-end gap-2 flex md:flex-col md:text-right">
            <router-link tag="div" :to="{'name': 'publication', params: { resourceLanguage: $route.params.resourceLanguage, resourceName: resource.name }}" class="shrink-0">
              <img :src="resource.covers.portrait" class="rounded w-24 md:w-full shadow-xl" />
            </router-link>
            <div class="flex flex-col p-2 gap-2">
              <router-link tag="div" :to="{'name': 'publication', params: { resourceLanguage: $route.params.resourceLanguage, resourceName: resource.name }}"  class="font-bold">
                {{ resource.title }}
              </router-link>
              <p v-if="resource.subtitle" class="text-gray-400 line-clamp-4">{{ resource.subtitle }}</p>
            </div>
          </div>

          <Menu v-if="resource" as="div" class="relative text-left z-10">
            <div>
              <MenuButton class="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 px-3 py-2 w-full focus:outline-none text-left">
                <div class="flex items-center justify-between">
                  <span>{{ /\d+/.test(document.name) ? `${document.sequence}. ` : '' }}{{ document.title }}</span>
                  <span class="pointer-events-none flex items-center">
                  <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
                  </svg>
                </span>
                </div>
              </MenuButton>
            </div>
            <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0">
              <MenuItems class="absolute max-h-56 w-full overflow-auto left-0 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
                <div v-for="(d, index) in resource.sections[0].documents" class="p-1">
                  <MenuItem v-slot="{ active }">
                    <router-link :to="{'name': 'document', params: {resourceLanguage: $route.params.resourceLanguage, resourceName: resource.name, documentName: d.name}}" class="text-start text-gray-900 group flex w-full items-center px-2 py-2 text-sm justify-between">
                      <span>{{ /\d+/.test(d.name) ? `${d.sequence}. ` : '' }}{{ d.title }}</span>
                      <span>
                        <CheckIcon v-if="document.id === d.id" class="w-5" />
                      </span>
                    </router-link>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>

          <!-- lessons dropdown -->
          <div v-if="document.segments.length && document.segments.length > 1" class="bg-gray-100 p-3 rounded text-left flex flex-col gap-3">
            <div class="flex justify-between items-center cursor-pointer" @click="lessonsOpened = !lessonsOpened">
              <span>Lesson</span>
              <ChevronDownIcon class="shrink-0 w-4" :class="{'rotate-180': lessonsOpened}"/>
            </div>
            <div v-if="lessonsOpened" class="flex flex-col gap-3">
              <router-link
                  v-for="(s, index) in document.segments" :to="{'name': 'document', params: {
                      resourceLanguage: $route.params.resourceLanguage,
                      resourceName: resource.name,
                      documentName: document.name,
                      segmentName: s.name,
                    }
                  }">
                <div class="flex flex-col">
                  <div class="text-gray-400 text-sm" v-if="s.date">{{ DayJS(s.date, 'DD/MM/YYYY').format('dddd, MMMM DD') }}</div>
                  <div :class="{'text-sspm-accent-600': !segment && selectedSegmentIndex === index}">{{ s.title }}</div>
                  <div class="text-gray-400 text-sm" v-if="s.subtitle">{{ s.subtitle }}</div>
                </div>
              </router-link>
            </div>
          </div>

          <div class="flex flex-col gap-5">
            <div v-if="audioEnabled || videoEnabled" class="bg-gray-100 p-3 rounded text-left flex flex-col gap-3">
              <div class="flex justify-between items-center cursor-pointer" @click="mediaOpened = !mediaOpened">
                <span>Media</span>
                <ChevronDownIcon class="shrink-0 w-4" :class="{'rotate-180': mediaOpened}"/>
              </div>
              <div v-if="mediaOpened" class="flex flex-col gap-3">
                <router-link
                    v-if="audioEnabled"
                    :to="{name: 'document', params: {resourceName: resource.name, documentName: document.name, segmentName: 'audio'}}">
                  <div :class="{'text-sspm-accent-600': segmentName === 'audio'}">Audio</div>
                </router-link>

                <router-link
                    v-if="videoEnabled"
                    :to="{name: 'document', params: {resourceName: resource.name, documentName: document.name, segmentName: 'videos'}}">
                  <div :class="{'text-sspm-accent-600': segmentName === 'videos'}">Videos</div>
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <template v-if="isMedia">
        <div  class="order-0 md:order-1 md:w-9/12 lg:w-9/12 xl:w-10/12 shrink-0 grow-0">
          <div class="flex">
            <router-link :to="`${document.index.replace('en/ss', '/en')}/audio`" :class="{'bg-gray-100 border-b-2 border-sspm-accent-600': segmentName === 'audio'}" class="rounded-t-lg text-sspm-accent-600 font-bold py-2 px-5">Audio</router-link>
            <router-link :to="`${document.index.replace('en/ss', '/en')}/videos`" :class="{'bg-gray-100 border-b-2 border-sspm-accent-600': segmentName === 'videos'}" class="rounded-t-lg text-sspm-accent-600 font-bold py-2 px-5">Video</router-link>
          </div>

          <div>
            <InVerseDocumentAudio v-if="segmentName === 'audio'" :audio="audio" :resource="resource" :document="document"></InVerseDocumentAudio>
            <InVerseDocumentVideo v-if="video && videoEnabled && segmentName === 'videos'" :title="document.title" :selectDefault="true" :date="`${DayJS(document.startDate, 'DD/MM/YYYY').format('MMM DD')} - ${DayJS(document.endDate, 'DD/MM/YYYY').format('MMM DD')}`" :segmentName="segmentName" :video="video"/>
          </div>
        </div>
      </template>
      <template v-else>
        <div
          :class="selectedSegment.type === 'block' ? themeStore().getClassList() : ''"
          class="order-0 md:order-1 md:w-9/12 lg:w-9/12 xl:w-10/12 bg-top bg-cover bg-no-repeat h-fit flex-grow"
          :style="documentBackground"
      >
        <Segment class="border border-gray-100 shadow-xl" v-if="segment || selectedSegment" :segment="segment || selectedSegment">
          <template #auxTheme>
            <Theme></Theme>
          </template>

          <template #auxAudio>
            <AudioAuxiliary :resource="resource" :target="document.index" />
          </template>

          <template #auxVideo>
            <VideoAuxiliary :resource="resource"  />
          </template>

          <template #auxPdf>
            <PDFAuxiliary :resource="resource" @pdfAuxToggle="pdfAuxToggle" :target="document.index" />
          </template>

          <template #auxPdfStory>
            <PDFAuxiliary :resource="resource" @pdfAuxToggle="pdfAuxToggle" :target="document.index" :story="true" />
          </template>

          <template v-if="pdfAuxOpen" #pdf><PDFViewer v-if="pdfAuxOpen" :pdfs="pdfs" /></template>
        </Segment>

        <Popup :open="hiddenSegmentOpen"
               @closed="hiddenSegmentOpen = false"
               :noPadding="true"
               :large="true">
          <Segment :segmentIndex="hiddenSegmentIndex" :hiddenSegment="true"></Segment>
        </Popup>
      </div>
      </template>
    </div>
  </div>

</template>

<script>
import { authStore } from '@/stores/auth'
import { THEME_COLOR, themeStore } from '@/plugins/Theme/ThemeStore.js'
import DayJS from 'dayjs'
import Segment from '@/views/Segment.vue'
import Popup from '@/components/Popup.vue'
import LoadingDetail from '@/components/Shimmer/LoadingDetail.vue'
import InVerseDocumentAudio from '@/components/InVerse/InVerseDocumentAudio.vue'
import InVerseDocumentVideo from '@/components/InVerse/InVerseDocumentVideo.vue'
import PDFAuxiliary from '@/components/Resources/PDFAuxiliary.vue'
import AudioAuxiliary from '@/components/Resources/AudioAuxiliary.vue'
import VideoAuxiliary from '@/components/Resources/VideoAuxiliary.vue'
import PDFViewer from '@/components/Resources/PDFViewer.vue'
import Theme from '@/plugins/Theme/Theme.vue'
import { CheckIcon, ChevronDownIcon } from '@heroicons/vue/24/solid'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { useTitle } from "@vueuse/core"
import { nextTick } from 'vue'

export default {
  components: {
    Segment,
    Popup,
    LoadingDetail,
    InVerseDocumentAudio,
    InVerseDocumentVideo,
    CheckIcon,
    ChevronDownIcon,
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    PDFAuxiliary,
    AudioAuxiliary,
    VideoAuxiliary,
    Theme,
    themeStore,
    PDFViewer,
  },
  provide () {
    return {
      getDocument: () => this.document,
      getDocumentUserInput: () => this.documentUserInput,
      getDefaultStyles: () => this.document?.defaultStyles,
      getStyle: () => this.document?.style,
    }
  },
  data () {
    return {
      themeStore,
      THEME_COLOR,
      DayJS,

      loading: true,
      resource: null,
      document: null,

      selectedSegmentIndex: 0,
      documentUserInput: [],
      ready: false,

      hiddenSegmentOpen: false,
      hiddenSegmentIndex: null,

      pdfAuxOpen: false,
      pdfs: null,

      videoEnabled: false,
      audioEnabled: false,

      isMedia: false,

      video: null,
      audio: null,

      lessonsOpened: true,
      mediaOpened: false,

      segmentName: null,
      segment: null
    }
  },
  computed: {
    documentBackground: function () {
      if (!this.document || !this.selectedSegment) { return '' }
      if (themeStore().color === THEME_COLOR.DARK || themeStore().color === THEME_COLOR.SEPIA) {
        return ''
      }
      let backgroundURL = this.document.background ?? this.selectedSegment.background
      if (this.selectedSegment.type === 'block' && backgroundURL) {
        return `background-image:url('${backgroundURL}');`
      }
      return ''
    },
    selectedSegment: function () {
      if (!this.document) { return null }
      return this.document.segments[this.selectedSegmentIndex]
    }
  },
  async mounted () {
    await this.getResourceFonts()
    await this.getDocument()
    await this.getDocumentUserInput()

    this.emitter.on('segment-click', async (v) => {
      this.hiddenSegmentIndex = v
      this.hiddenSegmentOpen = true
    })

    this.emitter.on('comment', async (v) => {
      this.commentInputOpen = true
    })

    this.emitter.on('enterFullScreen', async () => {
      if (this.pdfAuxOpen) {
        this.pdfAuxOpen = false
        this.emitter.emit('pdfAuxToggle')
        await nextTick()
        this.emitter.emit('enterFullScreen')
      }
    })

    const title = useTitle()
    title.value = `${this.selectedSegment.title} - ${this.resource.title}`
  },
  methods: {
    mergeArtists (a, b) {
      const merged = [...a];

      b.forEach(bItem => {
        const aItem = merged.find(item => item.artist === bItem.artist)

        if (aItem) {
          aItem.clips = [...aItem.clips, ...bItem.clips]
          aItem.clips = aItem.clips.slice(0, 13)
        } else {
          merged.push(bItem)
        }
      })

      return merged
    },
    pdfAuxToggle (pdfAuxOpen, pdfs) {
      this.pdfAuxOpen = pdfAuxOpen
      this.pdfs = pdfs
    },
    loadFont (font) {
      let style = document.createElement('style');

      let innerHTML = `@font-face {
        font-family: "${font.name}";
        src: url('${font.src}') format('truetype');
        font-weight: ${font.weight};
      }
      `;

      if (!/bold/i.test(font.name)) {
        // Attempt to "search" for the Bold font by adding the style to the inline bold
        innerHTML += `
         .${font.name} strong {
          font-family: "${font.name.replace(/-(Regular|Normal|Roman)/img, '')}-Bold"
         }
        `
      }

      style.innerHTML = innerHTML
      document.head.appendChild(style);
    },

    async getResourceFonts () {
      let response = await this.$apiResources.get(`${this.$route.params.resourceLanguage}/ss/${this.$route.params.resourceName}/sections/index.json`)
      this.resource = response.data
      if (this.resource.fonts) {
        for (let font of this.resource.fonts) {
          this.loadFont(font)
        }
      }
      this.section = this.resource.sections.find(s => s.name === this.$route.params.sectionName)
    },

    async getDocument () {
      const resourceLanguage = this.$route.params.resourceLanguage
      const resourceType = "ss"
      const resourceName = this.$route.params.resourceName
      const documentName = this.$route.params.documentName
      let segmentName = this.$route.params.segmentName

      const resource = await this.$apiResources.get(`${resourceLanguage}/${resourceType}/${resourceName}/${documentName}/index.json`)
      this.document = resource.data

      // getting audio
      try {
        this.audio = (await this.$apiResources.get(`${resourceLanguage}/${resourceType}/${resourceName}/audio.json`)).data
        this.audioEnabled = true
      } catch (e) {
        console.error(e)
      }

      // getting video
      try {
        const video = (await this.$apiResources.get(`${resourceLanguage}/${resourceType}/${resourceName}/video.json`)).data
        this.video = video
        this.videoEnabled = true

        if (/\d{4}-\d{2}/.test(resourceName)) {
          const [yearStr, quarterStr] = resourceName.replace('-cq', '').split('-');
          let year = parseInt(yearStr, 10);
          let quarter = parseInt(quarterStr, 10);

          quarter -= 1;
          if (quarter === 0) {
            quarter = 4;
            year -= 1;
          }

          const previousQuarter = `${year}-0${quarter}-cq`

          try {
            const prevVideo = (await this.$apiResources.get(`${resourceLanguage}/${resourceType}/${previousQuarter}/video.json`)).data

            this.video = this.mergeArtists(this.video, prevVideo)
          } catch (e) {}
        }
      } catch (e) {}

      if (['audio', 'videos'].includes(segmentName)) {
        this.segmentName = segmentName
        this.isMedia = true
        this.mediaOpened = true
        this.lessonsOpened = false
      }

      if (this.$route.params.segmentName) {
        let segmentIndex = this.document.segments.findIndex((s) => s.name === segmentName)
        this.selectedSegmentIndex = segmentIndex >= 0 ? segmentIndex : 0
      }

      this.loading = false
    },

    async getDocumentUserInput () {
      if (!authStore().isLoggedIn) {
        return
      }
      try {
        const documentUserInput = await this.$apiAuthResources.get(`/resources/user/input/document/${this.document.id}`)
        this.documentUserInput = documentUserInput.data
      } catch (e) {}
    },
  }
}
</script>

<style lang="scss">
@import '@/absg.css';
.auxiliary {
  @apply flex flex-row gap-4 p-3 rounded-md items-center;
  &-light {
    @apply bg-none;
    .auxiliary-icon {
      @apply text-black hover:text-ss-primary;

    }
  }

  &-dark {
    @apply bg-black/30;
    .auxiliary-icon {
      @apply text-white hover:text-gray-300;
    }
  }

  &-icon {
    @apply cursor-pointer w-6 h-6;
  }
}
</style>