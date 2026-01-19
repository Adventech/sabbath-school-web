<template>
  <div class="my-10">
    <template v-if="loading">
      <LoadingList></LoadingList>
    </template>
    <div v-else-if="groupedQuarterlies.length">
      <div v-for="group in groupedQuarterlies" class="mb-10 last:mb-10">
        <div class="mb-4 flex flex-col sm:flex-row justify-between items-center">
          <p class="text-sm font-bold uppercase text-ss-primary mb-4 sm:md-0">{{group.name}}</p>
          <router-link :to="{name: 'quarterlies', params: {lang: $route.params.lang}, query: {group: slugify(group.name)}}" class="pl-2 pr-1 py-1.5 rounded hover:bg-ss-primary hover:text-white text-ss-primary flex items-center justify-between">
            <span class="text-sm">See All</span>
            <ChevronRightIcon class="shrink-0 w-4 h-4" />
          </router-link>
        </div>
        <div class="ss-grid">
          <router-link class="max-w-ss-cover" :to="`/${$route.params.lang}/${quarterly.id}`" v-for="quarterly in group.quarterlies.slice(0, 4)" :key="`quarterly_${quarterly.path}`">
            <div :style="`background-image:url(${quarterly.cover})`" class="min-w-ss-cover max-w-ss-cover max-h-ss-cover min-h-ss-cover bg-center bg-cover mb-4 rounded shadow-gray-400 shadow-lg"></div>
            <p class="mt-2 mb-2 text-xl font-bold">{{ quarterly.title }}</p>
            <p class="uppercase text-gray-400 text-xs">{{ quarterly.human_date }}</p>
          </router-link>
          <div class="hidden 2xl:flex items-center justify-center max-h-ss-cover">
            <router-link :to="{name: 'quarterlies', params: {lang: $route.params.lang}, query: {group: slugify(group.name)}}" class="transition hover:-translate-y-1 ease-in-out rounded-full w-24 h-24 flex items-center justify-center bg-ss-primary/[.075] hover:bg-ss-primary hover:text-white text-ss-primary shadow-lg shadow-gray-250" :aria-label="`View all quarterlies in ${group.name}`">
              <ChevronRightIcon class="shrink-0 w-12 h-12" aria-hidden="true" />
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <template v-else>
      <p v-if="selectedGroup" class="text-sm font-bold uppercase text-ss-primary mb-8 sm:md-0">{{selectedGroup.name}}</p>
      <div class="ss-grid">
        <router-link class="max-w-ss-cover" :to="`/${$route.params.lang}/${quarterly.id}`" v-for="quarterly in quarterlies" :key="`quarterly_${quarterly.path}`">
          <div :style="`background-image:url(${quarterly.cover})`" class="min-w-ss-cover max-w-ss-cover max-h-ss-cover min-h-ss-cover bg-center bg-cover mb-4 rounded shadow-gray-400 shadow-lg"></div>
          <p class="mt-2 mb-2 text-xl font-bold">{{ quarterly.title }}</p>
          <p class="uppercase text-gray-400 text-xs">{{ quarterly.human_date }}</p>
        </router-link>
      </div>
    </template>
  </div>
</template>

<script>
import { useTitle } from "@vueuse/core"
import { ChevronRightIcon } from '@heroicons/vue/24/solid'
import LoadingList from '@/components/Shimmer/LoadingList.vue'

export default {
  components: { ChevronRightIcon, LoadingList },
  data () {
    return {
      loading: false,
      selectedGroup: null,

      quarterlies: [],
      groups: [],
      groupedQuarterlies: []
    }
  },
  methods: {
    getQuarterlies: async function () {
      this.loading = true

      const quarterlies = await this.$api.get(`${this.$route.params.lang}/quarterlies/index.json`)
      this.quarterlies = quarterlies.data

      let emptyGroup = []
      for (let quarterly of this.quarterlies) {
        if (quarterly.quarterly_group) {
          let quarterlyGroup = JSON.parse(JSON.stringify(quarterly.quarterly_group))
          let quarterlyGroupIndex = this.groupedQuarterlies.findIndex(item => item.name === quarterlyGroup.name)
          if (quarterlyGroupIndex < 0) {
            quarterlyGroup.quarterlies = [quarterly]
            this.groupedQuarterlies.push(quarterlyGroup)
          } else {
            this.groupedQuarterlies[quarterlyGroupIndex].quarterlies.push(quarterly)
          }
        } else {
          if (this.groupedQuarterlies.length) {
            this.groupedQuarterlies[0].quarterlies.push(quarterly)
          } else {
            emptyGroup.push(quarterly)
          }
        }
      }

      if (this.groupedQuarterlies.length) {
        this.groupedQuarterlies[0].quarterlies = [...this.groupedQuarterlies[0].quarterlies, ...emptyGroup]
        this.groupedQuarterlies = this.groupedQuarterlies.sort((a, b) => a.order - b.order)
      } else {
        this.groupedQuarterlies = []
      }

      if (this.$route.query.group) {
        let self = this
        this.quarterlies = this.quarterlies.filter(function (item) {
          if (item.quarterly_group && self.slugify(item.quarterly_group.name) === self.$route.query.group) {
            if (!self.selectedGroup) {
              self.selectedGroup = item.quarterly_group
            }
            return true
          }
          return false
        })
        if (!this.quarterlies.length) {
          this.quarterlies = quarterlies.data
        } else {
          this.groupedQuarterlies = []
        }
      }
      this.loading = false
    },
    slugify: function (str) {
      return str.toLowerCase().replace(/ /g, "-")
    }
  },
  async mounted() {
    this.getQuarterlies()
    const title = useTitle()
    title.value = `Sabbath School`
  }
}
</script>

<style lang="scss">
.ss-grid {
  @apply grid grid-cols-1 gap-y-14 sm:gap-x-24 md:gap-x-56 lg:gap-x-14 xl:gap-x-10 2xl:gap-x-7 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 justify-items-center md:justify-items-stretch;
}
</style>