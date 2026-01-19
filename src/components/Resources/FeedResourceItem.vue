<template>
  <div :class="`feed-item feed-item-${view} feed-item-${view}-${direction}`">
    <img :src="feedItemCover" class="feed-item-cover" />
    <div class="feed-item-text">
      <p class="feed-item-title">{{ feedItem.title }}</p>
      <p class="feed-item-subtitle">{{ feedItem.subtitle }}</p>
    </div>
  </div>
</template>

<script>
export default {
  props: ['feedItem', 'view', 'direction'],
  computed: {
    feedItemCover: function () {
      const coverMap = {
        'folio': this.feedItem.covers.portrait,
        'square': this.feedItem.covers.square,
        'tile': this.feedItem.covers.landscape,
        'banner': this.feedItem.covers.landscape,
      }
      return coverMap[this.view]
    }
  }
}
</script>

<style lang="scss">
.feed-item {
  @apply flex flex-none overflow-visible;

  &-cover {
    @apply shadow-xl rounded;
  }
  &-title {
    @apply mt-2 relative z-10 line-clamp-2;
  }
  &-subtitle {
    @apply text-gray-500 text-sm relative z-10 line-clamp-2;
  }

  &[class*="-square-horizontal"],
  &[class*="-tile-horizontal"],
  &[class*="-folio-horizontal"] {
    .feed-item-title {
      @apply xl:text-lg;
    }
    .feed-item-subtitle {
      @apply xl:text-base;
    }
  }

  &[class*="-square-vertical"],
  &[class*="-tile-vertical"],
  &[class*="-folio-vertical"] {
    .feed-item-title {
      @apply lg:text-lg xl:text-xl;
    }
    .feed-item-subtitle {
      @apply lg:text-base xl:text-lg;
    }
  }

  &-square {
    &-horizontal {
      @apply flex-col w-40 md:w-44 lg:w-48 xl:w-56 2xl:w-60 flex-none;
      .feed-item-cover {
        @apply h-40 md:h-44 lg:h-48 xl:h-56 2xl:h-60;
      }
    }

    &-vertical {
      @apply flex-row items-center gap-4;
      .feed-item-cover {
        @apply h-24 md:h-28 lg:h-32 xl:h-36 w-24 md:w-28 lg:w-32 xl:w-36;
      }
    }
  }

  &-tile {
    .feed-item-cover {
      @apply h-36 w-64;
    }
    &-horizontal {
      @apply flex-col flex-none w-64;
      .feed-item-cover {
        @apply w-full;
      }
    }
    &-vertical {
      @apply flex-row items-center gap-4;
    }
  }

  &-folio {
    .feed-item-cover {
      @apply h-52 lg:h-56 xl:h-60 w-36 lg:w-40 xl:w-44;
    }
    &-horizontal {
      @apply flex-col flex-none w-36 lg:w-40 xl:w-44;
    }
    &-vertical {
      @apply flex-row items-center gap-4;
    }
  }

  &-banner {
    @apply relative h-36 w-64;

    .feed-item-title {
      @apply m-0 text-base;
    }

    .feed-item-subtitle {
      @apply text-sm;
    }

    &-horizontal {
      @apply flex-col flex-none mb-6;
    }
    &-vertical {
      @apply flex-row items-center gap-4;
      .feed-item-text {
        &:after {
          @apply mr-3.5;
        }
      }
    }

    .feed-item-cover {
      @apply h-36 w-64;
    }

    .feed-item-text {
      @apply absolute px-3 py-2 bottom-0 w-64;
      &:after {
        @apply backdrop-blur absolute rounded;
        content: ' ';
        inset: 0 0 0 0;
        z-index: 0;
        -webkit-mask: linear-gradient(to bottom, transparent, black 70% 80%);
      }
    }
    .feed-item-title, .feed-item-subtitle {
      @apply text-white;
    }
  }
}
</style>