<template>
  <div class="-mx-4">
    <Feed v-if="feed" :feed="feed"></Feed>
  </div>
</template>

<script>
import { authStore } from '@/stores/auth'
import Feed from '../components/Resources/Feed.vue'

export default {
  components: { Feed },
  data () {
    return {
      feed: null,
    }
  },
  methods: {
    getRecent: async function () {
      if (!authStore().isLoggedIn) return
      try {
        const feed = await this.$apiAuth.get(`/resources/user/recent/${this.$route.params.lang}`)
        this.feed.unshift(feed.data)
      } catch (e) {}
    },
    getResources: async function (resourceType) {
      const feed = await this.$apiResources.get(`${this.$route.params.lang}/${resourceType}/index.json`)
      this.feed = feed.data
    }
  },
  async mounted () {
    const resourceType = this.$route.params.resourceType
    // await this.getRecent()
    await this.getResources(resourceType)
  },
}
</script>