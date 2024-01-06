<template>
  <div>
    <BibleVersion v-if="bibleVersion" :selectedVersion="bibleVersion" :versions="bible.map(b => b.name)" @bibleSelected="bibleVersionSelected" />
    <div class="px-4 pb-4" v-if="bibleText" v-html="bibleText"></div>
  </div>

</template>

<script>
import { marked, renderer } from "./Renderer"
import BibleVersion from "./BibleVersion.vue"

export default {
  props: ['bible', 'verse'],
  components: { BibleVersion },
  data () {
    return {
      bibleText: null,
      bibleVersion: null,
    }
  },
  mounted () {
    if (this.bible.length) {
      this.bibleVersion = this.bible[0].name
      this.renderBibleText()
    }
  },
  methods: {
    bibleVersionSelected: function (version) {
      this.bibleVersion = version
      this.renderBibleText()
    },
    renderBibleText: function () {
      const bible = this.bible.find(b => b.name === this.bibleVersion)
      const verse = bible.verses[this.verse]

      if (verse) {
        this.bibleText = marked.parse(verse, { renderer })
      }
    }
  }
}
</script>