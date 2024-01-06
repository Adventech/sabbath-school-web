<template>
  <div :class="{'excerpt-item-block-selected': selected}" class="excerpt-item-block">
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['block', 'userInput', 'blockData', 'documentId'],
  data () {
    return {
      selected: false,
    }
  },
  mounted () {
    this.emitter.emit(`excerpt-mounted-${this.blockData.parentBlockId}`)
    this.emitter.on(`excerpt-selected-${this.blockData.parentBlockId}`, (excerptId) => {
      this.selected = excerptId === this.block.id
    })
  },
}
</script>

<style lang="scss">
.excerpt-item-block {
  @apply hidden;
  &-selected {
    @apply inline-block;
  }
}
</style>