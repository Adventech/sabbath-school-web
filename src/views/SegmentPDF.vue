<template>
  <PDFViewer :pdfs="segment.pdf" />
</template>

<script>
import PDFViewer from '@/components/Resources/PDFViewer.vue'

export default {
  props: ['segment'],
  inject: ['getDocument'],
  components: { PDFViewer },
  computed: {
    document() {
      return this.getDocument()
    },
  },
}
</script>

<style lang="scss">
</style>