<template>
  <div class="my-10 md:flex" v-if="quarterly">
    <div class="shrink-0 flex justify-center md:justify-start md:flex-col md:items-end">
      <div :style="`background-image:url(${quarterly.quarterly.cover})`" class="shrink-0 w-32 h-48 md:min-w-ss-cover md:max-w-ss-cover md:max-h-ss-cover md:min-h-ss-cover bg-center bg-cover mb-4 rounded shadow-gray-400 shadow-lg"></div>
      <div class="ml-4 md:m-0 md:text-right">
        <p class="md:mt-4 uppercase text-gray-400 text-xs">{{quarterly.quarterly.human_date}}</p>
        <div class="mt-4">
          <div v-for="feature in quarterly.quarterly.features" class="inline mr-3 last:mr-0" :key="`quarterly_${quarterly.quarterly.path}_feature_${feature.title}`">
            <img :src="feature.image" class="w-4 inline" />
          </div>
        </div>
        <div class="mt-4 md:text-right">
          <div v-for="credit in quarterly.quarterly.credits" class="mb-4" :key="`quarterly_${quarterly.path}_credits_${credit.name}`">
            <p class="font-bold">{{credit.name}}</p>
            <p class="text-gray-500">{{credit.value}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="mt-4 md:ml-8 md:mt-0">
      <p class="mb-4 text-3xl font-bold">{{quarterly.quarterly.title}}</p>
      <a :href="publishingInfo.data.url" target="_blank" v-if="publishingInfo && publishingInfo.data" class="rounded p-4 bg-gray-100 hover:bg-gray-200 flex mb-4 justify-between items-center">
        <p class="text-gray-500 text-sm">{{publishingInfo.data.message}}</p>
        <ChevronRightIcon class="shrink-0 ml-3 w-5 h-5 bg-ss-primary rounded-full text-white" />
      </a>
      <div class="mb-4">
        {{quarterly.quarterly.description}}
        <button @click="open = !open" class="text-blue-600 font-medium italic underline outline-none" v-if="quarterly.quarterly.introduction && (Math.abs(quarterly.quarterly.introduction.length - quarterly.quarterly.description.length) > 100)">more</button>
      </div>
      <Popup :open="open" @closed="open = false">
        <Markdown v-if="quarterly.quarterly.introduction" :markdown="quarterly.quarterly.introduction"></Markdown>
      </Popup>
      <div class="mt-6 mb-4">
        <div class="flex items-center" v-for="(lesson, i) in quarterly.lessons" :key="`quarterly_${quarterly.quarterly.path}_lessons_${i}`">
          <span class="text-2xl font-bold text-gray-400 mr-4">{{i+1}}</span>
          <div class="mb-4">
            <router-link :to="`/${this.$route.params.lang}/${this.$route.params.quarter}/${lesson.id}/01`" class="text-xl font-bold text-ss-primary hover:underline">{{lesson.title}}</router-link>
            <p class="text-gray-500 text-sm">{{DayJS(lesson.start_date, 'DD/MM/YYYY').format('MMM DD')}} - {{DayJS(lesson.end_date, 'DD/MM/YYYY').format('MMM DD')}}</p>
          </div>
        </div>
      </div>
      <div class="mb-4">
        <div v-for="feature in quarterly.quarterly.features" class="mb-4" :key="`quarterly_${quarterly.path}_feature_${feature.title}`">
          <div class="flex items-center">
            <img :src="feature.image" class="h-3 mr-2" />
            <p class="font-bold">{{feature.title}}</p>
          </div>
          <p class="text-gray-500">{{feature.description}}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useTitle } from '@vueuse/core'
import DayJS from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import Popup from '@/components/Popup.vue'
import Markdown from '@/components/Markdown.vue'
import ct from 'countries-and-timezones'
import { ChevronRightIcon } from '@heroicons/vue/solid'

DayJS.extend(customParseFormat)
export default {
  components: { Popup, Markdown, ChevronRightIcon },
  data () {
    return {
      DayJS,
      quarterly: null,
      open: false,
      publishingInfo: null
    }
  },
  async mounted() {
    const quarterly = await this.$api.get(`${this.$route.params.lang}/quarterlies/${this.$route.params.quarter}/index.json`)
    const browserTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone
    const timezone = ct.getTimezone(browserTimezone)
    if (timezone) {
      if (timezone.countries.length) {
        const publishingInfo = await this.$api.post(`/misc/publishing/info`, {
          "country": timezone.countries[0].toLowerCase(),
          "language": this.$route.params.lang
        })
        this.publishingInfo = publishingInfo.data
      }
    }

    this.quarterly = quarterly.data

    const title = useTitle()
    title.value = `${this.quarterly.quarterly.title} - Sabbath School`
  }
}
</script>