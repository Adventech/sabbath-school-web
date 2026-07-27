<template>
  <div class="flex flex-col gap-5 lg:gap-10 my-5 lg:my-10">
    <div class="sspm-container">

      <div v-if="currentDocument && currentResource" class="sspm-this-week" :style="`background-image: url('${currentDocument.cover}')`">
        <div class="w-full text-center md:text-left p-8 bg-gradient-to-b from-transparent to-black/70 w-full rounded-b-xl text-white flex flex-col items-start gap-10">
          <div class="w-full flex flex-col gap-4">
            <p class="text-white">This Week's Lesson:</p>
            <p class="w-full text-3xl lg:max-w-[53.3%] xl:max-w-[33.3%] leading-tight tracking-tight font-black">{{ currentDocument.title }}</p>
            <p class="text-white">{{DayJS(currentDocument.startDate, 'DD/MM/YYYY').format('MMMM DD')}} - {{DayJS(currentDocument.endDate, 'DD/MM/YYYY').format('MMMM DD')}}</p>
          </div>

          <div class="mx-auto md:mx-0 flex flex-col lg:flex-row gap-3">
            <router-link :to="{name: 'document', params: {resourceLanguage: 'en', resourceName: currentResource.name, documentName: currentDocument.name}}" class="text-black bg-white rounded-full border border-white/40 p-3 px-7">Standard Adult</router-link>
            <router-link :to="{name: 'document', params: {resourceLanguage: 'en', resourceName: `${currentResource.name}-er`, documentName: currentDocument.name}}" class="text-black bg-white rounded-full border border-white/40 p-3 px-7">Easy Reading</router-link>
            <router-link :to="{name: 'document', params: {resourceLanguage: 'en', resourceName: currentResource.name, documentName: currentDocument.name, segmentName: 'teacher-comments'}}" class="text-black bg-white rounded-full border border-white/40 p-3 px-7">Adult Teachers</router-link>
          </div>
        </div>
      </div>
    </div>

    <div v-if="currentDocument" class="bg-sspm-accent-50 py-10">
      <div class="flex flex-col gap-10 sspm-container">
        <div class="flex flex-col gap-3">
          <p class="text-sspm-accent-600 font-bold">This Week's</p>
          <p class="text-3xl font-bold">Teacher Helps</p>
          <div class="flex justify-between gap-10">
            <p class="text-black/80">Prepare to lead your Sabbath School class using excellent resources and media that will equip you to teach the Bible with clarity.</p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-10 items-stretch items-center">
          <div class="bg-gradient-to-b from-transparent to-white via-white rounded-b-xl">
            <div class="bg-center rounded-t-xl bg-left-top bg-cover min-h-64 w-full" :style="`background-image:url('${currentResource.covers.portrait}')`"></div>
            <div class="bg-white p-5 rounded-b-xl">
              <p class="text-lg"><strong>Adult Teacher Guide</strong></p>
              <ABSGLearnMore :to="`${currentDocument.index.replace('en/ss', '/en')}/teacher-comments`"></ABSGLearnMore>
            </div>
          </div>

          <div class="bg-gradient-to-b from-transparent to-white via-white rounded-b-xl">
            <div class="bg-center rounded-t-lg bg-cover bg-[url(/assets/img/sspm-hope-ss.png)] min-h-64 w-full"></div>
            <div class="bg-white p-5 rounded-b-xl">
              <p class="text-lg"><strong>Hope Sabbath School Outline</strong></p>
              <ABSGLearnMore :to="`${currentDocument.index.replace('en/ss', '/en')}/hope-ss`"></ABSGLearnMore>
            </div>
          </div>

          <div class="bg-gradient-to-b from-transparent to-white via-white rounded-b-xl">
            <div class="bg-center rounded-t-lg bg-cover bg-[url(/assets/img/sspm-talking-points.png)] min-h-64 w-full"></div>
            <div class="bg-white p-5 rounded-b-xl">
              <p class="text-lg"><strong>Talking Points Outline</strong></p>
              <ABSGLearnMore :to="`${currentDocument.index.replace('en/ss', '/en')}/talking-points`"></ABSGLearnMore>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="sspm-container flex flex-col gap-10 py-5">
      <div class="text-center lg:max-w-[36.3%] m-auto">
        <p class="text-sspm-accent-600 font-bold">This Week's</p>
        <p class="text-3xl font-bold">Media</p>
        <p class="text-black/50">Deepen your understanding of God’s Word with the current Sabbath School lesson, designed for personal study and group discussion.</p>
      </div>

      <div v-if="currentResource && currentDocument" class="grid grid-cols-1 lg:grid-cols-2 items-center items-stretch">
        <div class="p-4 md:p-10 lg:py-24 rounded-t-xl lg:rounded-tr-none lg:rounded-l-xl bg-sspm-accent-50 flex items-center flex-1">
          <div class="w-full flex flex-col gap-4">
            <div>
              <p class="text-sspm-accent-600 font-bold">This Week's lesson on audio</p>
              <p class="text-xl font-bold">{{ currentDocument.title }}</p>
            </div>
            <div class="flex flex-col">
              <div class="bg-sspm-accent-800 rounded-t-xl text-white p-3 lg:p-6">
                <div class="flex items-center gap-4">
                  <div>
                    <img class="w-12 rounded" :src="currentResource.covers.portrait" :alt="`Cover for ${currentResource.title}`" />
                  </div>
                  <div>{{ currentResource.title }}</div>
                </div>
              </div>
              <div class="bg-white rounded-b-xl p-3 lg:p-6">
                <audio class="ss-audio w-full" controls></audio>
              </div>
            </div>
          </div>
        </div>
        <div class="px-10 py-10 lg:py-24 rounded-b-xl lg:rounded-b-none lg:rounded-r-xl bg-gray-100 flex flex-col items-center flex-1 gap-5">
          <div class="flex w-full justify-between">
            <p class="font-bold text-lg">Related Playlist</p>
            <ABSGLearnMore class="shrink-0" :to="'/'"></ABSGLearnMore>
          </div>

          <div class="w-full">
            <ul>
              <li @click="autoplay = true; selectedAudio = audio" v-for="(audio, index) in audios" class="rounded p-3 cursor-pointer" :class="{'bg-gray-200 text-sspm-accent-600': audio.id === selectedAudio.id}">{{ audio.title }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>


    <div v-if="currentDocument" class="sspm-container">
      <div class="bg-sspm-accent-900 p-4 lg:p-10 rounded-xl flex flex-col gap-12">
        <div class="text-center m-auto flex flex-col gap-5">
          <p class="text-sspm-accent-600 font-bold">Videos on this week's lesson</p>
          <p class="text-white text-2xl font-bold leading-tight">{{ currentDocument.title }}</p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 items-stretch items-center justify-center">
          <div v-for="v in videos" class="bg-gradient-to-b from-transparent to-white via-white rounded-b-xl">
            <div class="bg-center rounded-t-xl bg-cover lg:min-h-48 min-h-64 w-full" :style="`background-image: url('${v.clips[0].thumbnail}')`"></div>
            <div class="bg-white p-5 rounded-b-xl flex flex-col gap-3">
              <div>
                <span class="px-3 py-1 rounded-full bg-sspm-accent-50 text-sspm-accent-600 text-xs">{{ v.artist }}</span>
              </div>
              <p class="text-lg leading-tight"><strong>{{ v.clips[0].title }}</strong></p>
              <ABSGLearnMore :to="`${currentDocument.index.replace('en/ss', '/en')}/videos?video=${v.clips[0].id}`"></ABSGLearnMore>
            </div>
          </div>
        </div>

        <div class="mx-auto mb-10 lg:mb-0">
          <router-link :to="`${currentDocument.index.replace('en/ss', '/en')}/videos`" class="rounded-full px-5 py-3 bg-sspm-accent-600 text-white/80">View More</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useTitle } from "@vueuse/core"
import Plyr from 'plyr'
import DayJS from 'dayjs'
import ABSGLearnMore from '@/components/ABSG/ABSGLearnMore.vue'
export default {
  components: { ABSGLearnMore },
  data () {
    return {
      currentResource: null,
      currentDocument: null,
      videos: [],
      audios: [],
      selectedAudio: null,
      loading: true,
      error: false,
      DayJS,
      autoplay: false,
      player: null,
    }
  },
  methods: {
    getCurrentResource: async function () {
      try {
        const feed = (await this.$apiResources.get(`en/ss/index.json`)).data
        const adult = feed.groups.filter((g) => g.title === 'Standard Adult')[0]
        const today = DayJS()

        const currentResource = adult.resources.find(item => {
          const start = DayJS(item.startDate, 'DD/MM/YYYY')
          const end = DayJS(item.endDate, 'DD/MM/YYYY')
          return today.isAfter(start.subtract(1, 'day')) && today.isBefore(end.add(1, 'day'))
        })

        this.currentResource = currentResource

        const resource = (await this.$apiResources.get(`${currentResource.index}/sections/index.json`)).data

        const foundDoc = resource.sections
            .map(section => section.documents.find(doc => {
              const start = DayJS(doc.startDate, 'DD/MM/YYYY')
              const end = DayJS(doc.endDate, 'DD/MM/YYYY')
              return today.isAfter(start.subtract(1, 'day')) && today.isBefore(end.add(1, 'day'))
            }))
            .find(doc => doc) || (data.sections[0]?.documents[0] || null)

        if (foundDoc) {
          this.currentDocument = foundDoc
          await this.getVideos()
          await this.getAudios()
        }
        this.loading = false
      } catch (e) {
        console.log(e)
        this.loading = false
        this.error = true
      }
    },

    getVideos: async function () {
      try {
        const videoFeed = (await this.$apiResources.get(`${this.currentDocument.resourceIndex}/video.json`)).data
        this.videos = videoFeed.filter((v) => v.artist !== 'Hope Lives 365')
      } catch (e) {
        console.log(e)
      }
    },

    getAudios: async function () {
      try {
        const audioFeed = (await this.$apiResources.get(`${this.currentDocument.resourceIndex}/audio.json`)).data
        this.audios = audioFeed.filter((a) => a.target.indexOf(this.currentDocument.index) === 0 && /Adult Bible Study Guides/i.test(a.artist))
        const day = ((DayJS().day() + 1) % 7) + 1
        this.selectedAudio = this.audios.find((a) => a.target.indexOf(`${this.currentDocument.index}/0${day}`) === 0)

        this.player = new Plyr('.ss-audio')

      } catch (e) {
        console.log(e)
      }
    }
  },
  async mounted () {
    await this.getCurrentResource()

    const title = useTitle()
    title.value = `This Week - Adult Bible Study Guides`
  },
  watch: {
    selectedAudio(newAudio) {
      if (newAudio && this.player) {
        this.player.source = {
          type: 'audio',
          sources: [ { src: newAudio.src, title: newAudio.title } ],
        }
        if (this.autoplay) {
          this.player.play()
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/absg.css';

.sspm-this-week {
  @apply w-full pt-20 lg:pt-44 bg-cover rounded-xl flex items-end;
  // background-image: url('https://images.unsplash.com/photo-1504052434569-70ad5836ab65?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')
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