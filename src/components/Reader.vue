<template>
  <div class="reader p-4 md:p-6 lg:p-8 xl:p-10">
    <div class="ss-wrapper">
      <div class="ss-wrapper-font ss-wrapper-lato">
        <div class="ss-wrapper-size ss-wrapper-medium">
          <div class="ss-wrapper-theme ss-wrapper-light">
            <div v-html="read.content" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <Popup :open="!!bibleVerseRef && bibleOpen" @closed="bibleOpen = false">
    <BibleVersion :selectedVersion="bibleVersion" :versions="bibleVersions" @bibleSelected="bibleSelected" />
    <Bible :content="bibleVerse"></Bible>
  </Popup>
</template>

<script>
import $ from 'jquery'
import Popup from '@/components/Popup.vue'
import Bible from '@/components/Reader/Bible.vue'
import BibleVersion from '@/components/Reader/BibleVersion.vue'
export default {
  props: ['read'],
  components: { Popup, Bible, BibleVersion },
  data () {
    return {
      bibleVersion: null,
      bibleVersions: [],
      bibleVerseRef: null,
      bibleOpen: false
    }
  },
  computed: {
    bibleVerse: function () {
      if (!this.read || !this.read.bible || !this.bibleVersion || !this.bibleVerseRef || !this.bibleVersions.length) return null
      for (var version of this.read.bible) {
        if (version.name === this.bibleVersion) {
          return version.verses[this.bibleVerseRef]
        }
      }
      return null
    }
  },
  created () {
    for (var version of this.read.bible) {
      this.bibleVersions.push(version.name)
    }
    // TODO: use store
    if (this.read.bible.length) {
      this.bibleVersion = this.read.bible[0].name
    }
  },
  mounted () {
    const self = this
    $(".verse").click(function(){
      self.bibleVerseRef = $(this).attr("verse")
      self.bibleOpen = true
    });

    $("div.ss-donation-appeal-title").click(function (){
      if ($(".ss-donation-appeal-text").is(":visible")) {
        $(".ss-donation-appeal-title").removeClass("ss-donation-appeal-title-expanded");
        $(".ss-donation-appeal-text").hide();
      } else {
        $(".ss-donation-appeal-title").addClass("ss-donation-appeal-title-expanded");
        $(".ss-donation-appeal-text").show();
      }
    });
  },
  methods: {
    bibleSelected: function (version) {
      this.bibleVersion = version
    }
  }
}
</script>

<style lang="scss">
@import '@/components/Reader/Reader.scss'
</style>