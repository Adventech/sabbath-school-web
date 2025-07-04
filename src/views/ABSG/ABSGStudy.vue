<template>
  <div class="flex flex-col gap-5 lg:gap-10 my-5 lg:my-10">
    <div class="sspm-container">
      <p class="text-center text-3xl text-sspm-accent-800 font-bold">{{ teach ?? resourceType }}</p>
      <p v-if="teach" class="text-black/80">Deepen your understanding of God’s Word with the current Sabbath School lesson, designed for personal study and group discussion.</p>
    </div>

    <div v-if="teach" class="sspm-container">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="rounded-xl aspect-[4/3] md:aspect-[16/6] bg-cover bg-center bg-[url(/assets/img/sspm-scope-sequence.jpg)] flex items-end">
          <div class="md:flex justify-between w-full p-4 backdrop-blur-lg rounded-b-xl text-white">
            <p>Scope and Sequence</p>
            <ABSGLearnMore :to="{'name': 'scope'}" :classes="`!text-white`" />
          </div>
        </div>
        <div class="rounded-xl aspect-[4/3] md:aspect-[16/6] bg-cover bg-[url(/assets/img/sspm-teacher-training.jpg)] flex items-end">
          <div class="md:flex justify-between w-full p-4 backdrop-blur-lg rounded-b-xl text-white">
            <p>Teacher Training</p>
            <ABSGLearnMore :href="'https://sspmadventist.org/sabbathschool/alive/biblestudyandprayer'" :classes="`!text-white`" />
          </div>
        </div>
      </div>
    </div>

    <div class="sspm-container">
      <div v-if="feed && feed.resources && feed.resources.length > 0" class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-12 items-stretch items-center">
        <router-link :to="
          resourceType === 'teach' ? {name: 'document', params: { resourceLanguage: 'en', resourceName: r.name, documentName: this.document ? this.document.name : '01', segmentName: 'teacher-comments' }} : {name: 'publication', params: { resourceLanguage: 'en', resourceName: r.name }}
        " v-for="r in feed.resources" class="flex flex-col gap-3">
          <div class="">
            <img :src="r.covers.portrait" class="aspect-[2/3] w-full h-full rounded-lg shadow-2xl object-cover" />
          </div>
          <div>
            <div class="font-bold text-lg">{{ r.title }}</div>
            <div class="text-gray-400 text-xs">{{ r.subtitle }}</div>
          </div>
        </router-link>
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
      teach: null,
      resourceType: 'Standard Adult',
      document: null,
    }
  },
  async mounted () {
    const resourceType = this.$route.params.type
    const title = useTitle()
    if (resourceType === 'easy-reading') {
      this.resourceType = 'Easy Reading'
      title.value = `Easy Reading - Adult Bible Study Guides`
    } else if (resourceType === 'teach') {
      this.teach = 'Teacher Helps'
      title.value = `Teacher Helps - Adult Bible Study Guides`
    } else {
      title.value = `Standard Adult - Adult Bible Study Guides`
    }
    this.resourceType = resourceType

    await this.getResources()
  },
  methods: {
    getResources: async function () {
      try {
        const allFeed = (await this.$apiResources.get(`en/ss/index.json`)).data
        const correctFeed = allFeed.groups.find((g) => g.title === this.resourceType) ?? allFeed.groups[0]

        this.feed = (await this.$apiResources.get(`en/ss/feeds/${correctFeed.id}/index.json`)).data

        if (this.resourceType === 'teach') {
          const today = DayJS()
          const resource = this.feed.resources.find(r => {
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

</style>