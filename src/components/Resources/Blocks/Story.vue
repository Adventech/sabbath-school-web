<template>
  <div>
    <div
        v-if="currentSlide"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
        class="flex flex-col gap-3">
      <div class="story-slide relative">
        <div
            :class="`story-slide-text-${currentSlide.alignment || 'top'} ${getInlineTextStyle(currentSlide.style).class}`"
            :style="getInlineTextStyle(currentSlide.style).style"
            class="story-slide-text story-slide-text-position">
          <div :style="`height: ${maxHeight}px; max-height: ${maxHeight}px;`">
            <p :style="`margin-top: ${currentOffset}px; ${getInlineTextStyle(currentSlide.style).style}`" :class="getInlineTextStyle(currentSlide.style).class"
               v-if="paragraphText" v-html="paragraphText"></p>
          </div>
        </div>
        <Transition name="fade" mode="out-in">
          <img :src="currentSlide.image" :key="currentSlide.image" class="rounded" />
        </Transition>
        <p ref="hiddenContainer" :style="getInlineTextStyle(currentSlide.style).style" :class="getInlineTextStyle(currentSlide.style).class" class="story-slide-hidden-container story-slide-text-position" v-html="paragraphText"></p>
      </div>
      <div class="flex justify-end">
        <button @click="prevSlide()" class="outline-none"><ArrowLeftCircleIcon class="story-slide-controls" /></button>
        <button @click="nextSlide()" class="outline-none"><ArrowRightCircleIcon class="story-slide-controls" /></button>
      </div>
    </div>

  </div>
</template>

<script>
import { nextTick } from 'vue'
import { marked, renderer } from "@/components/Resources/Renderer.js"
import { getInlineTextStyle } from "@/plugins/Theme/TextStyle.js"
import { ArrowRightCircleIcon, ArrowLeftCircleIcon } from '@heroicons/vue/24/solid'

export default {
  props: ['block', 'parent', 'userInput'],
  components: { ArrowRightCircleIcon, ArrowLeftCircleIcon },
  data () {
    return {
      getInlineTextStyle,
      currentSlideIndex: 0,
      currentTextSlide: 0,

      lineHeight: -1,
      linesPerSlide: 2,

      maxSlides: 0,

      startX: 0,
      startY: 0,
      threshold: 50
    }
  },
  mounted () {
    this.calculateLineHeight();
    window.addEventListener('resize', this.calculateLineHeight)
    window.addEventListener('keydown', this.handleKeyPress)

  },
  beforeUnmount() {
    window.removeEventListener('resize', this.calculateLineHeight)
    window.removeEventListener('keydown', this.handleKeyPress)

  },
  computed: {
    paragraphText () {
      return marked.parse(this.currentSlide.markdown, { renderer })
    },
    currentSlide () {
      return this.block.items[this.currentSlideIndex]
    },
    maxHeight () {
      return this.lineHeight * this.linesPerSlide
    },
    currentOffset () {
      if (!this.lineHeight) return 0
      return -1 * this.lineHeight * this.linesPerSlide * this.currentTextSlide - 5
    },
  },
  methods: {
    async calculateLineHeight() {
      await nextTick()
      const container = this.$refs.hiddenContainer

      if (!container) return

      this.lineHeight = parseFloat(getComputedStyle(container).lineHeight)
      this.maxSlides = Math.ceil(parseFloat(getComputedStyle(container).height) / this.lineHeight / this.linesPerSlide)
    },

    handleKeyPress(event) {
      if (event.key === 'ArrowLeft') {
        this.prevSlide()
      } else if (event.key === 'ArrowRight') {
        this.nextSlide()
      }
    },

    handleTouchStart(event) {
      this.startX = event.touches[0].clientX;
      this.startY = event.touches[0].clientY;
    },

    handleTouchEnd(event) {
      const endX = event.changedTouches[0].clientX;
      const endY = event.changedTouches[0].clientY;

      const dx = endX - this.startX;
      const dy = endY - this.startY;

      if (Math.abs(dx) > this.threshold && Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0) {
          this.prevSlide();
        } else {
          this.nextSlide();
        }
      }
    },

    nextSlide() {
      this.calculateLineHeight()
      if (this.currentTextSlide < this.maxSlides-1) {
        this.currentTextSlide++
      } else if (this.currentSlideIndex < this.block.items.length-1) {
        this.currentSlideIndex++
        this.calculateLineHeight()
        this.currentTextSlide = 0
      }
    },
    prevSlide() {
      this.calculateLineHeight()
      if (this.currentTextSlide > 0) {
        this.currentTextSlide--
      } else if (this.currentSlideIndex > 0) {
        this.currentSlideIndex--
        this.currentTextSlide = 0
      }
    },
  },
}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.story-slide {
  &-text-size {
    @apply md:text-2xl lg:text-3xl xl:text-5xl leading-snug md:leading-9 leading-normal;
  }

  &-text {
    &-position {
      @apply left-4 right-4 lg:left-8 lg:right-8 absolute;
    }

    & > div {
      @apply overflow-hidden;
      & > p {
        @apply story-slide-text-size transition-all ease-in-out;
      }
    }

    &-bottom {
      @apply bottom-4 md:bottom-6 lg:bottom-8;
    }
    &-top {
      @apply top-4 md:top-6 lg:top-8;
    }
  }

  &-controls {
    @apply w-10 h-10 text-gray-600 hover:text-black;
  }

  &-hidden-container {
    @apply invisible top-20 bg-red-200 story-slide-text-size absolute;
  }
}
</style>