<template>
  <TabGroup v-if="defaultIndex >= 0" :defaultIndex="defaultIndex">
    <TabList v-if="pdfs.length > 1" class="border-b border-gray-200 p-4">
      <Tab as="template" v-slot="{ selected }" v-for="pdf in pdfs" :key="pdf.id">
        <button :class="{'bg-black text-white': selected, 'hover:bg-blue-200': !selected}" class="rounded px-4 py-2 mr-2 last:mr-0" >{{ pdf.title }}</button>
      </Tab>
    </TabList>
    <TabPanels>
      <TabPanel :unmount="false" class="pdf-content" v-for="(pdf, i) in pdfs" :class="`pdf-container-${i}`"></TabPanel>
    </TabPanels>
  </TabGroup>
</template>

<script>
import PSPDFKit from "pspdfkit"
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { authStore } from '@/stores/auth'
const TOOLBAR_ITEMS_ALLOWED = ['zoom-in', 'zoom-out', 'zoom-mode' ,'spacer', 'ink', 'note', 'annotate', 'text-highlighter', 'layout-mode', 'search']

export default {
  props: ['pdfs', 'selection'],
  inject: ['getDocument'],
  components: { TabGroup, TabList, Tab, TabPanels, TabPanel },
  data () {
    return {
      documentUserInput: null,
      instances: {},
      annotations: {},
      eventListeners: {},
      defaultIndex: -1,
    }
  },
  computed: {
    document () {
      return this.getDocument()
    },
    PSPSDFLicenseKey () {
      let domain = window.location.hostname
          .replace(/^app(-stage)?\.?/ig, '')
          .replace(/-stage/ig, '')
          .replace(/^sabbath-school-stage/ig, 'sabbath-school')
          .replace(/\.|-/g, '_').toUpperCase().trim()

      if (domain === 'LOCALHOST') return ''

      return import.meta.env[`VITE_APP_PSPDF_KEY_${domain}`] || import.meta.env[`VITE_APP_PSPDF_KEY`]
    }
  },
  async mounted () {
    const segmentName = this.$route.params.segmentName
    if (segmentName === 'hope-ss') {
      this.defaultIndex = this.pdfs.findIndex((p) => /Hope Sabbath/.test(p.title)) ?? 0
    } else if (segmentName === 'talking-points') {
      this.defaultIndex = this.pdfs.findIndex((p) => /Talking Points/.test(p.title)) ?? 0
    } else {
      this.defaultIndex = 0
    }

    await this.getDocumentUserInput()
    await this.loadPdf()
  },
  methods: {
    async getDocumentUserInput () {
      if (!authStore().isLoggedIn) {
        this.documentUserInput = []
        return
      }
      try {
        const documentUserInput = await this.$apiAuthResources.get(`/resources/user/input/document/${this.document.id}`)
        this.documentUserInput = documentUserInput.data
      } catch (e) {}
    },

    async loadPdf() {
      try {
        for (let [index, pdf] of this.pdfs.entries()) {
          await this.loadPSPDFKit(`.pdf-container-${index}`, pdf)
        }
      } catch (e) {
        console.error(e)
      }
    },

    async onAnnotationsChange (pdfId) {
      if (!authStore().isLoggedIn || !this.document) return
      let data = await this.instances[pdfId].exportInstantJSON()
      let annotations = []
      if (data && data.annotations) {
        data.annotations.forEach((a) => {
          annotations.push(JSON.stringify(a))
        })
      }
      try {
        await this.$apiAuthResources.post(`/resources/user/input/annotations/${this.document.id}/${pdfId}`, {
          data: [ { annotations, pageIndex: 0 } ]
        })
      } catch (e) {}
    },

    async loadPSPDFKit(container, pdf) {
      PSPDFKit.unload(container);
      let toolbarItems = PSPDFKit.defaultToolbarItems.filter((item) => TOOLBAR_ITEMS_ALLOWED.indexOf(item.type) >= 0)
      let pagerIndex = toolbarItems.findIndex(item => item.type === "spacer");
      toolbarItems.splice(pagerIndex + 1, 0, { type: "layout-config" });

      const baseUrl = `${window.location.protocol}//${window.location.host}/assets/js/`;

      this.annotations[pdf.id] = []
      try {
        let r = this.documentUserInput.find(i => i.pdfId === pdf.id)
        if (r) {
          for (let annotation of r.data) {
            annotation.annotations.map(a => {
              let innerAnnotation = JSON.parse(a)
              if (!innerAnnotation.id) { innerAnnotation.id = "" }
              this.annotations[pdf.id].push(innerAnnotation)
            })
          }
        }
      } catch (e) {
        console.error(e)
      }

      let config = {
        baseUrl,
        toolbarItems: toolbarItems,
        initialViewState: new PSPDFKit.ViewState({
          zoom: PSPDFKit.ZoomMode.FIT_TO_WIDTH
        }),
        licenseKey: this.PSPSDFLicenseKey,
        styleSheets: [ "/assets/css/pspdfkit-css.css" ],
        document: pdf.src,
        container: container,
        instantJSON: {
          annotations: JSON.parse(JSON.stringify(this.annotations[pdf.id])),
          format: "https://pspdfkit.com/instant-json/v1",
        },
      }

      this.instances[pdf.id] = await PSPDFKit.load(config)

      this.eventListeners[pdf.id] = () => {
        this.onAnnotationsChange(pdf.id)
      }

      await this.instances[pdf.id].addEventListener("annotations.willSave", this.eventListeners[pdf.id]);
    },
  },
  async beforeUnmount() {
    for (let pdf of this.pdfs) {
      let instance = this.instances[pdf.id]
      if (instance) {
        await this.instances[pdf.id].removeEventListener("annotations.willSave", this.eventListeners[pdf.id]);
        PSPDFKit.unload(this.instances[pdf.id]);
      }
    }
  },
}
</script>

<style lang="scss">
.pdf-content {
  height: 800px;
}
.PSPDFKit-Container {
  height: 800px !important;
}
</style>