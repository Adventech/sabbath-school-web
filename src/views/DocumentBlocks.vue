<template>
  <div class="mb-10">
    <div v-if="segmentDocuments.length" class="flex justify-center py-3 gap-5 sticky top-0 bg-gray-100 rounded-b-lg z-10">
      <router-link :to="{name: 'document', params: {sectionName: section.name, documentName: segmentDocument.name}}" v-for="segmentDocument in segmentDocuments" class="flex gap-2 flex-col">
        <p class="p-0 m-0 text-gray-400 text-xs line-clamp-1">{{ segmentDocument.subtitle }}</p>
        <p class="mt-0 line-clamp-1">{{ segmentDocument.title }}</p>
        <div :style="segmentDocument.id === document.id ? `background-color:${resource.primaryColorDark}` : ''" :class="{'bg-ss-primary': segmentDocument.id === document.id }" class="h-1 w-full rounded-lg"></div>
      </router-link>
    </div>
    <div class="mb-4 pt-10 lg:mx-36 xl:mx-60">
      <div class="flex justify-end px-10">
        <Theme></Theme>
      </div>
      <div :class="themeStore().getClassList()" class="py-4">
        <div class="mx-5">
          <p class="text-3xl font-bold">{{ document.title }}</p>
          <p v-if="document.subtitle" class="text-gray-400 mt-2">{{ document.subtitle }}</p>
        </div>
        <div v-context-menu>
          <div>
            <Block v-for="(block, idx) in document.blocks" :block="block" :documentId="document.id" :documentUserInput="userInput" :key="`document_block_${idx}`"></Block>
          </div>
        </div>
      </div>
    </div>
    <div v-if="segmentDocuments.length" class="mx-auto text-center">
      <button @click="completeSegment" class="hover:scale-150 transition-all inline-block"><CheckCircleIcon :style="currentSegmentDocument.id === document.id ? `color:${resource.primaryColorDark}` : ''" class="text-ss-primary w-8 h-8"></CheckCircleIcon></button>
    </div>
    <Popup :open="bibleOpen" @closed="bibleOpen = false" :noPadding="true">
      <Bible :class="themeStore().getClassList()" :bible="bibleData" :verse="bibleVerse"></Bible>
    </Popup>

    <Popup :open="egwOpen" @closed="egwOpen = false" :noPadding="true">
      <EGW :class="themeStore().getClassList()" :egwData="egwData" :reference="egwReference" :title="egwTitle"></EGW>
    </Popup>
  </div>
</template>

<script>
import { authStore } from '@/stores/auth'
import Block from "../components/Resources/Blocks/Block.vue"
import { CheckCircleIcon } from '@heroicons/vue/24/solid'
import Popup from '@/components/Popup.vue'
import Bible from '@/components/Resources/Bible.vue'
import EGW from '@/components/Resources/EGW.vue'
import Theme from '@/plugins/Theme/Theme.vue'
import { themeStore } from '@/plugins/Theme/ThemeStore.js'

export default {
  props: ['document'],
  components: { Block, CheckCircleIcon, Popup, Bible, EGW, Theme },
  data () {
    return {
      section: null,
      sections: [],
      resource: null,
      userInput: [],
      ready: false,

      bibleOpen: false,
      bibleVerse: null,
      bibleData: null,
      egwOpen: false,
      egwReference: null,
      egwTitle: null,
      egwData: null,

      themeStore,
    }
  },
  computed: {
    completeSegmentLinks: function () {
      if (this.currentSegmentDocumentIndex < this.section.documents.length - 1) {
        return { name: "document", params: {sectionName: this.section.name, documentName: this.section.documents[this.currentSegmentDocumentIndex + 1].name}}
      }
      return { name: "resource" }
    },
    currentSegmentDocument: function () {
      if (!this.section) return null
      return this.section.documents.find(d => d.id === this.document.id)
    },
    currentSegmentDocumentIndex: function () {
      if (!this.section) return null
      return this.section.documents.findIndex(d => d.id === this.document.id)
    },
    segmentDocuments: function () {
      const LIMIT = 3
      const currentSegmentDocumentIndex = this.currentSegmentDocumentIndex
      if (!this.section
          || this.section.type !== 'segment'
          || currentSegmentDocumentIndex === null
          || this.section.document || !this.section.documents.length
      ) return []

      if (currentSegmentDocumentIndex === 0) {
        return this.section.documents.slice(0, LIMIT)
      }

      if (currentSegmentDocumentIndex === this.section.documents.length - 1) {
        return this.section.documents.slice(this.section.documents.length - LIMIT)
      }

      return [this.section.documents[currentSegmentDocumentIndex-1], this.section.documents[currentSegmentDocumentIndex], this.section.documents[currentSegmentDocumentIndex+1]]
    }
  },
  methods: {
    loadFont(font) {
      let style = document.createElement('style');
      style.type = 'text/css';
      style.innerHTML = `@font-face {
        font-family: '${font.name}';
        src: url('${font.src}') format('truetype');
        weight: ${font.weight};
      }`;
      document.head.appendChild(style);
    },
    getResourceFonts: async function () {
      let response = await this.$apiResources.post(`${this.$route.params.lang}/${this.$route.params.resourceType}/${this.$route.params.resourceName}/sections/index.json`)
      this.resource = response.data
      if (this.resource.fonts) {
        for (let font of this.resource.fonts) {
          this.loadFont(font)
        }
      }
      this.section = this.resource.sections.find(s => s.name === this.$route.params.sectionName)

    },
    saveDocumentProgress: async function () {
      if (!authStore().isLoggedIn) return
      await this.$apiAuth.post(`/resources/user/progress/${this.document.resourceId}/${this.document.id}`, {
        completed: true,
        documentId: this.document.id,
      })
    },
    getDocumentUserInput: async function () {
      if (!authStore().isLoggedIn) return
      try {
        const ui = await this.$apiAuth.get(`/resources/user/input/document/${this.document.id}`)
        this.userInput = ui.data
      } catch (e) {}
      this.ready = true
    },
    completeSegment: async function () {
      await this.saveDocumentProgress()
      this.$router.push(this.completeSegmentLinks)
    },
  },
  async mounted () {
    await this.getDocumentUserInput()
    await this.getResourceFonts()

    this.emitter.on('bible-click', async (v) => {
      if (!v.blockId || !v.verse) return
      const block = this.document.blocks.find(b => b.id === v.blockId)
      const verse = v.verse.replace(/sspmbible:\/\//i, '')

      if (block && verse) {
        this.bibleData = block?.data?.bible
        this.bibleVerse = verse
        this.bibleOpen = true
      }
    });

    this.emitter.on('egw-click', async (v) => {
      if (!v.blockId || !v.reference) return
      const block = this.document.blocks.find(b => b.id === v.blockId)
      const reference = v.reference.replace(/sspmEgw:\/\//i, '')

      if (block && reference) {
        this.egwData = block?.data?.egw
        this.egwTitle = v.title
        this.egwReference = reference
        this.egwOpen = true
      }
    });
  },
}
</script>