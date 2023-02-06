<template>
  <div v-if="showContextMenu" class="z-10 absolute bg-white shadow drop-shadow-lg rounded p-2 items-center flex" :style="`top: ${y}px; left: ${x}px`">
    <button @click="highlightSelection('green')" class="cursor-pointer hover:bg-gray-200 rounded p-1 w-6 h-6 mr-2"><div class="w-4 h-4 rounded-full bg-green-500"></div></button>
    <button @click="highlightSelection('blue')" class="cursor-pointer hover:bg-gray-200 rounded p-1 w-6 h-6 mr-2"><div class="w-4 h-4 rounded-full bg-blue-500"></div></button>
    <button @click="highlightSelection('yellow')" class="cursor-pointer hover:bg-gray-200 rounded p-1 w-6 h-6 mr-2"><div class="w-4 h-4 rounded-full bg-yellow-500"></div></button>
    <button @click="highlightSelection('orange')" class="cursor-pointer hover:bg-gray-200 rounded p-1 w-6 h-6 mr-2"><div class="w-4 h-4 rounded-full bg-orange-500"></div></button>
    <button @click="unHighlightSelection()" class="cursor-pointer hover:bg-gray-200 rounded p-1 w-6 h-6"><XCircleIcon class="w-4 h-4"></XCircleIcon></button>
  </div>
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
            <div ref="readerContent" v-html="read.content" id="reader-content"/>
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
import { XCircleIcon } from '@heroicons/vue/24/solid'

export default {
  props: ['read'],
  emits: ['saveComments', 'saveHighlights'],
  components: { Popup, Bible, BibleVersion, XCircleIcon },
  data () {
    return {
      READER_THEME, READER_FONT, READER_SIZE, readerOptionsStore,
      bibleVersion: null,
      bibleVersions: [],
      bibleVerseRef: null,
      bibleOpen: false,

      x: 0,
      y: 0,
      showContextMenu: false,
      selectedText: ''
    }
  },
  computed: {
    darkMode: function () {
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    },
    bibleVerse: function () {
      if (!this.read || !this.read.bible || !this.bibleVersion || !this.bibleVerseRef || !this.bibleVersions.length) return null
      for (let version of this.read.bible) {
        if (version.name === this.bibleVersion) {
          return version.verses[this.bibleVerseRef]
        }
      }
      return null
    }
  },
  created () {
    for (let version of this.read.bible) {
      this.bibleVersions.push(version.name)
    }
    // TODO: use store
    if (this.read.bible.length) {
      this.bibleVersion = this.read.bible[0].name
    }
  },
  async mounted () {
    window.addEventListener('mouseup', this.onMouseup)
    const self = this

    try {
      await this.loadScript(`/assets/js/rangy/rangy-core.js`)
      await this.loadScript(`/assets/js/rangy/rangy-classapplier.js`)
      await this.loadScript(`/assets/js/rangy/rangy-highlighter.js`)
      await this.loadScript(`/assets/js/rangy/rangy-serializer.js`)

      $(function() {
        rangy.init();

        window.highlighter = rangy.createHighlighter();

        window.getHighlighterRangeOffset = function () {
          if (window.highlighter) {
            const converter = window.highlighter.converter;
            const pageContainer = window.document.querySelector(
                '#reader-content'
            );
            if (pageContainer) {
              const containerRange = rangy.createRange(document);
              if (containerRange) {
                containerRange.setStart(pageContainer, 0);
                const containerCharRange = converter.rangeToCharacterRange(
                    containerRange
                );
                const rangeOffset = containerCharRange.start;
                return parseInt(rangeOffset, 10) - 8;
              }
            }
          }
          return 0;
        }

        window.appliers = {
          "orange": rangy.createClassApplier("highlight_orange", {
            ignoreWhiteSpace: true,
            tagNames: ["span", "a"]
          }),

          "yellow": rangy.createClassApplier("highlight_yellow", {
            ignoreWhiteSpace: true,
            tagNames: ["span", "a"]
          }),

          "green": rangy.createClassApplier("highlight_green", {
            ignoreWhiteSpace: true,
            tagNames: ["span", "a"]
          }),

          "blue": rangy.createClassApplier("highlight_blue", {
            ignoreWhiteSpace: true,
            tagNames: ["span", "a"]
          }),

          "underline": rangy.createClassApplier("highlight_underline", {
            ignoreWhiteSpace: true,
            tagNames: ["span", "a"]
          })
        }
        window.highlighter.addClassApplier(window.appliers["orange"]);
        window.highlighter.addClassApplier(window.appliers["yellow"]);
        window.highlighter.addClassApplier(window.appliers["green"]);
        window.highlighter.addClassApplier(window.appliers["blue"]);
        window.highlighter.addClassApplier(window.appliers["underline"]);
      })
    } catch (e) {}

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
      let textarea = $("<textarea class='textarea'/>").attr("id", "input-"+i).on("input propertychange", function(event, isInit) {
        $(this).css({'height': 'auto', 'overflow-y': 'hidden'}).height(this.scrollHeight);
        $(this).next().css({'height': 'auto', 'overflow-y': 'hidden'}).height(this.scrollHeight);

        if (!isInit) {
          let that = this;
          if (timeout !== null) {
            clearTimeout(timeout);
          }
          timeout = setTimeout(function () {
            self.saveComments($(that).val(), $(that).attr("id"))
          }, 2000);
        }
      });

      let border = $("<div class='textarea-border' />");
      let container = $("<div class='textarea-container' />");

      $(textarea).appendTo(container);
      $(border).appendTo(container);

      $(this).after(container);
    });
  },
  beforeDestroy () {
    window.removeEventListener('mouseup', this.onMouseup)
  },
  methods: {
    loadScript: function (url) {
      return new Promise((resolve, reject) => {
        let script = document.createElement("script")
        script.setAttribute("src", url)
        script.onload = () => { resolve() }
        script.onerror = () => { reject() }
        document.head.appendChild(script)
      })
    },
    bibleSelected: function (version) {
      this.bibleVersion = version
    },
    onMouseup () {
      const selection = window.getSelection()
      const startNode = selection.getRangeAt(0).startContainer
      const endNode = selection.getRangeAt(0).endContainer
      if (!this.$refs.readerContent.contains(startNode) || !this.$refs.readerContent.contains(endNode)) {
        this.showContextMenu = false
        return
      }
      const { x, y, width } = selection.getRangeAt(0).getBoundingClientRect()
      if (!width) {
        this.showContextMenu = false
        return
      }

      this.x = x + (width / 2) - 60
      this.y = y + window.scrollY - 40
      this.showContextMenu = true
      this.selectedText = selection.toString()
    },

    unHighlightSelection: function () {
      window.highlighter.unhighlightSelection()
      this.clearSelection()
      this.showContextMenu = false
      this.onHighlightComplete()
    },

    highlightSelection: function (color) {
      window.highlighter.highlightSelection("highlight_" + color)
      this.clearSelection()
      this.showContextMenu = false
      this.onHighlightComplete()
    },

    onHighlightComplete: function () {
      let highlights = window.highlighter.serialize()
      const highLighParts = highlights.split('|');
      const module = highLighParts[0];

      if (module && module === 'type:textContent') {
        const highlightContainerOffset = window.getHighlighterRangeOffset()
        let ranges = highLighParts.filter((part, index) => index > 0)
        if (ranges && ranges.filter((x) => x).length > 0) {
          ranges = ranges.map((range) => {
            const rangeParts = range.split('$')
            rangeParts[0] = (parseInt(rangeParts[0], 10) - highlightContainerOffset).toString()
            rangeParts[1] = (parseInt(rangeParts[1], 10) - highlightContainerOffset).toString()
            return rangeParts.join('$')
          })
          this.$emit('saveHighlights', 'type:textContent|' + ranges.join('|'))
        }
      }
    },

    clearSelection: function(){
      if (window.getSelection) {
        if (window.getSelection().empty) {  // Chrome
          window.getSelection().empty();
        } else if (window.getSelection().removeAllRanges) {  // Firefox
          window.getSelection().removeAllRanges();
        }
      } else if (document.selection) {  // IE?
        document.selection.empty();
      }
    },

    saveComments: function (comment, elementId) {
      this.$emit('saveComments', comment, elementId)
    },
    setComments: function (comments) {
      comments.map(c => $(`#${c.elementId}`).val(c.comment).trigger("input", ["true"]))
    },
    setHighlights: function (highlights) {
      if (!highlights.length) return
      try {
        window.highlighter.removeAllHighlights();

        const highLighParts = highlights.split('|');
        const module = highLighParts[0];

        if (module && module === 'type:textContent') {
          const highlightContainerOffset = window.getHighlighterRangeOffset();
          let ranges = highLighParts.filter((part, index) => index > 0);
          if (ranges && ranges.filter((x) => x).length > 0) {
            ranges = ranges.map((range) => {
              const rangeParts = range.split('$');
              rangeParts[0] = (
                  parseInt(rangeParts[0], 10) + highlightContainerOffset
              ).toString();
              rangeParts[1] = (
                  parseInt(rangeParts[1], 10) + highlightContainerOffset
              ).toString();
              return rangeParts.join('$');
            });

            highlights = 'type:textContent|' + ranges.join('|');
          }
        }

        window.highlighter.deserialize(highlights);
      } catch(err){
        console.error(err)
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/components/Reader/Reader.scss'
</style>