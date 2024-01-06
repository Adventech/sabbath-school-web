<template>
  <Splide @splide:move="slideChanged" @splide:resize="carouselResized" :id="`carousel_${block.id}`" :options="{ drag: false, pagination: true, autoHeight: true }">
    <slot />
  </Splide>
</template>

<script>
import '@splidejs/vue-splide/css'
import { Splide } from '@splidejs/vue-splide'
import $ from "jquery"

export default {
  components: { Splide },
  props: ['block', 'userInput', 'blockData', 'documentId'],
  data () {
    return {
      slideMoved: false
    }
  },
  mounted () {
    this.setCarouselHeight(null, 1)
    this.setInterval(() => {
      this.setCarouselHeight(null, 1)
    },
    100, 10)
  },
  methods: {
    // TODO: this is very ugly, but need to make sure carousel resizes depending on the slide content
    setInterval: function(callback, delay, repetitions) {
      let x = 0
      let self = this
      let intervalID = window.setInterval(function () {

        if ((++x === repetitions) || self.slideMoved) {
          window.clearInterval(intervalID);
        } else {
          callback()
        }
      }, delay < 1000 ? delay * 2 : delay);
    },
    setCarouselHeight: function (splideInstance, slidePosition) {
      const extraHeight = 80
      $(`.splide, .splide__track`).height(
          $(`.splide__list li:nth-child(${slidePosition}) .slide-content`).height() + extraHeight
      )
    },
    carouselResized: function (splideInstance) {
      this.setCarouselHeight(splideInstance, splideInstance.index + 1)
    },
    slideChanged: function (splideInstance, newSlidePosition) {
      this.slideMoved = true
      this.setCarouselHeight(splideInstance, newSlidePosition + 1)
    }
  }
}
</script>

<style lang="scss">
.splide__pagination .is-active {
  @apply bg-gray-400;
}
</style>