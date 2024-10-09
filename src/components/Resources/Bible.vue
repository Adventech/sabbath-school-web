<template>
  <div class="p-4">
    <Block v-if="this.bibleExcerpt" :block="this.bibleExcerpt" :ignoreStyles="true"></Block>
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