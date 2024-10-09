<template>
  <div>
    <!-- Full screen story -->
    <Dialog :open="fullScreen">
      <DialogPanel tabindex="0">
        <div
            @touchstart="handleTouchStart"
            @touchend="handleTouchEnd"
            class="z-20 fixed top-0 bottom-0 right-0 left-0 bg-black text-white">
          <!-- Controls -->
          <div class="absolute top-0 bottom-0 right-0 left-0 z-30">
            <div class="absolute story-slide-controls top-5 right-5 flex justify-end gap-2 flex-row bg-black/20 p-2 rounded">
              <StoryAudio v-if="segment.audio" :audio="segment.audio"></StoryAudio>
              <Bars3BottomLeftIcon @click="fullScreenCaptionsShown = !fullScreenCaptionsShown" class="h-8 fill-white/80 hover:fill-white transition-all	cursor-pointer" />
              <XMarkIcon @click="fullScreen=false" class="h-8 fill-white/80 hover:fill-white transition-all	cursor-pointer" />
            </div>
            <button :class="{'invisible opacity-0': isFullScreenFirstSlide}" @click="prevSlide()" class="transition-all	absolute left-5 transform -translate-y-1/2 top-1/2 outline-none"><ArrowLeftCircleIcon  class="text-white/30 w-10 md:w-20 h-20 md:h-20 hover:text-white transition-all" /></button>
            <button :class="{'invisible opacity-0': isFullScreenLastSlide}" @click="nextSlide()" class="transition-all	absolute right-5 transform -translate-y-1/2 top-1/2 outline-none"><ArrowRightCircleIcon class="text-white/30 w-10 md:w-20 h-20 md:h-20 hover:text-white transition-all" /></button>
          </div>

          <div ref="fullScreenPanel" class="h-screen flex justify-center relative">
            <div class="relative">
              <div class="absolute w-auto story-slide-text"

                   :class="['overflow-hidden story-slide-padding', `${textStyleFullScreen.class}`, {'invisible': !fullScreenCaptionsShown}]"
                   :style="`${blockStyleFullScreen.style}; ${textStyleFullScreen.style}; ${fullScreenCurrentSlide.alignment}: ${fullScreenCaptionMargin}px; width: ${fullScreenImageWidthWithPadding}px; height: ${fullScreenMaxHeightWithPadding}px; overflow:hidden`">
                <div>
                      <p  class="story-slide-text-size"
                          :style="`height: ${fullScreenMaxHeight}px; column-gap:0px;width: ${fullScreenImageWidth*fullScreenMaxSlides}px; column-count:${fullScreenMaxSlides}; opacity: ${fullScreenIsFading ? 0 : 1}; margin-left: -${fullScreenCurrentOffsetX}px; ${textStyleFullScreen.style}`"
                          :class="[{'justify-center flex flex-col h-full': fullScreenMaxSlides === 1}]"
                          v-if="fullScreenParagraphText" v-html="fullScreenParagraphText">

                  </p>
                </div>
              </div>

              <div :class="{'hidden': slideImage.image !== fullScreenCurrentSlide.image}" v-for="slideImage in block.items">
                  <img
                      ref="imageRef"
                      @load="calculateFullScreenCaptionMargin()"
                      :src="slideImage.image" :key="slideImage.image"
                      class="h-screen w-auto object-contain select-none" />
              </div>

              <div class=" story-slide-padding absolute top-0 w-full">
              <p ref="hiddenContainerFullScreen"
                 :style="`${blockStyleFullScreen.style}; ${textStyleFullScreen.style}`"
                 :class="['story-slide-hidden-container-fullscreen story-slide-padding']"
                 v-html="fullScreenParagraphText"></p>
              </div>
            </div>
          </div>
        </div>
      </DialogPanel>
    </Dialog>

    <!-- Inline story -->
    <div
        v-if="currentSlide"
        @touchstart="handleTouchStart"
        @touchend="handleTouchEnd"
        class="flex flex-col gap-3">
      <div class="story-slide relative flex flex-row justify-center">
        <div
            :class="`story-slide-text story-slide-text-${currentSlide.alignment || 'top'} ${textStyle.class} story-slide-padding`"
            :style="`max-width: ${slideWidth}px; ${blockStyle.style}; ${textStyle.style}`"
            class="story-slide-text-position">
          <div :class="{'justify-center flex flex-col': maxSlides === 1}" ref="imageSlide">
            <p :style="`column-gap: 0; width: ${slideWidthWithoutPadding*maxSlides}px; column-count:${maxSlides}; opacity: ${isFading ? 0 : 1}; margin-left: -${currentOffsetX}px;`"
               v-if="paragraphText" v-html="paragraphText">
            </p>
          </div>
        </div>

        <div :class="{'hidden opacity-0': slideImage.image !== currentSlide.image}" v-for="slideImage in block.items" :key="slideImage.image">
          <transition name="fade">
          <img
              ref="imageRefInline"
              @load="calculateLineHeight"
              :src="slideImage.image" :key="slideImage.image"
              :class="[
                  {'max-h-[500px] md:max-h-[600px] lg:max-h-[700px] xl:max-h-[900px]': isLandscape},
                  {'max-h-[400px] md:max-h-[500px] lg:max-h-[500px] xl:max-h-[600px]': !isLandscape},
              ]"
              class="mx-auto rounded select-none object-contain pointer-events-none" />
          </transition>
        </div>

        <p ref="hiddenContainer"
           :style="`max-width: ${slideWidth}px; ${blockStyle.style}; ${textStyle.style}`"
           :class="[textStyle.class]"
           class="story-slide-hidden-container story-slide-padding story-slide-text-position" v-html="paragraphText"></p>
      </div>
      <div class="story-slide-controls flex items-center justify-end">
        <div>
          <button @click="prevSlide()" class="outline-none"><ArrowLeftCircleIcon :class="{'fill-gray-200': isFirstSlide}" class="story-slide-controls-arrow" /></button>
          <button @click="nextSlide()" class="outline-none"><ArrowRightCircleIcon :class="{'fill-gray-200': isLastSlide}" class="story-slide-controls-arrow" /></button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { nextTick } from 'vue'
import { ArrowRightCircleIcon, ArrowLeftCircleIcon, Bars3BottomLeftIcon, XMarkIcon } from '@heroicons/vue/24/solid'
import { Dialog, DialogPanel } from '@headlessui/vue'

import StoryAudio from '@/components/Resources/StoryAudio.vue'
import { BlockStyle } from "../Style/BlockStyle"

export default {
  props: ['block', 'parent', 'userInput'],
  inject: ['getDefaultStyles', 'getSegment', 'getStyle'],
  components: { ArrowRightCircleIcon, ArrowLeftCircleIcon, StoryAudio, Dialog, DialogPanel, Bars3BottomLeftIcon, XMarkIcon },
  data () {
    return {
      lineHeight: -1,
      linesPerSlide: 3,

      currentSlideIndex: 0,
      currentTextSlide: 0,
      slideWidth: 0,
      slideWidthWithoutPadding: 0,
      maxSlides: 0,
      isLandscape: false,

      startX: 0,
      startY: 0,
      threshold: 50,

      isFading: false,

      // fullscreen
      fullScreen: false,
      fullScreenLineHeight: 0,
      fullScreenCaptionMargin: 0,
      fullScreenImageWidth: 0,
      fullScreenImageWidthWithPadding: 0,
      fullScreenImageHeight: 0,
      fullScreenCurrentSlideIndex: 0,
      fullScreenCurrentTextSlide: 0,
      fullScreenMaxSlides: 0,
      fullScreenMaxHeight: 0,
      fullScreenMaxHeightWithPadding: 0,
      fullScreenIsFading: false,
      fullScreenCaptionsShown: true,
    }
  },
  updated () {
    this.calculateLineHeight()
  },
  mounted () {
    this.calculateLineHeight();
    window.addEventListener('resize', this.calculateLineHeight)
    window.addEventListener('resize', this.calculateFullScreenCaptionMargin)
    window.addEventListener('keydown', this.handleKeyPress)
    this.emitter.on('enterFullScreen', () => {
      this.fullScreen = true
    })
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.calculateLineHeight)
    window.removeEventListener('resize', this.calculateFullScreenCaptionMargin)
    window.removeEventListener('keydown', this.handleKeyPress)
  },
  computed: {
    segment () {
      return this.getSegment()
    },

    defaultStyles () {
      return this.getDefaultStyles()
    },

    style () {
      return this.getStyle()
    },

    currentSlide () {
      return this.block.items[this.currentSlideIndex]
    },

    fullScreenCurrentSlide () {
      return this.block.items[this.fullScreenCurrentSlideIndex]
    },

    isFirstSlide () {
      return this.currentSlideIndex <= 0
    },

    isLastSlide () {
      return this.currentSlideIndex === this.block.items.length - 1 &&
          this.currentTextSlide === this.maxSlides - 1
    },

    isFullScreenFirstSlide () {
      return this.fullScreenCurrentSlideIndex <= 0
    },

    isFullScreenLastSlide () {
      return this.fullScreenCurrentSlideIndex === this.block.items.length - 1 &&
          this.fullScreenCurrentTextSlide === this.fullScreenMaxSlides - 1
    },

    maxHeight () {
      return this.lineHeight * this.linesPerSlide
    },

    currentOffsetX () {
      if (!this.lineHeight) return 0
      return (this.currentTextSlide) * this.slideWidthWithoutPadding
    },

    fullScreenCurrentOffsetX () {
      if (!this.fullScreenLineHeight) return 0
      return (this.fullScreenCurrentTextSlide) * this.fullScreenImageWidth
    },

    paragraphText () {
      return BlockStyle.getRenderedInlineText(this.currentSlide.markdown)
    },

    textStyle () {
      return BlockStyle.getTextStyle(this.style?.blocks, '', this.currentSlide)
    },

    blockStyle () {
      return BlockStyle.getElementStyle(this.style?.blocks, 'block', this.currentSlide)
    },

    fullScreenParagraphText () {
      return BlockStyle.getRenderedInlineText(this.fullScreenCurrentSlide.markdown)
    },

    textStyleFullScreen () {
      return BlockStyle.getTextStyle(this.style?.blocks, '', this.fullScreenCurrentSlide)
    },

    blockStyleFullScreen () {
      return BlockStyle.getElementStyle(this.style?.blocks, 'block', this.fullScreenCurrentSlide)
    },
  },
  methods: {
    async calculateFullScreenCaptionMargin () {
      await nextTick()

      const container = this.$refs.hiddenContainerFullScreen
      const image = this.$refs.imageRef[this.fullScreenCurrentSlideIndex]

      if (!image) { return }

      let trueHeight = image.naturalHeight
      let trueWidth = image.naturalWidth
      let trueAspect = trueWidth / trueHeight

      let imageWidth = parseFloat(getComputedStyle(image).width)

      let imageWidthNatural = image.clientWidth
      let imageHeight = image.clientHeight

      let imageContentHeight = imageWidthNatural / trueAspect

      this.fullScreenImageWidth = imageWidth - parseFloat(getComputedStyle(container).paddingLeft) - parseFloat(getComputedStyle(container).paddingRight)
      this.fullScreenImageWidthWithPadding = imageWidth
      this.fullScreenLineHeight = parseFloat(getComputedStyle(container).lineHeight)

      this.fullScreenMaxHeight = this.fullScreenLineHeight * this.linesPerSlide + 10
      this.fullScreenMaxHeightWithPadding = this.fullScreenMaxHeight + parseFloat(getComputedStyle(container).paddingTop) + parseFloat(getComputedStyle(container).paddingBottom)

      this.fullScreenMaxSlides = Math.ceil((parseFloat(getComputedStyle(container).height) - parseFloat(getComputedStyle(container).paddingBottom) - parseFloat(getComputedStyle(container).paddingTop)) / this.fullScreenLineHeight / this.linesPerSlide)

      this.fullScreenCaptionMargin = (imageHeight > imageContentHeight) ?  (imageHeight - imageContentHeight)/2 : 0
    },

    async calculateLineHeight() {
      await nextTick()
      const container = this.$refs.hiddenContainer

      if (!container) return

      const imageSlide = this.$refs.imageRefInline[this.currentSlideIndex]
      this.slideWidth = parseFloat(getComputedStyle(imageSlide).width)
      this.isLandscape = parseFloat(getComputedStyle(imageSlide).width) > parseFloat(getComputedStyle(imageSlide).height)
      this.slideWidthWithoutPadding = this.slideWidth - parseFloat(getComputedStyle(container).paddingLeft) -parseFloat(getComputedStyle(container).paddingRight)

      this.lineHeight = parseFloat(getComputedStyle(container).lineHeight)
      this.maxSlides = Math.ceil((parseFloat(getComputedStyle(container).height) - parseFloat(getComputedStyle(container).paddingBottom) - parseFloat(getComputedStyle(container).paddingTop)) / this.lineHeight / this.linesPerSlide)
    },

    handleKeyPress(event) {
      if (event.key === 'Escape' && this.fullScreen) {
        this.fullScreen = false
      } else if (event.key === 'ArrowLeft') {
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
      if (this.fullScreen) {
        if (this.isFullScreenLastSlide) {
          return
        }
        this.fullScreenIsFading = true
        setTimeout(() => {
          if (this.fullScreenCurrentTextSlide < this.fullScreenMaxSlides-1 && this.fullScreenCaptionsShown) {
            this.fullScreenCurrentTextSlide++
          } else if (this.fullScreenCurrentSlideIndex < this.block.items.length-1) {
            this.fullScreenCurrentSlideIndex++
            this.fullScreenCurrentTextSlide = 0
          }
          this.fullScreenIsFading = false
          this.calculateFullScreenCaptionMargin()
        }, 300)
      } else {
        if (this.isLastSlide) {
          return
        }
        this.calculateLineHeight()
        this.isFading = true
        setTimeout(() => {
          if (this.currentTextSlide < this.maxSlides-1 && this.fullScreenCaptionsShown) {
            this.currentTextSlide++
          } else if (this.currentSlideIndex < this.block.items.length-1) {
            this.currentSlideIndex++
            this.calculateLineHeight()
            this.currentTextSlide = 0
          }
          this.isFading = false
        }, 300);
        this.calculateLineHeight()
      }
    },

    prevSlide() {
      if (this.fullScreen) {
        if (this.isFullScreenFirstSlide) {
          return
        }
        this.fullScreenIsFading = true
        setTimeout(() => {
          if (this.fullScreenCurrentTextSlide > 0) {
            this.fullScreenCurrentTextSlide--
          } else if (this.fullScreenCurrentSlideIndex > 0) {
            this.fullScreenCurrentSlideIndex--
            this.fullScreenCurrentTextSlide = 0
          }
          this.calculateFullScreenCaptionMargin()
          this.fullScreenIsFading = false
        }, 300)

      } else {
        if (this.isFirstSlide) {
          return
        }
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
      }
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

.story-slide-padding {
  @apply p-2 #{!important};
  @apply sm:p-3 #{!important};
  @apply md:p-4 #{!important};
  @apply lg:p-5 #{!important};
  @apply xl:p-5 #{!important};
}

.story-slide {

  &-text-size {
    @apply
    text-base leading-4
    sm:text-base sm:leading-5
    md:text-lg md:leading-5
    lg:text-xl lg:leading-7
    xl:text-2xl xl:leading-8;
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
    .plyr {
      @apply w-10 #{!important};
    }
    .plyr__controls {
      @apply w-10 #{!important};
      background: transparent !important;
      justify-content: flex-start !important;
      padding: 0 !important;

      button {
        margin: 0 !important;
        @apply text-white/80;
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
    @apply top-0 p-4 md:p-8 invisible w-full bg-red-200/80 story-slide-text-size absolute;
  }

  &-hidden-container-fullscreen {
    @apply absolute invisible top-0 left-0 bg-red-400/20 w-full story-slide-text-size right-0;
  }
}
</style>