<template>
  <div :class="{'excerpt-item-block-selected': selected}" class="excerpt-item-block">
    <div class="flex flex-col gap-3">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: ['block', 'parent'],
  data () {
    return {
      selected: false,
    }
  },
  mounted () {
    this.emitter.emit(`excerpt-mounted-${this.parent.id}`)
    this.emitter.on(`excerpt-selected-${this.parent.id}`, (excerptId) => {
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