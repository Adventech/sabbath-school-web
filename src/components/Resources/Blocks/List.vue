<template>
  <ul :class="{'list-decimal': block.ordered}" class="list-inside resource-block-list">
    <template
        v-for="(item, index) in block.items"
        :key="`${block.id}-${index}-${item.id || ''}`">
      <Block
          :block="item"
          :parentBlockType="block.type"
          :nested="true"
      ></Block>
    </template>
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