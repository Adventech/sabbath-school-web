<template>
  <div class="markdown" v-html="renderedMarkdown" />
</template>

<script>
import markdownIt from 'markdown-it'

export default {
  props: {
    markdown: {
      type: String,
      required: true,
    }
  },

  setup(props) {
    let md = new markdownIt({ html: true }),
        renderedMarkdown = md.render(props.markdown)

    return {
      renderedMarkdown,
    }
  }
}
</script>

<style lang="scss">
.markdown {
  h1 {
    @apply text-4xl;
    @apply mb-3;
  }
  h2 {
    @apply text-3xl;
    @apply mb-3;
  }
  h3 {
    @apply text-2xl;
    @apply mb-3;
  }
  h4 {
    @apply text-xl;
    @apply mb-3;
  }
  h5 {
    @apply text-lg;
    @apply mb-3;
  }
  p {
    @apply mb-3;
  }
}
</style>