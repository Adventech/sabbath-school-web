<template>
  <div>
    <div
        v-if="currentSlide"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
        class="flex flex-col gap-3">
      <div class="story-slide relative">
        <div
            :class="`${getBlockStyleClass(defaultStyles, currentSlide, false, 'block').class} story-slide-text story-slide-text-${currentSlide.alignment || 'top'} ${getInlineTextStyle(currentSlide.style).class} pl-4 pt-4 pb-4 pr-4 md:pl-8 md:pr-8 md:pt-8 md:pb-8`"
            :style="`${getBlockStyleClass(defaultStyles, currentSlide, false, 'block').style};${getInlineTextStyle(currentSlide.style).style}`"
            class="story-slide-text-position w-full">
          <div :class="{'justify-center flex flex-col h-full': maxSlides === 1}" class="" ref="imageSlide" :style="`height: ${maxHeight}px; max-height: ${maxHeight}px;`">
            <p  :style="`height: fit-content; column-gap: 0; width: ${slideWidth*maxSlides}px; column-count:${maxSlides}; opacity: ${isFading ? 0 : 1}; margin-left: -${currentOffsetX}px; ${getInlineTextStyle(currentSlide.style).style}`" :class="getInlineTextStyle(currentSlide.style).class"
               v-if="paragraphText" v-html="paragraphText">

            </p>
          </div>
        </div>
        <div :class="{'hidden': slideImage.image !== currentSlide.image}" v-for="slideImage in block.items">
          <Transition name="fade" mode="out-in">
            <img  :src="slideImage.image" :key="slideImage.image" class=" rounded select-none pointer-events-none w-full" />
          </Transition>
        </div>
        <p ref="hiddenContainer" :style="getInlineTextStyle(currentSlide.style).style" :class="getInlineTextStyle(currentSlide.style).class" class="story-slide-hidden-container story-slide-text-position" v-html="paragraphText"></p>
      </div>
      <div class="story-slide-controls flex items-center justify-between">
        <div>
          <StoryAudio v-if="segment.audio" :audio="segment.audio"></StoryAudio>
        </div>
        <div>
          <button @click="prevSlide()" class="outline-none"><ArrowLeftCircleIcon :class="{'fill-gray-200': currentSlideIndex <= 0}" class="story-slide-controls-arrow" /></button>
          <button @click="nextSlide()" class="outline-none"><ArrowRightCircleIcon :class="{'fill-gray-200': currentSlideIndex === block.items.length-1 && currentTextSlide === maxSlides-1}" class="story-slide-controls-arrow" /></button>
        </div>
      </div>
    </div>

  </div>
</template>

<script>
import { nextTick } from 'vue'
import { marked, renderer } from "@/components/Resources/Renderer.js"
import { getInlineTextStyle } from "@/plugins/Theme/TextStyle.js"
import { ArrowRightCircleIcon, ArrowLeftCircleIcon } from '@heroicons/vue/24/solid'
import { getBlockStyleClass } from "../../../plugins/Theme/BlockStyle"
import StoryAudio from '@/components/Resources/StoryAudio.vue'

export default {
  props: ['block', 'parent', 'userInput'],
  inject: ['getDefaultStyles', 'getSegment'],
  components: { ArrowRightCircleIcon, ArrowLeftCircleIcon, StoryAudio },
  data () {
    return {
      getInlineTextStyle,
      getBlockStyleClass,
      currentSlideIndex: 0,
      currentTextSlide: 0,

      lineHeight: -1,
      linesPerSlide: 3,
      slideWidth: 0,

      maxSlides: 0,

      startX: 0,
      startY: 0,
      threshold: 50,
      isFading: false,
    }
  },
  updated () {
    this.calculateLineHeight()
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
    segment () {
      return this.getSegment()
    },
    defaultStyles () {
      return this.getDefaultStyles()
    },
    paragraphText () {
      return marked.parse(this.currentSlide.markdown, { renderer })
    },
    currentSlide () {
      return this.block.items[this.currentSlideIndex]
    },
    maxHeight () {
      return this.lineHeight * this.linesPerSlide + 3
    },

    currentOffsetX () {
      if (!this.lineHeight) return 0
      return (this.currentTextSlide) * this.slideWidth
    },
  },
  methods: {
    getWidthMinusPadding (element) {
      const style = window.getComputedStyle(element)
      const paddingLeft = parseFloat(style.paddingLeft)
      const paddingRight = parseFloat(style.paddingRight)
      const fullWidth = element.clientWidth

      return fullWidth - paddingLeft - paddingRight
    },
    async calculateLineHeight() {
      await nextTick()
      const container = this.$refs.hiddenContainer

      if (!container) return

      const imageSlide = this.$refs.imageSlide
      this.slideWidth = this.getWidthMinusPadding(imageSlide)

      this.lineHeight = parseFloat(getComputedStyle(container).lineHeight)



      this.maxSlides = Math.ceil((parseFloat(getComputedStyle(container).height) - parseFloat(getComputedStyle(container).paddingBottom) - parseFloat(getComputedStyle(container).paddingTop)) / this.lineHeight / this.linesPerSlide)
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


      this.isFading = true
      setTimeout(() => {
        if (this.currentTextSlide < this.maxSlides-1) {
          this.currentTextSlide++
        } else if (this.currentSlideIndex < this.block.items.length-1) {
          this.currentSlideIndex++
          this.calculateLineHeight()
          this.currentTextSlide = 0
        }
        this.isFading = false
      }, 300);
    },
    prevSlide() {
      this.calculateLineHeight()
      this.isFading = true
      setTimeout(() => {
        if (this.currentTextSlide > 0) {
          this.currentTextSlide--
        } else if (this.currentSlideIndex > 0) {
          this.currentSlideIndex--
          this.currentTextSlide = 0
        }
        this.isFading = false
      }, 300)
    },
  },
}
</script>

<style lang="scss">
.fade-enter-active, .fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}

.story-slide {

  &-text-size {
    @apply text-base sm:leading-tight sm:text-lg md:text-xl lg:text-2xl xl:text-3xl leading-snug md:leading-6 lg:leading-8 xl:leading-9;
  }

  &-text {
    &-position {
      @apply absolute;
    }

    & > div {
      @apply overflow-hidden;
      & > p {
        @apply story-slide-text-size;
        transition: opacity 0.3s ease-in-out;
      }
    }

    &-bottom {
      @apply bottom-0;
    }
    &-top {
      @apply top-0;
    }
  }

  &-controls {
    .plyr__controls {
      background: transparent !important;
      justify-content: flex-start !important;
      padding: 0 !important;

      button {
        margin: 0 !important;
      }

      input {
        color: var(--color-primary);
      }
    }

    &-arrow {
      @apply w-10 h-10 text-gray-600 hover:text-black;
    }
  }

  &-hidden-container {
    @apply top-0 p-4 md:p-8 invisible w-full bg-red-200 story-slide-text-size absolute;
  }
}
</style>