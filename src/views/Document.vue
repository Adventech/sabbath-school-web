<template>
  <template v-if="loading">
    <LoadingDetail></LoadingDetail>
  </template>
  <div v-else-if="document" class="flex gap-5 my-10 flex-col md:flex-row">
    <div class="md:w-3/12 lg:w-3/12 xl:w-2/12 md:text-right">
      <div class="flex flex-col gap-5">
        <div class="w-3/2 md:w-full items-center md:items-end gap-2 flex md:flex-col md:text-right">
          <router-link tag="div" :to="`/resources/${resource.index}`">
            <img :src="resource.covers.portrait" class="rounded w-24 md:w-full shadow-xl" />
          </router-link>
          <div class="flex flex-col p-2 gap-2">
            <router-link tag="div" :to="`/resources/${resource.index}`" class="font-bold">
              ‹ {{ resource.title }}
            </router-link>
            <p v-if="resource.subtitle" class="text-gray-400 line-clamp-4">{{ resource.subtitle }}</p>
          </div>
        </div>

        <Disclosure v-slot="{ open }">
          <DisclosureButton  class="rounded md:text-right pr-4 py-2">
            <div class="flex flex-row md:justify-end gap-3">
              <ChevronUpIcon v-if="open" class="w-3" />
              <ChevronDownIcon v-else class="w-3" />
              <span>Table of Contents</span>
            </div>
          </DisclosureButton>
          <DisclosurePanel class="-mt-5">
            <TableOfContents :resource="resource" :inline="true" />
          </DisclosurePanel>
        </Disclosure>

        <template v-if="document.segments.length && document.segments.length > 1">
          <div class="hidden md:flex flex-wrap flex-row md:flex-col justify-start">
            <router-link
                v-for="(segment, index) in document.segments" :to="`/resources/${segment.index}`"
                class="md:w-full hover:bg-gray-100 p-2 rounded">
              <div class="flex flex-col">
                <div class="text-gray-400 text-sm" v-if="segment.date">{{ DayJS(segment.date, 'DD/MM/YYYY').format('dddd, MMMM DD') }}</div>
                <div :class="{'text-ss-primary': selectedSegmentIndex === index}">{{ segment.title }}</div>
                <div class="text-gray-400 text-sm" v-if="segment.subtitle">{{ segment.subtitle }}</div>
              </div>
            </router-link>
          </div>
          <Menu as="div" class="relative inline-block md:hidden text-left z-10">
            <div>
              <MenuButton class="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 px-3 py-2 w-full focus:outline-none">
                <div class="flex items-center justify-between">
                  <span>{{ selectedSegment.title }}</span>
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
                <div v-for="(segment, index) in document.segments" class="p-1">
                  <MenuItem v-slot="{ active }">
                    <button @click="selectedSegmentIndex = index" class="text-start text-gray-900 group flex w-full items-center px-2 py-2 text-sm justify-between">
                      <span>{{ segment.title }}</span>
                      <span>
                      <CheckIcon v-if="selectedSegmentIndex === index" class="w-5" />
                    </span>
                    </button>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </template>
      </div>
    </div>
    <div
         :class="selectedSegment.type === 'block' ? themeStore().getClassList() : ''"
         class="md:w-9/12 lg:w-9/12 xl:w-10/12 bg-top bg-cover bg-no-repeat h-fit flex-grow"
         :style="documentBackground"
    >
      <Segment class="border border-gray-100 shadow-xl" v-if="selectedSegment" :segment="selectedSegment">
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
             :large="true"
             :noControls="true"
      >
        <Segment :segmentIndex="hiddenSegmentIndex"></Segment>
      </Popup>

      <Popup :open="commentInputOpen" @closed="commentInputOpen = false">
        <textarea>fdsafdsafs</textarea>
      </Popup>
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
import TableOfContents from '@/components/Resources/TableOfContents.vue'
import PDFAuxiliary from '@/components/Resources/PDFAuxiliary.vue'
import AudioAuxiliary from '@/components/Resources/AudioAuxiliary.vue'
import VideoAuxiliary from '@/components/Resources/VideoAuxiliary.vue'
import PDFViewer from '@/components/Resources/PDFViewer.vue'
import Theme from '@/plugins/Theme/Theme.vue'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from '@heroicons/vue/24/solid'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { useTitle } from "@vueuse/core"

export default {
  components: {
    Segment,
    Popup,
    LoadingDetail,
    CheckIcon,
    Menu,
    MenuButton,
    MenuItems,
    MenuItem,
    TableOfContents,
    Disclosure,
    DisclosureButton,
    DisclosurePanel,
    ChevronDownIcon,
    ChevronUpIcon,
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
      getDefaultStyles: () => this.document?.defaultStyles
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

      commentInputOpen: false,
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

    const title = useTitle()
    title.value = `${this.selectedSegment.title} - ${this.resource.title}`
  },
  methods: {
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
      let response = await this.$apiResources.get(`${this.$route.params.lang}/${this.$route.params.resourceType}/${this.$route.params.resourceName}/sections/index.json`)
      this.resource = response.data
      if (this.resource.fonts) {
        for (let font of this.resource.fonts) {
          this.loadFont(font)
        }
      }
      this.section = this.resource.sections.find(s => s.name === this.$route.params.sectionName)
    },

    async getDocument () {
      const resourceType = this.$route.params.resourceType
      const resourceName = this.$route.params.resourceName
      const documentName = this.$route.params.documentName
      const resource = await this.$apiResources.get(`${this.$route.params.lang}/${resourceType}/${resourceName}/${documentName}/index.json`)
      this.document = resource.data


      if (this.$route.params.segmentName) {
        let segmentIndex = this.document.segments.findIndex((s) => s.name === this.$route.params.segmentName)
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

    // TODO: interactive components
    // - save annotation / comment

    // saveDocumentProgress: async function () {
    //   if (!authStore().isLoggedIn) return
    //   await this.$apiAuth.post(`/resources/user/progress/${this.document.resourceId}/${this.segment.id}`, {
    //     completed: true,
    //     documentId: this.segment.id,
    //   })
    // },
  }
}
</script>

<style lang="scss">
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