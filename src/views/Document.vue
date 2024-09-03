<template>
  <div class="lg:mx-36 xl:mx-60">
    <template v-if="document">
      <div v-if="document.segments.length > 1" class="flex">
        <button
            @click="selectSegment(index)" v-for="(segment, index) in document.segments"
            class=""
        >{{ segment.title }}</button>
      </div>
      <div>
        <Segment v-if="selectedSegment" :segment="selectedSegment" :document="document" :documentUserInput="documentUserInput"></Segment>
      </div>

      <Popup :open="bibleOpen" @closed="bibleOpen = false" :noPadding="true">
        <Bible :bible="bibleData" :verse="bibleVerse"></Bible>
      </Popup>

      <Popup :open="egwOpen" @closed="egwOpen = false" :noPadding="true">
        <EGW :egwData="egwData" :reference="egwReference"></EGW>
      </Popup>
    </template>
  </div>
</template>

<script>
import { authStore } from '@/stores/auth'
import Segment from '@/views/Segment.vue'
import Popup from '@/components/Popup.vue'
import Bible from '@/components/Resources/Bible.vue'
import EGW from '@/components/Resources/EGW.vue'

export default {
  components: { Segment, Popup, Bible, EGW },
  provide () {
    return {
      getDocument: () => this.document,
      getDocumentUserInput: () => this.documentUserInput,
      getDefaultStyles: () => this.selectedSegment?.defaultStyles
    }
  },
  data () {
    return {
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
    selectSegment (segmentIndex) {
      this.selectedSegmentIndex = segmentIndex
    },

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
      let response = await this.$apiResources.post(`${this.$route.params.lang}/${this.$route.params.resourceType}/${this.$route.params.resourceName}/sections/index.json`)
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
    },

    async getDocumentUserInput () {
      if (!authStore().isLoggedIn) return
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