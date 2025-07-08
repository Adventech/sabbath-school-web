<template>
  <div v-if="document" class="flex flex-col gap-5 lg:gap-10 my-5 lg:my-10">
    <div class="sspm-container">
      <div class="inverse-study-hero w-full" :style="`background-image: url('${document.cover}')`">
        <div
            class="rounded-xl pt-12 p-4 lg:pt-52 w-full text-center md:text-left p-8 bg-gradient-to-r from-black/60 lg:from-black/40 to-black/10 lg:to-transparent w-full rounded-b-xl text-white flex flex-col items-start gap-2">
          <p class="text-center lg:text-left w-full">This Week Study Guide</p>
          <p class="text-center lg:text-left w-full text-3xl font-bold">{{ document.title}}</p>
          <div class="mx-auto lg:mx-0">
            <div class="text-xs px-3 py-2 backdrop-blur-md rounded-full flex flex-col lg:flex-row gap-2">
              <span>{{ resource.title }}</span>
              <span class="hidden lg:block">|</span>
              <span>{{ resource.subtitle }}</span>
            </div>
          </div>
          <div class="mt-4 mb-4 mx-auto lg:mx-0">
            <router-link class="rounded-full px-5 py-3 text-black bg-white" :to="{'name': 'document', params: {'resourceLanguage': 'en', 'resourceName': resource.name, 'documentName': document.name}}">View Online</router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="sspm-container">
      <div class="rounded-xl h-20 bg-black relative mt-10 flex items-center text-white justify-between pl-24 md:pl-44 pr-4">
        <img class="absolute -top-2 md:-top-10 w-28 md:w-40 -left-4 md:left-2" src="/assets/img/sspm-inverse-watch-this-week.png" />
        <p class="text-xs md:text-lg uppercase font-bold">Watch this week on YouTube</p>
        <div class="shrink-0">
          <a class="rounded-full px-5 py-3 bg-white text-black" href="https://www.youtube.com/@inVerseBible" target="_blank">Watch Now</a>
        </div>
      </div>
    </div>

    <div class="sspm-container">
      <div class="bg-gray-100 p-10 flex flex-col gap-10 rounded-xl border border-gray-200 border-2">
        <p class="text-center text-3xl text-sspm-accent-800 font-bold">InVerse Bible Study Guides</p>
        <div v-if="feed && feed.resources && feed.resources.length > 0" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-12 items-stretch items-center">
          <router-link :to="
            $route.params.type === 'teach' ? {name: 'document', params: { resourceLanguage: 'en', resourceName: r.name, documentName: this.document ? this.document.name : '01', segmentName: 'teacher-comments' }} : {name: 'publication', params: { resourceLanguage: 'en', resourceName: r.name }}
          " v-for="r in feed.resources" class="flex flex-col bg-white rounded-xl shadow-2xl">
            <div class="shadow-xl">
              <img :src="r.covers.splash ?? r.covers.portrait" class="aspect-[3/2.2] w-full h-full rounded-t-xl object-cover" />
            </div>
            <div class="bg-white p-4 rounded-b-lg flex flex-col gap-3">
              <div class="font-bold text-lg">{{ r.title }}</div>
              <div class="">
                    <span class="bg-gray-100 text-2xs px-2 py-1 rounded-xl">
                      {{ r.subtitle }}
                    </span>
              </div>
              <div class="text-gray-500 text-xs line-clamp-3">{{ r.description }}</div>
              <ABSGLearnMore :to="{'name': 'publication', params: {resourceLanguage: 'en', resourceName: r.name}}" :text="'Read More'" :classes="'!text-sspm-accent-800'" />
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ABSGLearnMore from '@/components/ABSG/ABSGLearnMore.vue'
import { useTitle } from "@vueuse/core"
import DayJS from "dayjs"
export default {
  components: { ABSGLearnMore },
  data () {
    return {
      feed: null,
      document: null,
      resource: null,
    }
  },
  async mounted () {
    const title = useTitle()
    title.value = `InVerse Bible Study Guides`
    await this.getResources()
  },
  methods: {
    getResources: async function () {
      try {
        const allFeed = (await this.$apiResources.get(`en/ss/index.json`)).data
        const correctFeed = allFeed.groups.find((g) => g.title === 'InVerse') ?? allFeed.groups[1]

        this.feed = (await this.$apiResources.get(`en/ss/feeds/${correctFeed.id}/index.json`)).data

        // remove old CQ
        this.feed.resources.splice(-10)

        const today = DayJS()

        const resource = this.feed.resources.find(r => {
          const start = DayJS(r.startDate, 'DD/MM/YYYY')
          const end = DayJS(r.endDate, 'DD/MM/YYYY')
          return today.isAfter(start.subtract(1, 'day')) && today.isBefore(end.add(1, 'day'))
        })

        const resourceData = (await this.$apiResources.get(`en/ss/${resource.name}/sections/index.json`)).data
        this.resource = resourceData

        const foundDoc = resourceData.sections
            .map(section => section.documents.find(doc => {
              const start = DayJS(doc.startDate, 'DD/MM/YYYY')
              const end = DayJS(doc.endDate, 'DD/MM/YYYY')
              return today.isAfter(start.subtract(1, 'day')) && today.isBefore(end.add(1, 'day'))
            }))
            .find(doc => doc) || (resourceData.sections[0]?.documents[0] || null)

        if (foundDoc) {
          this.document = foundDoc
        }
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/absg.css';
.inverse-study-hero {
  @apply w-full bg-cover rounded-xl flex items-end bg-center bg-no-repeat;
  // background-image: url('/assets/img/sspm-inverse-study-hero.png')
}
</style>