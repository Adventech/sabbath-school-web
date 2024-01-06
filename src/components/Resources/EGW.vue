<template>
  <div class="px-4 py-4">
    <h2 class="font-bold">{{ title }}</h2>
    <div class="egw-content" v-if="egwText" v-html="egwText"></div>
  </div>

</template>

<script>
import { marked, renderer } from "./Renderer"

export default {
  props: ['egwData', 'reference', 'title'],
  data () {
    return {
      egwText: null,
    }
  },
  mounted () {
    this.renderEGWText()
  },
  methods: {
    renderEGWText: function () {
      const ref = this.egwData[this.reference]

      if (ref) {
        this.egwText = marked.parse(ref, { renderer })
      }
    }
  }
}
</script>

<style lang="scss">
.egw-content {
  p {
    @apply mb-3 last:mb-0;
  }
}
</style>