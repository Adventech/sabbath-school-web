<template>
  <div class="flex gap-4 md:gap-8 flex-col md:flex-row">
    <div class="flex flex-col items-center md:items-start">
      <div :class="`resource-item-${resource.kind} flex-none`">
        <img :src="resourceCover" class="resource-item-cover" />

        <div class="hidden md:flex gap-2 flex-col mt-4"
             v-if="resource.credits && resource.credits.length">
          <div v-for="credit in resource.credits">
            <p class="text-gray-500 font-bold text-sm">{{ credit.name }}</p>
            <p class="text-gray-500 text-sm">{{ credit.value }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-grow flex flex-col gap-2">
      <div class="w-full flex flex-col gap-2">
        <p class="resource-item-title text-center md:text-start">{{ resource.title }}</p>
        <p class="resource-item-subtitle">{{ resource.subtitle }}</p>
        <p v-if="resource.description" class="resource-item-description">{{ resource.description }}</p>
      </div>
      <TableOfContents :resource="resource" :progress="progress" />

      <FeedGroup v-for="feedGroup in resource.feeds" :feedGroup="feedGroup"></FeedGroup>
    </div>

    <div class="flex md:hidden gap-2 flex-col"
         v-if="resource.credits && resource.credits.length">
      <div v-for="credit in resource.credits">
        <p class="text-gray-500 font-bold text-sm">{{ credit.name }}</p>
        <p class="text-gray-500 text-sm">{{ credit.value }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import FeedGroup from '@/components/Resources/FeedGroup.vue'
import TableOfContents from '@/components/Resources/TableOfContents.vue'

export default {
  components: { FeedGroup, TableOfContents },
  props: ['resource', 'progress'],
  computed: {
    resourceCover: function () {
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
  created () {
    // select default section based on the resource kind
    // if sectionView === dropdown
  },
}
</script>

<style lang="scss">
.resource-item {
  &-title {
    @apply text-3xl font-bold;
  }
  &-subtitle {
    @apply text-gray-500;
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
