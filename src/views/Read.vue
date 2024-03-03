<template>
  <template v-if="loading">
    <LoadingDetail></LoadingDetail>
  </template>
  <div v-else class="my-10 flex flex-col md:flex-row">
    <div v-if="quarterly" class="flex md:flex-col order-1 md:order-0 md:w-3/12 lg:w-3/12 xl:w-2/12">
      <router-link :to="`/${this.$route.params.lang}/${this.$route.params.quarter}`" class="w-4/12 mx-auto md:w-auto">
          <img :src="quarterly.quarterly.cover" class="rounded shadow-gray-400 shadow-lg md:mr-4" />
      </router-link>
      <div v-if="lesson" class=" md:mt-4 w-8/12 md:w-auto" :class="!lesson.lesson.pdfOnly ? 'md:text-right -mr-3 ml-4 md:ml-0' : 'ml-4 md:-ml-4'">
        <router-link :to="`/${this.$route.params.lang}/${this.$route.params.quarter}`" class="hover:underline mb-4 font-bold text-lg text-gray-600 ml-4 md:mr-4 block">{{quarterly.quarterly.title}}</router-link>
        <template v-if="lesson.lesson.pdfOnly">
          <div v-for="(quarterlyLesson, i) in quarterly.lessons" :key="`lessons_${i}`">
            <router-link :to="`/${this.$route.params.lang}/${this.$route.params.quarter}/${quarterlyLesson.id}/${slugify(1, '99', quarterlyLesson.title)}`"
                         class="mb-1 flex items-center hover:bg-gray-200 px-4 py-2 rounded"
                         :class="quarterlyLesson.id === lesson.lesson.id ? 'font-bold text-ss-primary': 'text-gray-600'"
            >
              <div class="shrink-0 text-gray-100 inline-flex rounded-full w-5 h-5 justify-center items-center mr-2"
                   :class="quarterlyLesson.id === lesson.lesson.id ? 'bg-ss-primary text-white': 'bg-gray-400'"
              >
                <span v-if="/^\d*$/.test(quarterlyLesson.id)" class="text-xs text-center">{{ parseInt(quarterlyLesson.id) }}</span>

              </div>
              <span class="stretchgrow overflow-hidden text-sm">{{quarterlyLesson.title}}</span>
            </router-link>
          </div>
        </template>
        <template v-else>
          <router-link :to="`/${this.$route.params.lang}/${this.$route.params.quarter}/${this.$route.params.lesson}/${slugify(i+1, day.id, day.title)}`" v-for="(day, i) in lesson.days" :key="`read_days_${i}`" class="flex flex-col hover:bg-gray-200 px-4 py-2 rounded">
            <p class="text-sm text-gray-400">{{DayJS(day.date, 'DD/MM/YYYY').format('dddd, MMMM DD')}}</p>
            <span class="text-sm block" :class="{'text-ss-primary font-bold': read && day && (day.id === read.id)}"
            >{{day.title}}</span>
          </router-link>
        </template>
      </div>
    </div>
    <div class="mt-4 ml-0 md:ml-6 md:mt-0 mb-4 md:mb-0 grow order-0 md:order-1 md:w-3/12 lg:w-9/12 xl:w-10/12">
      <div v-if="lesson" class="rounded border border-1 border-gray-150 h-full">
        <div v-if="read" :style="`background-image: url('${lesson.lesson.cover}')`" class="rounded-t h-ss-cover bg-center bg-cover flex flex-col">
          <div class="flex justify-end p-2">
            <div class="pb-2 pt-3 px-5 bg-black/[.6] flex rounded-lg">
              <ReaderOptions class="mt-2"></ReaderOptions>
              <button v-if="audio.length" @click="audioOpen = true"><AudioIcon class="hover:fill-gray-400 w-6 h-6 fill-white mr-4" /></button>
              <button v-if="video.length" @click="videoOpen = true"><VideoIcon class="hover:fill-gray-400 w-6 h-6 fill-white" /></button>
              <button v-if="pdfs.length" @click="showPdf = !showPdf"><DocumentTextIcon class="w-6 h-6 mb-2 ml-4" :class="{'text-blue-300 hover:text-blue-200': showPdf, 'text-white hover:text-gray-400': !showPdf}"></DocumentTextIcon></button>
            </div>
          </div>
          <div class="grow"></div>
          <div class="bg-gradient-to-b from-transparent to-black w-full py-5 px-4 md:px-6 lg:px-8 xl:px-10">
            <p class="text-gray-300 uppercase font-thin">{{DayJS(read.date, 'DD/MM/YYYY').format('dddd, MMMM DD')}}</p>
            <p class="text-white font-bold text-4xl">{{read.title}}</p>
          </div>
        </div>
        <div v-else class="pt-4 px-4 flex justify-end">
          <button v-if="audio.length" @click="audioOpen = true"><AudioIcon class="hover:fill-gray-400 w-6 h-6 fill-black mr-4" /></button>
          <button v-if="video.length" @click="videoOpen = true"><VideoIcon class="hover:fill-gray-400 w-6 h-6 fill-black" /></button>
        </div>
        <PDF v-if="(lesson.lesson.pdfOnly || showPdf) && pdfs" :pdfs="pdfs" :lessonIndex="lesson.lesson.index"></PDF>
        <Reader ref="reader" v-if="read && !showPdf" :read="read" @mounted="readerMounted" @save-highlights="saveHighlights" @save-comments="saveComments"></Reader>

        <Popup :minimizeable="true" :open="audioOpen" @closed="audioOpen = false" @expanded="audioMinimized = false" @minimized="audioMinimized = true">
          <Audio :audio="audio" :target="read ? read.index : null" :minimized="audioMinimized" />
        </Popup>

        <Popup :open="videoOpen" @closed="videoOpen = false" :large="true">
          <Video :video="video" :target="lesson && lesson.lesson ? lesson.lesson.index : null" />
        </Popup>
      </div>
    </div>
  </div>
</template>

<script>
import DayJS from 'dayjs'
import DayJSIsBetween from 'dayjs/plugin/isBetween'
import DayJSCustomParseFormat from 'dayjs/plugin/customParseFormat'
import Reader from '@/components/Reader.vue'
import PDF from '@/components/PDF.vue'
import AudioIcon from '@/assets/img/audio-icon.svg'
import VideoIcon from '@/assets/img/video-icon.svg'
import { useTitle } from "@vueuse/core"
import Popup from '@/components/Popup.vue'
import Audio from '@/components/Audio.vue'
import Video from '@/components/Video.vue'
import ReaderOptions from '@/components/Reader/ReaderOptions.vue'
import LoadingDetail from '@/components/Shimmer/LoadingDetail.vue'
import { authStore } from '@/stores/auth'
import { DocumentTextIcon } from '@heroicons/vue/24/outline'

DayJS.extend(DayJSIsBetween)
DayJS.extend(DayJSCustomParseFormat)

export default {
  components: { DocumentTextIcon, Reader, AudioIcon, VideoIcon, PDF, Popup, Audio, Video, LoadingDetail, ReaderOptions },
  data () {
    return {
      DayJS,
      loading: true,
      quarterly: null,
      lesson: null,
      days: [],
      read: null,

      pdfs: null,
      showPdf: false,

      audioOpen: false,
      audio: [],
      audioMinimized: false,

      videoOpen: false,
      video: [],
    }
  },
  computed: {
    readIndex: function () {
      let day = this.$route.params.day ? this.$route.params.day.toString() : '01'
      if (/^\d{2}-?/g.test(day)) {
        day = day.substring(0, 2)
      }
      return `${this.$route.params.lang}-${this.$route.params.quarter}-${this.$route.params.lesson}-${day}`
    }
  },
  async created() {
    this.emitter.on('auth-logged-in', () => {
      this.readerMounted()
    })
    this.emitter.on('auth-logged-out', () => {
      this.$router.go()
    })
  },
  async mounted() {
    await this.loadQuarterly()
    await this.loadLesson()
    await this.loadAudio()
    await this.loadVideo()
  },
  methods: {
    slugify: function (dayIndex, readId, title, simple) {
      if (simple) {
        return title.toLowerCase().replace(/ /g, "-")
      }
      const DAYS_MAP = new Map([
        ['01', 'Saturday'],
        ['02', 'Sunday'],
        ['03', 'Monday'],
        ['04', 'Tuesday'],
        ['05', 'Wednesday'],
        ['06', 'Thursday'],
        ['07', 'Friday'],
      ])
      let slug

      let dayName = DAYS_MAP.get(readId);
      if (!dayName) {
        slug = `${String(dayIndex).padStart(2, '0')} ${title}`;
      } else {
        slug = `${String(dayIndex).padStart(2, '0')} ${dayName} ${title}`;
      }

      return slug.toLowerCase().replace(/ /g, "-")
    },
    loadQuarterly: async function () {
      const quarterly = await this.$api.get(`${this.$route.params.lang}/quarterlies/${this.$route.params.quarter}/index.json`)
      this.quarterly = quarterly.data
    },
    loadLesson: async function () {
      const lesson = await this.$api.get(`${this.$route.params.lang}/quarterlies/${this.$route.params.quarter}/lessons/${this.$route.params.lesson}/index.json`)
      this.lesson = lesson.data

      let day = this.$route.params.day

      if (!day) {
        let today = DayJS().startOf("day")
        let dayTarget = this.lesson.days.find(x => {
          let dayDate = DayJS(x.date, "DD/MM/YYYY").startOf("day")
          return DayJS(today).isSame(dayDate)
        })
        if (dayTarget) {
          this.$router.push(`/${this.$route.params.lang}/${this.$route.params.quarter}/${this.$route.params.lesson}/${dayTarget.id}`)
        }
      }
      await this.loadDay()
    },
    loadDay: async function () {
      this.loading = true
      let day = this.$route.params.day ? this.$route.params.day.toString() : '01'
      const title = useTitle()

      if (!this.lesson.lesson.pdfOnly) {
        if (/^\d{2}-?/g.test(day)) {
          if (this.lesson.days.length && this.lesson.days[Number(day.substring(0, 2))-1]) {
            day = this.lesson.days[Number(day.substring(0, 2))-1].id
          }
        } else {
          let daySlug = this.slugify(null, null, day, true)
          for (let lessonDayIndex = 1; lessonDayIndex <= this.lesson.days.length; lessonDayIndex++) {
            let lessonDay = this.lesson.days[lessonDayIndex-1]
            if (this.slugify(null, null, lessonDay.title, true) === daySlug) {
              day = String(lessonDayIndex).padStart(2, '0')
              break
            }
          }
        }
        const read = await this.$api.get(`${this.$route.params.lang}/quarterlies/${this.$route.params.quarter}/lessons/${this.$route.params.lesson}/days/${day}/read/index.json`)
        this.read = read.data
        title.value = `${this.read.title} - Sabbath School`

        this.pdfs = this.lesson.pdfs.filter((pdf) => {
          return pdf.target === `${this.$route.params.lang}/${this.$route.params.quarter}/${this.$route.params.lesson}`
        })
      } else {
        this.pdfs = this.lesson.pdfs.filter((pdf) => {
          return pdf.target === `${this.$route.params.lang}/${this.$route.params.quarter}/${this.$route.params.lesson}`
        })
        title.value = `${this.lesson.lesson.title} - Sabbath School`
      }
      this.loading = false
    },
    loadAudio: async function () {
      try {
        const audio = await this.$api.get(`${this.$route.params.lang}/quarterlies/${this.$route.params.quarter}/audio.json`)
        const contentType = audio.headers["content-type"]
        if (contentType && contentType.indexOf("application/json") !== -1) {
          this.audio = audio.data.filter((item) => item.target.startsWith(`${this.$route.params.lang}/${this.$route.params.quarter}/${this.$route.params.lesson}`))
        }
      } catch (e) {}

    },
    loadVideo: async function () {
      try {
        const video = await this.$api.get(`${this.$route.params.lang}/quarterlies/${this.$route.params.quarter}/video.json`)
        const contentType = video.headers["content-type"]
        if (contentType && contentType.indexOf("application/json") !== -1) {
          this.video = video.data
        }
      } catch (e) {}
    },
    loadHighlights: async function () {
      if (!authStore().isLoggedIn) return
      try {
        let r = await this.$apiAuth.get(`/highlights/${this.readIndex}`)
        this.$refs.reader.setHighlights(r.data.highlights)
      } catch (e) {}
    },
    saveHighlights: async function (highlights) {
      if (!authStore().isLoggedIn) return
      try {
        await this.$apiAuth.post(`/highlights`, {
          readIndex: this.readIndex,
          highlights
        })
      } catch (e) {}
    },
    loadComments: async function () {
      if (!authStore().isLoggedIn) return
      try {
        let r = await this.$apiAuth.get(`/comments/${this.readIndex}`)
        this.$refs.reader.setComments(r.data.comments)
      } catch (e) {}
    },
    saveComments: async function (commentsArray) {
      if (!authStore().isLoggedIn) return
      try {
        const comments = Object.keys(commentsArray).map(key => ({
          comment: commentsArray[key],
          elementId: key
        }));
        console.log('SEND>', comments);
        await this.$apiAuth.post(`/comments`, {
          readIndex: this.readIndex,
          comments: comments
        })
      } catch (e) {}
    },
    readerMounted: async function () {
      await this.loadComments()
      await this.loadHighlights()
    }
  },
  head () {
    return {
      meta: [
        {
          name: 'theme-color',
          content: () => this.quarterly ? this.quarterly.quarterly.color_primary : '',
        },
      ],
    }
  }
}
</script>