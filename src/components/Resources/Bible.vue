<template>
  <div class="py-4">
    <Block v-if="this.bibleExcerpt" :block="this.bibleExcerpt"></Block>
  </div>
</template>

<script>
export default {
  props: ['bible', 'verse'],
  data () {
    return {
      bibleExcerpt: null,
    }
  },
  mounted () {
    if (this.bible) {
      this.bibleExcerpt = this.bible[this.verse]
    }
  },
}
</script>