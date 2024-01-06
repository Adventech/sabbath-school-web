<template>
  <div>
    <template v-if="document">
      <DocumentBlocks v-if="document.type === 'block'" :document="document"></DocumentBlocks>
      <DocumentPDF v-if="document.type === 'pdf'" :document="document"></DocumentPDF>
    </template>
  </div>
</template>

<script>
import DocumentBlocks from './DocumentBlocks.vue'
import DocumentPDF from './DocumentPDF.vue'

export default {
  components: { DocumentBlocks, DocumentPDF },
  data () {
    return {
      document: null,
    }
  },
  async mounted () {
    await this.getDocument()
  },
  methods: {
    getDocument: async function () {
      const resourceType = this.$route.params.resourceType
      const resourceName = this.$route.params.resourceName
      const sectionName = this.$route.params.sectionName
      const documentName = this.$route.params.documentName
      const resource = await this.$apiResources.get(`${this.$route.params.lang}/${resourceType}/${resourceName}/content/${sectionName}/${documentName}/index.json`)
      this.document = resource.data
    },
  }
}
</script>