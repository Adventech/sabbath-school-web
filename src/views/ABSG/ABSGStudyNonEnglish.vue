<template>
  <div v-if="feeds && feeds.groups" class="flex flex-col gap-5 lg:gap-10 my-5 lg:my-10">

    <template v-for="feed in feeds.groups">

      <div class="sspm-container">
        <p class="text-center text-3xl text-sspm-accent-800 font-bold">{{ feed.title }}</p>
      </div>

      <div class="sspm-container">
        <div v-if="feed && feed.resources && feed.resources.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-12 items-stretch items-center">
          <router-link :to="{name: 'publication', params: { resourceLanguage: language, resourceName: r.name }}" v-for="r in feed.resources" class="flex flex-col gap-3">
            <div class="">
              <img :src="r.covers.portrait" class="aspect-[2/3] w-full h-full rounded-lg shadow-2xl object-cover" />
            </div>
            <div>
              <div class="font-bold text-lg">{{ r.title }}</div>
              <div class="text-gray-500 text-xs">{{ r.subtitle }}</div>
            </div>
          </router-link>
        </div>
      </div>

    </template>
  </div>
</template>

<script>
import ABSGLearnMore from '@/components/ABSG/ABSGLearnMore.vue'
import { useTitle } from "@vueuse/core"
export default {
  components: { ABSGLearnMore },
  data () {
    return {
      language: null,
      feeds: null,
      teach: null,
      resourceType: 'Standard Adult'
    }
  },
  async mounted () {
    await this.getResources()
  },
  methods: {
    getResources: async function () {
      try {
        this.language = this.$route.params.resourceLanguage
        this.feeds = (await this.$apiResources.get(`${this.language}/ss/index.json`)).data

        const title = useTitle()
        title.value = feeds.title
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/absg.css';

</style>