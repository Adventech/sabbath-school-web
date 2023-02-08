<template>
  <div class="min-h-ss-pdf md:h-full xl:min-h-ss-pdf-xl md:min-h-ss-pdf-md lg:min-h-ss-pdf-lg">
    <TabGroup>
      <TabList class="border-b border-gray-200" :class="{'p-4': pdfs.length > 1}">
        <Tab as="template" v-slot="{ selected }" v-for="pdf in pdfs" :key="pdf.id">
          <button v-show="pdfs.length>1" :class="{'bg-black text-white': selected, 'hover:bg-blue-200': !selected}" class="rounded px-4 py-2 mr-2 last:mr-0" >{{pdf.title}}</button>
        </Tab>
      </TabList>
      <TabPanels class="min-h-ss-pdf md:h-full xl:min-h-ss-pdf-xl md:min-h-ss-pdf-md lg:min-h-ss-pdf-lg">
        <TabPanel :unmount="false" class="min-h-ss-pdf md:h-full xl:min-h-ss-pdf-xl md:min-h-ss-pdf-md lg:min-h-ss-pdf-lg" v-for="(pdf, i) in pdfs" :class="`pdf-container-${i}`"></TabPanel>
      </TabPanels>
    </TabGroup>
  </div>
</template>

<script>
import PSPDFKit from "pspdfkit"
import { TabGroup, TabList, Tab, TabPanels, TabPanel } from '@headlessui/vue'
import { authStore } from '@/stores/auth'
const TOOLBAR_ITEMS_ALLOWED = ['zoom-in', 'zoom-out', 'zoom-mode' ,'spacer', 'ink', 'note', 'annotate', 'text-highlighter', 'layout-mode', 'search']

export default {
  components: {TabGroup, TabList, Tab, TabPanels, TabPanel},
  name: 'PSPDFKit',
  props: {
    lessonIndex: {
      type: String,
      required: true
    },
    pdfs: {
      type: Array,
      required: false
    }
  },
  data () {
    return {
      instances: {},
      annotations: {},
      eventListeners: {}
    }
  },
  async mounted () {
    try {
      for (let [index, pdf] of this.pdfs.entries()) {
        await this.loadAnnotations(pdf)
        await this.loadPSPDFKit(`.pdf-container-${index}`, pdf)
      }
    } catch (e) {}
  },
  methods: {
    async onAnnotationsChange (pdfId) {
      if (!authStore().isLoggedIn) return
      let data = await this.instances[pdfId].exportInstantJSON()
      let annotations = []
      if (!data || !data.annotations) { return }
      data.annotations.forEach((a) => {
        annotations.push(JSON.stringify(a))
      })
      try {
        await this.$apiAuth.post(`/annotations/${this.lessonIndex}/${pdfId}`, {
          data: [ { annotations, pageIndex: 0 } ]
        })
      } catch (e) {}
    },
    async loadAnnotations (pdf) {
      this.annotations[pdf.id] = []
      if (!authStore().isLoggedIn) return
      try {
        let r = await this.$apiAuth.get(`/annotations/${this.lessonIndex}/${pdf.id}`)

        for (let annotation of r.data) {
          annotation.annotations.map(a => {
            let innerAnnotation = JSON.parse(a)
            if (!innerAnnotation.id) { innerAnnotation.id = "" }
            this.annotations[pdf.id].push(innerAnnotation)
          })
        }
      } catch (e) {}
    },
    async loadPSPDFKit(container, pdf) {
      PSPDFKit.unload(container);
      let toolbarItems = PSPDFKit.defaultToolbarItems.filter((item) => TOOLBAR_ITEMS_ALLOWED.indexOf(item.type) >= 0)
      let pagerIndex = toolbarItems.findIndex(item => item.type === "spacer");
      toolbarItems.splice(pagerIndex + 1, 0, { type: "layout-config" });

      const baseUrl = `${window.location.protocol}//${window.location.host}/assets/js/`;
      this.instances[pdf.id] = await PSPDFKit.load({
        baseUrl,
        toolbarItems: toolbarItems,
        initialViewState: new PSPDFKit.ViewState({
          zoom: PSPDFKit.ZoomMode.FIT_TO_WIDTH
        }),
        licenseKey: import.meta.env.VITE_APP_PSPDF_KEY,
        styleSheets: [ "/assets/css/pspdfkit-css.css" ],
        document: pdf.src,
        container: container,
        instantJSON: {
          annotations: JSON.parse(JSON.stringify(this.annotations[pdf.id])),
          format: "https://pspdfkit.com/instant-json/v1"
        }
      });

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
};
</script>


<style>

</style>