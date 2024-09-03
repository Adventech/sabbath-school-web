<template>
  <ul :class="`block-multiple-choice-${block.id}`" class="flex flex-col gap-2">
    <slot />
  </ul>
</template>

<script>
export default {
  props: ['block', 'userInput'],
  watch: {
    userInput: function (newValue, oldValue) {
      for (let userInput of this.userInput) {
        if (userInput.hasOwnProperty('choice')) {
          this.emitter.emit(`multiple-choice-item-select-${this.block.id}`, userInput.choice)
          this.checked = userInput.choice
        }
      }
    }
  },
  created() {
    this.emitter.on(`multiple-choice-item-selected-${this.block.id}`, (choice) => {
      this.emitter.emit(`multiple-choice-reset-${this.block.id}`, this.block.items.filter(c => c.index !== choice).map(b => b.id))
      this.$emit('choice', choice)
    })
  },
}
</script>

<style lang="scss">

</style>