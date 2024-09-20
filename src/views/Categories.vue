<template>
  <div class="py-4 grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 justify-items-center gap-y-6">
    <CategoryItem v-if="categories && categories.length" v-for="category in categories" :category="category"></CategoryItem>
  </div>
</template>

<script>
import CategoryItem from '../components/Resources/CategoryItem.vue'
export default {
  components: { CategoryItem },
  data () {
    return {
      categories: null,
    }
  },
  methods: {
    getCategories: async function () {
      const feed = await this.$apiResources.get(`${this.$route.params.lang}/categories/index.json`)
      this.categories = feed.data
    }
  },
  async mounted () {
    await this.getCategories()
  },
}
</script>