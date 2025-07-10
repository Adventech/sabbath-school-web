<template>
  <div class="flex flex-col gap-5 lg:gap-10 my-5 lg:my-10">
    <div class="sspm-container">
      <div class="sspm-hero">
        <div class="w-full text-center md:text-left  p-8 bg-gradient-to-b from-transparent to-black/70 w-full rounded-b-xl text-white flex flex-col items-start gap-4">
          <p class="w-full text-3xl">Explore This Week</p>
          <p class="w-full text-white/80 lg:max-w-[53.3%] xl:max-w-[33.3%]">Deepen your understanding of God’s Word with the current Sabbath School lesson, designed for personal study and group discussion.</p>
          <div class="mx-auto md:mx-0 mt-4">
            <router-link role="button" :to="{'name': 'this-week'}" class="rounded-full border border-white/40 p-3 px-7 backdrop-blur">Learn more</router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gray-100">
      <div class="sspm-container flex flex-col gap-10 py-10">
        <div class="text-center lg:max-w-[36.3%] m-auto">
          <p class="text-sspm-accent font-bold text-3xl">Study</p>
          <p class="text-black/80">Study the Bible with current and past editions of the Adult Bible Study Guide.</p>
        </div>

        <div class="flex flex-col gap-4">
          <p class="text-xl">Standard Adult</p>

          <div v-if="adult.resources && adult.resources.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-12 items-stretch items-center">
            <router-link :to="{'name': 'publication', params: {resourceLanguage: 'en', resourceName: r.name}}" v-for="r in adult.resources.slice(0, 5)" class="flex flex-col gap-3">
              <div class="">
                <img :src="r.covers.portrait" class="aspect-[2/3] w-full h-full rounded-lg shadow-2xl object-cover" />
              </div>
              <div>
                <div class="font-bold text-lg">{{ r.title }}</div>
                <div class="text-gray-400 text-xs">{{ r.subtitle }}</div>
              </div>
            </router-link>
          </div>

          <div class="mx-auto">
            <router-link :to="{'name': 'study'}" class="px-5 py-3 shadow-xl rounded-full bg-sspm-accent-600 text-white">View all</router-link>
          </div>
        </div>

        <hr/>

        <div class="flex flex-col gap-4">
          <p class="text-xl">Easy Reading</p>

          <div v-if="er.resources && er.resources.length > 0" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 items-stretch items-center">
            <router-link :to="{'name': 'publication', params: {resourceLanguage: 'en', resourceName: r.name}}" v-for="r in er.resources.slice(0, 5)" class="flex flex-col gap-3">
              <div class="">
                <img :src="r.covers.portrait" class="aspect-[2/3] w-full h-full rounded-lg shadow-2xl object-cover" />
              </div>
              <div>
                <div class="font-bold text-lg">{{ r.title }}</div>
                <div class="text-gray-400 text-xs">{{ r.subtitle }}</div>
              </div>
            </router-link>
          </div>

          <div class="mx-auto">
            <router-link :to="{'name': 'study', params: {type: 'easy-reading'}}" class="px-5 py-3 shadow-xl rounded-full bg-sspm-accent-600 text-white">View all</router-link>
          </div>
        </div>

        <hr/>

        <div class="flex flex-col gap-4">
          <p class="text-xl">Adult Teachers</p>

          <div v-if="adult.resources && adult.resources.length > 0" class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-12 items-stretch items-center">
            <router-link :to="{'name': 'publication', params: {resourceLanguage: 'en', resourceName: r.name}}" v-for="r in adult.resources.slice(0, 5)" class="flex flex-col gap-3">
              <div class="">
                <img :src="r.covers.portrait" class="aspect-[2/3] w-full h-full rounded-lg shadow-2xl object-cover" />
              </div>
              <div>
                <div class="font-bold text-lg">{{ r.title }}</div>
                <div class="text-gray-400 text-xs">{{ r.subtitle }}</div>
              </div>
            </router-link>
          </div>

          <div class="mx-auto">
            <router-link :to="{'name': 'study', params: {type: 'teacher'}}" class="px-5 py-3 shadow-xl rounded-full bg-sspm-accent-600 text-white">View all</router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="sspm-container flex flex-col gap-10 p-10">
      <div class="sspm-teacher-helps">
        <div class="sspm-teacher-helps-image"></div>
        <div class="sspm-teacher-helps-text">
          <p class="sspm-teacher-helps-text-title">Teacher Helps</p>
          <p class="sspm-teacher-helps-text-subtitle">Prepare to lead your Sabbath School class using excellent resources and media that will equip you to teach the Bible with clarity.</p>
          <div>
            <router-link :to="{name: 'study', params: {type: 'teach'}}" class="sspm-teacher-helps-text-cta">Learn More</router-link>
          </div>
        </div>
      </div>
      <div v-if="document" class="sspm-media">
        <div class="sspm-media-image"></div>
        <div class="sspm-media-text">
          <p class="sspm-media-text-title">Media</p>
          <p class="sspm-media-text-subtitle">Learn valuable Scriptural insights from experienced teachers and participants studying the Sabbath School lesson.</p>
          <div>
            <router-link :to="`${document.index.replace('en/ss', '/en')}/videos`" class="sspm-teacher-helps-text-cta">Learn More</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useTitle } from "@vueuse/core"
import ABSGLearnMore from '@/components/ABSG/ABSGLearnMore.vue'
import DayJS from "dayjs"
export default {
  components: { ABSGLearnMore },
  data () {
    return {
      adult: [],
      er: [],
      document: null,
      DayJS,
    }
  },
  async mounted () {
    await this.getResources()

    const title = useTitle()
    title.value = `Adult Bible Study Guides - Sabbath School and Personal Ministries`
  },
  methods: {
    getResources: async function () {
      try {
        const feed = (await this.$apiResources.get(`en/ss/index.json`)).data
        this.adult = feed.groups.find((g) => g.title === 'Standard Adult') ?? feed.groups[0]
        this.er = feed.groups.find((g) => g.title === 'Easy Reading') ?? feed.groups[2]

        const today = DayJS()

        const resource = this.adult.resources.find(r => {
          const start = DayJS(r.startDate, 'DD/MM/YYYY')
          const end = DayJS(r.endDate, 'DD/MM/YYYY')
          return today.isAfter(start.subtract(1, 'day')) && today.isBefore(end.add(1, 'day'))
        })

        const resourceData = (await this.$apiResources.get(`en/ss/${resource.name}/sections/index.json`)).data

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
.sspm-hero {
  @apply w-full pt-20 lg:pt-44 bg-cover rounded-xl mt-5 flex items-end;
  background-image: url('https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
}

.sspm-double-block {
  @apply flex flex-col lg:flex-row;
  &-image {
    @apply lg:w-1/2 bg-cover order-1 h-[300px] lg:h-auto;
  }
  &-text {
    @apply lg:w-1/2 py-10 lg:py-32 px-10 flex flex-col gap-5 order-2;
    &-title {
      @apply text-3xl;
    }
    &-cta {
      @apply bg-sspm-accent-600 px-5 py-2 text-white rounded-full inline;
    }
  }
}

.sspm-teacher-helps {
  @apply sspm-double-block;
  &-image {
    @apply sspm-double-block-image rounded-t-xl lg:rounded-t-none lg:rounded-l-xl;
    background-image: url('/assets/img/sspm-bible.jpg')
  }
  &-text {
    @apply sspm-double-block-text bg-sspm-secondary rounded-b-xl lg:rounded-b-none lg:rounded-r-xl;

    &-title {
      @apply sspm-double-block-text-title;
    }

    &-cta {
      @apply sspm-double-block-text-cta;
    }
  }
}

.sspm-media {
  @apply sspm-double-block;
  &-image {
    @apply sspm-double-block-image rounded-t-xl lg:rounded-t-none lg:rounded-r-xl lg:order-2;
    background-image: url('/assets/img/sspm-media.jpg')
  }
  &-text {
    @apply sspm-double-block-text rounded-b-xl lg:rounded-b-none lg:rounded-l-xl lg:order-1 bg-sspm-accent-900;
    &-title {
      @apply sspm-double-block-text-title text-white;
    }
    &-subtitle {
      @apply text-white/80;
    }
    &-cta {
      @apply sspm-double-block-text-cta;
    }
  }
}
</style>