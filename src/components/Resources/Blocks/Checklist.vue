<template>
  <ul :class="`block-checklist-${block.id}`" class="flex flex-col gap-2">
    <slot />
  </ul>
</template>

<script>
export default {
  props: ['block', 'userInput'],
  watch: {
    userInput: function (newValue, oldValue) {
      for (let userInput of this.userInput) {
        if (userInput.checked) {
          for (let index of userInput.checked) {
            this.emitter.emit(`checklist-item-select-${this.block.id}`, index)
          }
          this.checked = userInput.checked
        }
      }
    }
  },
  data () {
    return {
      checked: [],
    }
  },
  created () {
    this.emitter.on(`checklist-item-selected-${this.block.id}`, ({ index, checked }) => {
      if (!checked) {
        this.checked = this.checked.filter((i) => i !== index)
      } else {
        this.checked.push(index)
      }

      this.checked = Array.from(new Set(this.checked))
      this.$emit('checked', this.checked)
    })
  }
}
</script>

<style lang="scss">

</style>