<template>
  <div class="feed-document-item">
    <img :src="feedItemCover" class="feed-document-item-cover" />
    <div class="feed-document-item-text">
      <p class="feed-document-item-title">{{ feedDocumentItem.title }}</p>
      <p class="feed-document-item-subtitle">{{ feedDocumentItem.subtitle }}</p>
      <p class="feed-document-item-parent-resource">{{ feedDocumentItem.parentResource.title }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['feedDocumentItem'],
  computed: {
    feedItemCover: function () {
      return this.feedDocumentItem.parentResource.covers.square
    }
  },
}
</script>

<style lang="scss">
.feed-document-item {
  @apply flex flex-none flex-row items-center gap-6;

  &-cover {
    @apply w-36 md:w-40 h-36 md:h-40 object-cover shadow-xl rounded;
  }
  &-title {
    @apply mt-2 relative z-10 line-clamp-2;
  }
  &-subtitle {
    @apply text-gray-400 text-sm relative z-10 line-clamp-2;
  }
  &-parent-resource {
    @apply italic mt-2 text-gray-700;
  }
}
</style>