<template>
  <div class="sspm-container flex flex-col gap-5 lg:gap-10 my-5 lg:my-10">
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
import ResourceItem from '@/components/ABSG/ABSGResourceItem.vue'
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
    getResource: async function (resourceName) {
      const resource = await this.$apiResources.get(`en/ss/${resourceName}/sections/index.json`)
      this.resource = resource.data
      this.loading = false
      const title = useTitle()
      title.value = `${this.resource.title} - Adult Bible Study Guides`
    },
  },
  async mounted () {
    const resourceName = this.$route.params.resourceName
    await this.getResource(resourceName)
  },
}
</script>