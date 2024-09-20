<template>
  <SplideSlide :id="`slide_${block.id}`">
    <div class="slide-content px-16">
      <slot />
    </div>
  </SplideSlide>
</template>

<script>
import '@splidejs/vue-splide/css'
import { SplideSlide } from '@splidejs/vue-splide'
export default {
  components: { SplideSlide },
  props: ['block', 'userInput', 'blockData', 'documentId'],
}
</script>