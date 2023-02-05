<template>
  <div class="reader">
    <div class="ss-wrapper">
      <div :class="{
            'ss-wrapper-andada': readerOptionsStore().font === READER_FONT.ANDADA,
            'ss-wrapper-lato': readerOptionsStore().font === READER_FONT.LATO,
            'ss-wrapper-pt-serif': readerOptionsStore().font === READER_FONT.PTSERIF,
            'ss-wrapper-pt-sans': readerOptionsStore().font === READER_FONT.PTSANS,
            }"
           class="ss-wrapper-font">
        <div :class="{
              'ss-wrapper-tiny': readerOptionsStore().size === READER_SIZE.XS,
              'ss-wrapper-small': readerOptionsStore().size === READER_SIZE.SM,
              'ss-wrapper-medium': readerOptionsStore().size === READER_SIZE.MD,
              'ss-wrapper-large': readerOptionsStore().size === READER_SIZE.LG,
              'ss-wrapper-huge': readerOptionsStore().size === READER_SIZE.XL,
            }"
            class="ss-wrapper-size">
          <div :class="{
            'ss-wrapper-light': readerOptionsStore().theme === READER_THEME.LIGHT || (readerOptionsStore().theme === READER_THEME.AUTO && !darkMode),
            'ss-wrapper-sepia': readerOptionsStore().theme === READER_THEME.SEPIA,
            'ss-wrapper-dark': readerOptionsStore().theme === READER_THEME.DARK || (readerOptionsStore().theme === READER_THEME.AUTO && darkMode),
          }" class="ss-wrapper-theme p-4 md:p-6 lg:p-8 xl:p-10">
            <div v-html="read.content" />
          </div>
        </div>
      </div>
    </div>
  </div>
  <Popup :open="!!bibleVerseRef && bibleOpen" @closed="bibleOpen = false" :noPadding="true">
    <BibleVersion :selectedVersion="bibleVersion" :versions="bibleVersions" @bibleSelected="bibleSelected" />
    <Bible :content="bibleVerse"></Bible>
  </Popup>
</template>

<script>
import $ from 'jquery'
import Popup from '@/components/Popup.vue'
import Bible from '@/components/Reader/Bible.vue'
import BibleVersion from '@/components/Reader/BibleVersion.vue'
import { READER_THEME, READER_FONT, READER_SIZE, readerOptionsStore } from '@/components/Reader/ReaderOptionsStore'

export default {
  props: ['read'],
  components: { Popup, Bible, BibleVersion },
  data () {
    return {
      READER_THEME, READER_FONT, READER_SIZE, readerOptionsStore,
      bibleVersion: null,
      bibleVersions: [],
      bibleVerseRef: null,
      bibleOpen: false
    }
  },
  computed: {
    darkMode: function () {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    },
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

    let timeout = null

    $("code").each(function(i){
      var textarea = $("<textarea class='textarea'/>").attr("id", "input-"+i).on("input propertychange", function(event, isInit) {
        $(this).css({'height': 'auto', 'overflow-y': 'hidden'}).height(this.scrollHeight);
        $(this).next().css({'height': 'auto', 'overflow-y': 'hidden'}).height(this.scrollHeight);

        if (!isInit) {
          var that = this;
          if (timeout !== null) {
            clearTimeout(timeout);
          }
          timeout = setTimeout(function () {
            // SSBridge.onCommentsClick(
            //     ssReader.base64encode($(that).val()),
            //     $(that).attr("id")
            // );
          }, 1000);
        }
      }).focusin(function(){
        // SSBridge.focusin();
      }).focusout(function(){
        // SSBridge.focusout();
      });
      var border = $("<div class='textarea-border' />");
      var container = $("<div class='textarea-container' />");

      $(textarea).appendTo(container);
      $(border).appendTo(container);

      $(this).after(container);
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