<template>
  <div class="mt-10">
    <div class="flex justify-between">
      <button @click="hasHistory ? $router.go(-1) : $router.push('/')" class="flex items-center rounded hover:bg-ss-primary hover:text-white text-ss-primary pr-2 pl-1 py-1.5">
        <ChevronLeftIcon class="shrink-0 w-3 h-3 mr-1" />
        <span>Go back</span>
      </button>
      <div class="w-1/3">
        <div class="relative">
          <input type="text" v-model="query" class="w-full border border-gray-300 rounded-md shadow-sm py-2 pl-10 pr-3 text-sm placeholder-gray-500 focus:outline-none focus:ring-ss-primary focus:border-ss-primary" placeholder="Search for a language" />
          <div class="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <MagnifyingGlassIcon class="shrink-0 w-3 h-3"  />
          </div>
        </div>
      </div>
    </div>

    <div class="my-10 grid grid-cols-2 lg:grid-cols-4 gap-1">
      <router-link :to="`/${lang.code}`" class="bg-white py-12 px-4 text-center hover:z-10 hover:relative hover:shadow-neutral-300 hover:shadow-2xl" v-for="(lang, i) in filteredLanguages" :key="`language_${i}`">
        <p class="font-bold text-2xl text-gray-500">{{lang.native}}</p>
        <p class="mt-2 text-gray-300">{{lang.en}}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ChevronLeftIcon, MagnifyingGlassIcon } from '@heroicons/vue/24/outline'
import { useLanguageStore } from '@/stores/language'

export default {
  data () {
    return {
      query: '',
      "languages": [
        {
          "native": "English",
          "en": "English",
          "code": "en"
        },
        {
          "native": "Español",
          "en": "Spanish",
          "code": "es"
        },
        {
          "native": "Русский",
          "en": "Russian",
          "code": "ru"
        },
        {
          "native": "Português",
          "en": "Portugese",
          "code": "pt"
        },
        {
          "native": "Українська",
          "en": "Ukrainian",
          "code": "uk"
        },
        {
          "native": "Deutsch",
          "en": "German",
          "code": "de"
        },
        {
          "native": "Français",
          "en": "French",
          "code": "fr"
        },
        {
          "native": "Română",
          "en": "Romanian",
          "code": "ro"
        },
        {
          "native": "Türk",
          "en": "Turkish",
          "code": "tr"
        },
        {
          "native": "Srpski",
          "en": "Serbian",
          "code": "sr"
        },
        {
          "native": "Dansk",
          "en": "Danish",
          "code": "da"
        },
        {
          "native": "Български",
          "en": "Bulgarian",
          "code": "bg"
        },
        {
          "native": "فارسی",
          "en": "Persian",
          "code": "fa"
        },
        {
          "native": "日本語",
          "en": "Japanese",
          "code": "ja"
        },
        {
          "native": "Bahasa Indonesia",
          "en": "Indonesian",
          "code": "in"
        },
        {
          "native": "한국어",
          "en": "Korean",
          "code": "ko"
        },
        {
          "native": "Norsk",
          "en": "Norwegian",
          "code": "no"
        },
        {
          "native": "Bahasa Malaysia",
          "en": "Malay",
          "code": "ms"
        },
        {
          "native": "中文",
          "en": "Chinese",
          "code": "zh"
        },
        {
          "native": "عربى",
          "en": "Arabic",
          "code": "ar"
        },
        {
          "native": "Český",
          "en": "Czech",
          "code": "cs"
        },
        {
          "native": "עִברִית",
          "en": "Hebrew",
          "code": "he"
        },
        {
          "native": "नेपाली",
          "en": "Nepali",
          "code": "ne"
        },
        {
          "native": "Македонски",
          "en": "Macedonian",
          "code": "mk"
        },
        {
          "native": "Eesti Keel",
          "en": "Estonian",
          "code": "et"
        },
        {
          "native": "Viti",
          "en": "Fijian",
          "code": "fj"
        },
        {
          "native": "Magyar",
          "en": "Hungarian",
          "code": "hu"
        },
        {
          "native": "Italiano",
          "en": "Italian",
          "code": "it"
        },
        {
          "native": "ไทย",
          "en": "Thai",
          "code": "th"
        },
        {
          "native": "தமிழ்",
          "en": "Tamil",
          "code": "ta"
        },
        {
          "native": "Afrikaans",
          "en": "Afrikaans",
          "code": "af"
        },
        {
          "native": "Việt",
          "en": "Vietnamese",
          "code": "vi"
        },
        {
          "native": "Ελληνικά",
          "en": "Greek",
          "code": "el"
        },
        {
          "native": "ລາວ",
          "en": "Lao",
          "code": "lo"
        },
        {
          "native": "Polski",
          "en": "Polish",
          "code": "pl"
        },
        {
          "native": "Svenska",
          "en": "Swedish",
          "code": "sv"
        },
        {
          "native": "Lietuviškai",
          "en": "Lithuanian",
          "code": "lt"
        },
        {
          "native": "Sesotho",
          "en": "Sesotho",
          "code": "st"
        },
        {
          "native": "Hrvatski",
          "en": "Croatian",
          "code": "hr"
        },
        {
          "native": "Tagalog",
          "en": "Tagalog",
          "code": "tl"
        },
        {
          "native": "Kiswahili",
          "en": "Swahili",
          "code": "sw"
        },
        {
          "native": "Slovenščina",
          "en": "Slovenian",
          "code": "sl"
        },
        {
          "native": "Монгол хэл",
          "en": "Mongolian",
          "code": "mn"
        },
        {
          "native": "ქართული ენა",
          "en": "Georgian",
          "code": "ka"
        },
        {
          "native": "Slovenčina",
          "en": "Slovak",
          "code": "sk"
        },
        {
          "native": "Íslenska",
          "en": "Icelandic",
          "code": "is"
        },
        {
          "native": "Հայերեն",
          "en": "Armenian",
          "code": "hy"
        },
        {
          "native": "IsiZulu",
          "en": "Zulu",
          "code": "zu"
        },
        {
          "native": "IsiXhosa",
          "en": "Xhosa",
          "code": "xh"
        },
        {
          "native": "हिन्दी",
          "en": "Hindi",
          "code": "hi"
        },
        {
          "native": "Shqiptar",
          "en": "Albanian",
          "code": "sq"
        },
        {
          "native": "Latviešu valoda",
          "en": "Latvian",
          "code": "lv"
        },
        {
          "native": "Nederlandse taal",
          "en": "Dutch",
          "code": "nl"
        },
        {
          "native": "አማርኛ",
          "en": "Amharic",
          "code": "am"
        },
        {
          "native": "සිංහල",
          "en": "Sinhala",
          "code": "si"
        },
        {
          "native": "Ilokano",
          "en": "Ilocano",
          "code": "ilo"
        },
        {
          "native": "Hiligaynon",
          "en": "Hiligaynon",
          "code": "hil"
        },
        {
          "native": "Suomen kieli",
          "en": "Finnish",
          "code": "fi"
        },
        {
          "native": "မြန်မာဘာသာ",
          "en": "Burmese",
          "code": "my"
        },
        {
          "native": "ខ្មែរ",
          "en": "Khmer",
          "code": "km"
        },
        {
          "native": "Malagasy",
          "en": "Malagasy",
          "code": "mg"
        },
        {
          "native": "മലയാളം",
          "en": "Malayalam",
          "code": "ml"
        },
        {
          "native": "ಕನ್ನಡ",
          "en": "Kannada",
          "code": "kn"
        },
        {
          "native": "Batak Toba",
          "en": "Batak Toba",
          "code": "bbc"
        },
        {
          "native": "Kreyòl ayisyen",
          "en": "Haitian Creole",
          "code": "ht"
        },
        {
          "native": "Sinugboanon",
          "en": "Cebuano",
          "code": "ceb"
        },
        {
          "native": "తెలుగు",
          "en": "Telugu",
          "code": "te"
        },
        {
          "native": "Tedim Chin",
          "en": "Tedim Chin",
          "code": "ctd"
        },
        {
          "native": "Mizo ṭawng",
          "en": "Mizo",
          "code": "lus"
        },
        {
          "native": "मराठी",
          "en": "Marathi",
          "code": "mr",
        },
        {
          "native": "ଓଡ଼ିଆ",
          "en": "Odia",
          "code": "or",
        },
        {
          "native": "বাংলা",
          "en": "Bengali",
          "code": "bn",
        },
        {
          "native": "Khasi",
          "en": "Khasi",
          "code": "kha",
        },
        {
          "native": "ગુજરાતી",
          "en": "Gujarathi",
          "code": "gu",
        },
        {
          "native": "Garo",
          "en": "Garo",
          "code": "grt",
        },
        {
          "native": "ကညီကျိာ်",
          "en": "S'gaw Karen",
          "code": "kar",
        },
        {
          "native": "အရှေ့ပိုးကရင်",
          "en": "Pwo Karen",
          "code": "kjp",
        },
        {
          "native": "Jaku Iban",
          "en": "Iban",
          "code": "iba",
        },
        {
          "native": "Lai ṭong",
          "en": "Falam Chin",
          "code": "cfm",
        },
        {
          "native": "Ikinyarwanda",
          "en": "Kinyarwanda",
          "code": "kin",
        },
        {
          "native": "ChiShona",
          "en": "Shona",
          "code": "sn",
        },
        {
          "native": "Ikirundi",
          "en": "Ikirundi",
          "code": "run",
        },
        {
          "native": "Català",
          "en": "Catalan",
          "code": "ca",
        },
        {
          "native": "Twi",
          "en": "Twi",
          "code": "tw",
        },
        {
          "native": "অসমীয়া",
          "en": "Assamese",
          "code": "as",
        },
        {
          "native": "Papiamentu",
          "en": "Papiamento",
          "code": "pap",
        },
        {
          "native": "Lus Hmoob",
          "en": "Hmong",
          "code": "hmn",
        },
        {
          "native": "ትግርኛ",
          "en": "Tigrinya",
          "code": "ti",
        },
        {
          "native": "Afaan Oromoo",
          "en": "Oromo",
          "code": "om",
        },
        {
          "native": "Azərbaycan",
          "en": "Azerbaijani",
          "code": "az",
        },
      ]
    }
  },
  components: { ChevronLeftIcon, MagnifyingGlassIcon },
  computed: {
    hasHistory: function () { return window.history.length > 2 },
    filteredLanguages() {
      const query = this.query.toLowerCase();
      return this.languages.filter(lang => {
        const native = lang.native.toLowerCase();
        const en = lang.en.toLowerCase();
        return native.includes(query) || en.includes(query);
      });
    },
  },
  async mounted() {
    // TODO: fetch API languages, given it has native language value
    // const languages = await this.$api.get('/languages/index.json')
    // this.languages = languages.data
  }
}
</script>