<template>
  <div class="mt-10">
    <div class="flex">
      <router-link :to="'/'" class="flex items-center rounded hover:bg-ss-primary hover:text-white text-ss-primary pr-2 pl-1 py-1.5 ">
        <ChevronLeftIcon class="shrink-0 w-3 h-3 mr-1" />
        <span>Go back</span>
      </router-link>
    </div>

    <div class="my-10 grid grid-cols-2 lg:grid-cols-4 gap-1">
      <router-link :to="`/${lang.code}`" class="bg-white py-12 px-4 text-center hover:z-10 hover:relative hover:shadow-neutral-300 hover:shadow-2xl" v-for="(lang, i) in languages" :key="`language_${i}`">
        <p class="font-bold text-2xl text-gray-500">{{lang.native}}</p>
        <p class="mt-2 text-gray-300">{{lang.en}}</p>
      </router-link>
    </div>
  </div>
</template>

<script>
import { ChevronLeftIcon } from '@heroicons/vue/outline'
export default {
  data () {
    return {
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
      ]
    }
  },
  components: { ChevronLeftIcon },
  async mounted() {
    // TODO: fetch API languages, given it has native language value
    // const languages = await this.$api.get('/languages/index.json')
    // this.languages = languages.data
  }
}
</script>