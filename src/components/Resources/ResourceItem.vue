<template>
  <div class="flex gap-4 md:gap-8 flex-col md:flex-row px-4">
    <div class="flex flex-col items-center md:items-start">
      <div :class="`resource-item-${resource.kind} flex-none`">
        <img :src="resourceCover" class="resource-item-cover" />

        <div class="hidden md:flex gap-2 flex-col mt-4"
             v-if="resource.credits && resource.credits.length">
          <ResourceCredits :credits="resource.credits" />
        </div>
      </div>
    </div>

    <div class="flex-grow flex flex-col gap-2">
      <div class="w-full flex flex-col gap-2">
        <p :class="['resource-item-title', resourceTitleTextStyle.class, {'resource-item-title-plain': !resource.markdownTitle }]" :style="resourceTitleTextStyle.style" v-html="title"></p>
        <p :class="['resource-item-subtitle', resourceSubtitleTextStyle.class]" :style="resourceSubtitleTextStyle.style" v-html="subtitle"></p>
        <p v-if="resource.description" :class="['resource-item-description', resourceDescriptionTextStyle.class]" :style="resourceDescriptionTextStyle.style" v-html="description"></p>
      </div>
      <TableOfContents :resource="resource" :progress="progress" />

      <FeedGroup v-for="feedGroup in resource.feeds" :feedGroup="feedGroup"></FeedGroup>
    </div>

    <div class="flex md:hidden gap-2 flex-col"
         v-if="resource.credits && resource.credits.length">
      <ResourceCredits :credits="resource.credits" />
    </div>
  </div>
</template>

<script>
import FeedGroup from '@/components/Resources/FeedGroup.vue'
import ResourceCredits from '@/components/Resources/ResourceCredits.vue'
import TableOfContents from '@/components/Resources/TableOfContents.vue'
import { ResourceTitleTextStyle, ResourceSubtitleTextStyle, ResourceDescriptionTextStyle } from "./Style/ResourceTextStyle"

export default {
  components: { FeedGroup, TableOfContents, ResourceCredits },
  props: ['resource', 'progress'],

  mounted () {
    if (this.resource.fonts) {
      for (let font of this.resource.fonts) {
        this.loadFont(font)
      }
    }
  },

  computed: {
    resourceTitleTextStyle () {
      return ResourceTitleTextStyle.getTextStyle(this.resource.style, 'resource.title')
    },

    resourceSubtitleTextStyle () {
      return ResourceSubtitleTextStyle.getTextStyle(this.resource.style, 'resource.subtitle')
    },

    resourceDescriptionTextStyle () {
      return ResourceDescriptionTextStyle.getTextStyle(this.resource.style, 'resource.description')
    },

    title () {
      return this.resource.markdownTitle ?
          ResourceTitleTextStyle.getRenderedInlineText(this.resource.markdownTitle) :
          this.resource.title
    },

    subtitle () {
      return this.resource.markdownSubtitle ?
          ResourceSubtitleTextStyle.getRenderedInlineText(this.resource.markdownSubtitle) :
          this.resource.subtitle
    },

    description () {
      return this.resource.markdownDescription ?
          ResourceSubtitleTextStyle.getRenderedInlineText(this.resource.markdownDescription) :
          this.resource.description
    },

    resourceCover () {
      const coverMap = {
        'book': this.resource.covers.portrait,
        'magazine': this.resource.covers.portrait,
        'devotional': this.resource.covers.square,
        'plan': this.resource.covers.square,
        'blog': this.resource.covers.square,
      }
      return coverMap[this.resource.kind]
    }
  },
  methods: {
    loadFont (font) {
      let style = document.createElement('style');

      let innerHTML = `@font-face {
        font-family: "${font.name}";
        src: url('${font.src}') format('truetype');
        font-weight: ${font.weight};
      }
      `;

      if (!/bold/i.test(font.name)) {
        // Attempt to "search" for the Bold font by adding the style to the inline bold
        innerHTML += `
         .${font.name} strong {
          font-family: "${font.name.replace(/-(Regular|Normal|Roman)/img, '')}-Bold"
         }
        `
      }

      style.innerHTML = innerHTML
      document.head.appendChild(style);
    },
  }
}
</script>

<style lang="scss">
.resource-item {
  &-title {
    @apply text-3xl text-center md:text-start;
    &-plain {
      @apply font-bold;
    }
  }
  &-subtitle {
    @apply text-lg text-gray-500 text-center md:text-start;
  }

  &-description {
    @apply text-center md:text-start;
  }

  &-book, &-magazine {
    @apply w-36 lg:w-40 xl:w-48;
    .resource-item-cover {
      @apply h-56 lg:h-60 xl:h-72 w-36 lg:w-40 xl:w-48 rounded shadow;
    }
  }

  &-devotional, &-plan, &-blog {
    @apply w-40 md:w-44 lg:w-48 xl:w-56 2xl:w-60 flex-none;
    .resource-item-cover {
      @apply h-40 md:h-44 lg:h-48 xl:h-56 2xl:h-60 w-40 md:w-44 lg:w-48 xl:w-56 2xl:w-60 rounded shadow;
    }
  }
}
</style>
