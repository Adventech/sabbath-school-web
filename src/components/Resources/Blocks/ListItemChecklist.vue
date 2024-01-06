<template>
  <li @click="selectChoice"
      :class="{'checklist-item-selected': selected}"
      class="checklist-item">
    <CheckCircleIconSolid class="checklist-item-icon"></CheckCircleIconSolid>
    <div class="select-none" v-html="listItemValue"></div>
  </li>
</template>

<script>
import { CheckCircleIcon } from '@heroicons/vue/24/outline'
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/vue/24/solid'
import { marked } from "../Renderer.js"
export default {
  components: { CheckCircleIcon, CheckCircleIconSolid },
  props: ['block', 'userInput', 'blockData', 'documentId'],
  watch: {
    userInput: function (newValue, oldValue) {
      const userInput = this.userInput?.find(i => i.inputType === "checklist")
      this.selected = userInput?.checked?.at(this.block.index) ?? false
    }
  },
  data () {
    return {
      listItemValue: null,
      selected: false,
    }
  },
  async mounted () {
    this.listItemValue = marked.parse(this.block.markdown)
  },
  methods: {
    selectChoice: function () {
      this.selected = !this.selected
      this.$nextTick(() => {
        if (this.$parent && this.$parent.$parent) {
          this.$parent.$parent.selectChoice()
        }
      })
    }
  }
}
</script>

<style lang="scss">
.checklist-item {
  @apply
  theme-sepia:border-amber-800
  theme-dark:border-gray-600 theme-dark:hover:bg-gray-800 theme-dark:hover:text-white
  select-none cursor-pointer
  hover:bg-gray-100 border-gray-200
  cursor-pointer border-x last:border-b border-t first:rounded-t-md last:rounded-b-md flex items-center gap-4 p-4;
  &-icon {
    @apply w-6 h-6 text-gray-300;
  }

  &-selected {
    .checklist-item-icon {
      @apply text-blue-500;
    }
  }
}
</style>