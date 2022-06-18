<template>
    <div class="pdf-container min-h-ss-pdf md:h-full xl:min-h-ss-pdf-xl md:min-h-ss-pdf-md lg:min-h-ss-pdf-lg"></div>
</template>

<script>
import PSPDFKit from "pspdfkit"
const TOOLBAR_ITEMS_ALLOWED = ['zoom-in', 'zoom-out', 'zoom-mode' ,'spacer', 'layout-mode', 'search']

export default {
  name: 'PSPDFKit',
  props: {
    pdfUrl: {
      type: String,
      required: true,
    },
  },
  mounted () {
    this.loadPSPDFKit()
  },
  methods: {
    async loadPSPDFKit() {
      PSPDFKit.unload(".pdf-container");

      let toolbarItems = PSPDFKit.defaultToolbarItems.filter((item) => TOOLBAR_ITEMS_ALLOWED.indexOf(item.type) >= 0)
      let pagerIndex = toolbarItems.findIndex(item => item.type === "spacer");
      toolbarItems.splice(pagerIndex + 1, 0, { type: "layout-config" });

      const baseUrl = `${window.location.protocol}//${window.location.host}/assets/js/`;
      return PSPDFKit.load({
        baseUrl,
        toolbarItems: toolbarItems,
        initialViewState: new PSPDFKit.ViewState({
          zoom: PSPDFKit.ZoomMode.FIT_TO_WIDTH
        }),
        styleSheets: [ "/assets/css/pspdfkit-css.css" ],
        document: this.pdfUrl,
        container: ".pdf-container",
      });
    },
  },
  beforeUnmount() {
    PSPDFKit.unload(".pdf-container");
  },
};
</script>


<style>

</style>