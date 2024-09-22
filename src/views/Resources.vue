<template>
  <template v-if="loading">
    <LoadingList></LoadingList>
  </template>
  <div v-else class="-mx-4">
    <Feed v-if="feed" :feed="feed"></Feed>
  </div>
</template>

<script>
import { authStore } from '@/stores/auth'
import Feed from '../components/Resources/Feed.vue'
import LoadingList from '@/components/Shimmer/LoadingList.vue'

export default {
  components: { Feed, LoadingList },
  data () {
    return {
      feed: null,
      loading: true,
    }
  },
  methods: {
    getRecent: async function () {
      if (!authStore().isLoggedIn) return
      try {
        const feed = await this.$apiAuthResources.get(`/resources/user/recent/${this.$route.params.lang}`)
        this.feed.unshift(feed.data)
      } catch (e) {}
    },
    getResources: async function (resourceType) {
      const feed = await this.$apiResources.get(`${this.$route.params.lang}/${resourceType}/index.json`)
      this.feed = feed.data
      this.loading = false
    }
  },
  async mounted () {
    const resourceType = this.$route.params.resourceType
    // await this.getRecent()
    await this.getResources(resourceType)
  },
}
</script>