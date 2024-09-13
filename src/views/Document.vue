<template>
  <template v-if="loading">
    <LoadingDetail></LoadingDetail>
  </template>
  <div v-else-if="document" class="flex gap-5 my-10 flex-col md:flex-row">
    <div class="md:w-3/12 lg:w-3/12 xl:w-2/12 md:text-right">
      <div class="flex flex-col gap-5">
        <div class="w-3/2 md:w-full items-start gap-2 flex md:flex-col">
          <router-link tag="div" :to="`/resources/${resource.index}`">
            <img :src="resource.covers.portrait" class="rounded w-24 md:w-full shadow-xl" />
          </router-link>
          <div class="flex flex-col p-2 gap-2">
            <router-link tag="div" :to="`/resources/${resource.index}`"  class="font-bold">{{ resource.title }}</router-link>
            <p v-if="resource.subtitle" class="text-gray-400">{{ resource.subtitle }}</p>
          </div>
        </div>
        <div v-if="document.segments.length && document.segments.length > 1" class="flex flex-wrap flex-row md:flex-col justify-start">
          <router-link
              v-for="(segment, index) in document.segments" :to="{name: 'document', params: {sectionName: section.name, documentName: document.name, segmentName: segment.name}}"
              class="md:w-full hover:bg-gray-100 p-2 rounded">
            <div class="flex flex-col">
              <div class="text-gray-400 text-sm" v-if="segment.date">{{ DayJS(segment.date, 'DD/MM/YYYY').format('dddd, MMMM DD') }}</div>
              <div :class="{'text-ss-primary': selectedSegmentIndex === index}">{{ segment.title }}</div>
              <div class="text-gray-400 text-sm" v-if="segment.subtitle">{{ segment.subtitle }}</div>
            </div>
          </router-link>
        </div>
      </div>
    </div>
    <div class="md:w-9/12 lg:w-9/12 xl:w-10/12 border border-gray-100">
      <div :style="`background-image:url('${document.background}')`" class="bg-top bg-no-repeat">
        <div>
          <Segment v-if="selectedSegment" :segment="selectedSegment"></Segment>
        </div>

        <Popup :open="bibleOpen" @closed="bibleOpen = false" :noPadding="true">
          <Bible :bible="bibleData" :verse="bibleVerse"></Bible>
        </Popup>

        <Popup :open="egwOpen" @closed="egwOpen = false" :noPadding="true">
          <EGW :egwData="egwData" :reference="egwReference"></EGW>
        </Popup>
      </div>
    </div>
  </div>

</template>

<script>
import { authStore } from '@/stores/auth'
import DayJS from 'dayjs'
import Segment from '@/views/Segment.vue'
import Popup from '@/components/Popup.vue'
import Bible from '@/components/Resources/Bible.vue'
import EGW from '@/components/Resources/EGW.vue'
import LoadingDetail from '@/components/Shimmer/LoadingDetail.vue'

export default {
  components: { Segment, Popup, Bible, EGW, LoadingDetail },
  provide () {
    return {
      getDocument: () => this.document,
      getDocumentUserInput: () => this.documentUserInput,
      getDefaultStyles: () => this.document?.defaultStyles
    }
  },
  data () {
    return {
      loading: true,

      DayJS,
      document: null,
      selectedSegmentIndex: 0,
      documentUserInput: [],
      ready: false,

      bibleOpen: false,
      bibleVerse: null,
      bibleData: null,
      egwOpen: false,
      egwReference: null,
      egwData: null,
    }
  },
  computed: {
    selectedSegment: function () {
      if (!this.document) { return null }
      return this.document.segments[this.selectedSegmentIndex]
    }
  },
  async mounted () {
    await this.getResourceFonts()
    await this.getDocument()
    await this.getDocumentUserInput()

    this.emitter.on('bible-click', async (v) => {
      if (!v.blockId || !v.verse) return
      const block = this.findBlockById(this.selectedSegment?.blocks, v.blockId)
      const verse = v.verse.replace(/sspmbible:\/\//i, '')

      if (block && verse) {
        this.bibleData = block?.data?.bible
        this.bibleVerse = verse
        this.bibleOpen = true
      }
    });

    this.emitter.on('egw-click', async (v) => {
      if (!v.blockId || !v.reference) return
      const block = this.findBlockById(this.selectedSegment?.blocks, v.blockId)
      const reference = v.reference.replace(/sspmEgw:\/\//i, '')

      if (block) {
        this.egwData = block?.data?.egw
        this.egwReference = reference
        this.egwOpen = true
      }
    });
  },
  methods: {
    findBlockById (items, blockId) {
      for (const block of items) {
        if (block.id === blockId) {
          return block
        }
        if (block.items && block.items.length) {
          const found = this.findBlockById(block.items, blockId)
          if (found) {
            return found
          }
        }
      }
      return null;
    },

    loadFont (font) {
      let style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = `@font-face {
        font-family: '${font.name}';
        src: url('${font.src}') format('truetype');
        weight: ${font.weight};
      }`;
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
      const sectionName = this.$route.params.sectionName
      const documentName = this.$route.params.documentName
      const resource = await this.$apiResources.get(`${this.$route.params.lang}/${resourceType}/${resourceName}/content/${sectionName}/${documentName}/index.json`)
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
        const documentUserInput = await this.$apiAuth.get(`/resources/user/input/document/${this.document.id}`)
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