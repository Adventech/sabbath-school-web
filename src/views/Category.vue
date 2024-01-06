<template>
  <Feed v-if="category && category.feed.length" :feed="category.feed"></Feed>
</template>

<script>
import Feed from '../components/Resources/Feed.vue'
export default {
  components: { Feed },
  data () {
    return {
      category: null,
    }
  },
  methods: {
    getCategory: async function () {
      const feed = await this.$apiResources.get(`${this.$route.params.lang}/categories/${this.$route.params.category}/index.json`)
      this.category = feed.data
    }
  },
  async mounted () {
    await this.getCategory()
  },
}
</script>