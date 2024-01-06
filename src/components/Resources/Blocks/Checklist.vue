<template>
  <ul :class="`block-checklist-${block.id}`">
    <slot />
  </ul>
</template>

<script>
import $ from 'jquery'
export default {
  props: ['block', 'userInput', 'blockData', 'documentId'],
  methods: {
    selectChoice: function () {
      let checklistItems = $(`.block-checklist-${this.block.id} li.checklist-item`)
      let checked = []
      checklistItems.map((i, e) => {
        checked.push($(e).hasClass('checklist-item-selected') ? 1 : 0)
      })
      this.$emit('checked', checked)
    }
  },
}
</script>

<style lang="scss">

</style>