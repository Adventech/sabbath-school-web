<template>
  <div class="-mx-4 my-4">
    <template v-if="loading">
      <LoadingDetail></LoadingDetail>
    </template>
    <div v-else>
      <ResourceItem v-if="resource" :resource="resource" :progress="progress"></ResourceItem>
    </div>
  </div>
</template>

<script>
import { useTitle } from "@vueuse/core"
import { authStore } from '@/stores/auth'
import ResourceItem from '../components/Resources/ResourceItem.vue'
import LoadingDetail from '@/components/Shimmer/LoadingDetail.vue'

export default {
  components: { ResourceItem, LoadingDetail },
  data () {
    return {
      loading: true,
      resource: null,
      progress: null,
    }
  },
  methods: {
    getResourceProgress: async function () {
      if (!authStore().isLoggedIn) return
      const ui = await this.$apiAuthResources.get(`/resources/user/progress/resource/${this.resource.id}`)
      this.progress = ui.data
    },
    getResource: async function (resourceType, resourceName) {
      const resource = await this.$apiResources.get(`${this.$route.params.lang}/${resourceType}/${resourceName}/sections/index.json`)
      this.resource = resource.data
      this.loading = false
    },
    setRecent: async function () {
      if (!authStore().isLoggedIn) return
      try {
        await this.$apiAuthResources.post(`/resources/user/recent/${this.$route.params.lang}/${this.resource.id}`)
      } catch (e) {
        console.log(e)
      }
    },
    updateDocumentProgress: async function (documentProgress) {
      if (!authStore().isLoggedIn) return
      await this.$apiAuthResources.post(`/resources/user/progress/${this.resource.id}/${documentProgress.documentId}`, {
        completed: documentProgress.completed,
        documentId: documentProgress.documentId,
      })
      await this.getResourceProgress()
    }
  },
  async mounted () {
    const resourceType = this.$route.params.resourceType
    const resourceName = this.$route.params.resourceName
    await this.getResource(resourceType, resourceName)
    // await this.getResourceProgress()
    await this.setRecent()
    this.emitter.on('update-document-progress', this.updateDocumentProgress)

    const title = useTitle()
    title.value = `${this.resource.title}`
  },
}
</script>