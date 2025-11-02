<template>
  <PDFViewer :pdfs="segment.pdf" :showDownload="showDownload" />
</template>

<script>
import PDFViewer from '@/components/Resources/PDFViewer.vue'

export default {
  props: ['segment'],
  inject: ['getDocument'],
  components: { PDFViewer },
  computed: {
    showDownload: function () {
      return ['en', 'af', 'ar', 'zh', 'fa', 'fj', 'fr', 'hi', 'kn', 'ml', 'lus', 'ne', 'no', 'st', 'es', 'ta', 'te', 'tr', 'xh', 'zu'].includes(this.$route.params.resourceLanguage)
    },
    document() {
      return this.getDocument()
    },
  },
}
</script>

<style lang="scss">
</style>