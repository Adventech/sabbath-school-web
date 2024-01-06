<template>
  <ul :class="`block-multiple-choice-${block.id}`" class="flex flex-col">
    <slot />
  </ul>
</template>

<script>
export default {
  props: ['block', 'userInput', 'blockData', 'documentId'],
  methods: {
    selectChoice: function (choice) {
      this.emitter.emit('multiple-choice-reset', this.block.items.filter(c => c.index !== choice).map(b => b.id))
      this.$emit('choice', choice)
    }
  }
}
</script>

<style lang="scss">

</style>