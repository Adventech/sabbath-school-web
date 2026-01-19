<template>
  <div class="flex flex-col gap-5 lg:gap-10 mt-5 lg:mt-10">
    <div class="sspm-container">
      <div class="inverse-hero">
        <div class="w-full text-center md:text-left p-8 bg-gradient-to-b from-transparent via-black/50 to-black/80 w-full rounded-b-xl text-white flex flex-col items-start gap-4">
          <p class="w-full text-3xl font-black tracking-tight">InVerse Young<br/> Adult Bible Study Guide</p>
          <p class="w-full text-white/80 lg:max-w-[53.3%] xl:max-w-[33.3%]">InVerse is an in-depth, interactive Bible study guide that is loved by people all around the world! InVerse is designed for young adults ages 19-35 to use for personal Bible study and in Sabbath School and Bible study groups.</p>
          <div class="pt-4 flex gap-4 mx-auto md:mx-0">
            <router-link role="button" :to="{'name': 'study'}" class="text-xs sm:text-base rounded-full border border-white/40 p-3 px-7 bg-sspm-accent-600">Start Learning</router-link>
            <router-link role="button" :to="{'name': 'study'}" class="text-xs sm:text-base rounded-full border border-white/40 p-3 px-7 backdrop-blur">Learn more</router-link>
          </div>
        </div>
      </div>
    </div>

    <div class="bg-gray-100">
      <div class="sspm-container flex flex-col gap-10 py-10">
        <div class="text-center lg:max-w-[36.3%] m-auto">
          <p class="text-sspm-accent font-bold text-3xl">InVerse Bible Study Guide</p>
          <p class="text-black/80">Deepen your understanding of God’s Word with the current Sabbath School lesson, designed for personal study and group discussion.</p>
        </div>

        <div class="flex flex-col gap-4">

          <div v-if="inverse.resources && inverse.resources.length > 0" class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 gap-12 items-stretch items-center">
            <router-link :to="{'name': 'publication', params: {resourceLanguage: 'en', resourceName: r.name}}" v-for="r in inverse.resources.slice(0, 4)" class="flex flex-col">
              <div class="shadow-xl">
                <img :src="r.covers.splash" class="aspect-[3/2.2] w-full h-full rounded-t-lg shadow-2xl object-cover" :alt="`Cover image for ${r.title}`" />
              </div>
              <div class="bg-white p-4 rounded-b-lg shadow-xl flex flex-col gap-3">
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

          <div class="mx-auto my-16">
            <router-link class="bg-sspm-accent-600 text-white px-6 py-3 rounded-full" :to="{'name': 'study'}">View All</router-link>
          </div>
        </div>

      </div>
    </div>
  </div>
  <div class="inverse-media">
    <div class="sspm-container inverse-media-inner p-10">
      <div class="bg-white rounded-xl p-6 w-full lg:w-5/12 flex flex-col gap-4">
        <p class="font-bold tracking-tight text-3xl">Media</p>
        <p class="">Bible study with warm humor, practical intelligence, simple application, and authentic conversation.</p>
        <div class="mt-4">
          <router-link class="bg-sspm-accent-600 text-white px-6 py-3 rounded-full" :to="{'name': 'media'}">Learn more</router-link>
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
      inverse: [],
      DayJS,
    }
  },
  async mounted () {
    await this.getResources()

    const title = useTitle()
    title.value = `InVerse Bible Study Guides - Sabbath School and Personal Ministries`
  },
  methods: {
    getResources: async function () {
      try {
        const feed = (await this.$apiResources.get(`en/ss/index.json`)).data
        this.inverse = feed.groups.find((g) => g.title === 'InVerse') ?? feed.groups[0]
      } catch (e) {
        console.error(e)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/absg.css';
.inverse-hero {
  @apply w-full pt-20 lg:pt-44 bg-cover rounded-xl mt-5 flex items-end bg-center;
  background-image: url('/assets/img/sspm-inverse-hero.png')
}
.inverse-media {
  @apply bg-top lg:bg-center bg-[left_65rem_top_50rem] lg:bg-cover;
  background-image: url('/assets/img/sspm-inverse-media.png');

  &-inner {
    @apply pt-72 lg:pt-64;
  }
}
</style>