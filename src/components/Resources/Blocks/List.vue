<template>
  <ul :class="{'list-decimal': block.ordered}" class="list-outside pl-3 resource-block-list">
    <slot />
  </ul>
</template>

<script>
export default {
  props: ['block', 'userInput', 'blockData', 'documentId'],
  methods: {
    getBlockStyle: function (parentBlockType) {
      return parentBlockType && ['list', 'list-item'].includes(parentBlockType) ? {} : null
    }
  }

}
</script>

<style lang="scss">
.resource-block-list {
  @apply list-disc;
  & > ul {
    @apply ml-2 my-0;
    margin-top: 0 !important;
  }
  li > p {
    @apply inline;
  }
}

.resource-block-list {
  @apply list-disc;
  & > .resource-block-list {
    @apply list-square;

    & > .resource-block-list {
      @apply list-circle;

      & > .resource-block-list {
        @apply list-disc;

        & > .resource-block-list {
          @apply list-square;

          & > .resource-block-list {
            @apply list-circle;
          }
        }
      }
    }
  }
}

</style>