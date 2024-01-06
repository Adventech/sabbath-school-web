<template>
  <li @click="selectOption"
      :class="{
        'multiple-choice-item-correct'  : selected && block.index === blockData.answer,
        'multiple-choice-item-incorrect': selected && block.index !== blockData.answer}"
      class="multiple-choice-item">
      <span class="multiple-choice-item-radio"></span>
    <div class="select-none flex-grow" v-html="listItemValue"></div>
  </li>
</template>

<script>
import { marked } from "../Renderer.js"
export default {
  props: ['block', 'userInput', 'blockData', 'documentId'],
  watch: {
    userInput: function (newValue, oldValue) {
      const userInput = this.userInput?.find(i => i.inputType === "multiple-choice")
      this.selected = this.selected ?? (userInput?.choice === this.block.index ?? false)
    }
  },
  data () {
    return {
      listItemValue: null,
      selected: undefined,
    }
  },
  async mounted () {
    this.listItemValue = marked.parse(this.block.markdown)
    this.emitter.on('multiple-choice-reset', (blockIds) => {
      if (blockIds.includes(this.block.id)) {
        this.selected = false
      }
    })
  },
  methods: {
    selectOption: function (e) {
      this.selected = true
      if (this.$parent && this.$parent.$parent) {
        this.$parent.$parent.selectChoice(this.block.index)
      }
    }
  }
}
</script>

<style lang="scss">
.multiple-choice-item {
  @apply
    theme-sepia:border-amber-800
    theme-dark:border-gray-600 theme-dark:hover:bg-gray-800 theme-dark:hover:text-white
    select-none cursor-pointer
    hover:bg-gray-100 border-gray-200
    border-x last:border-b border-t first:rounded-t-md last:rounded-b-md flex items-center gap-4 p-4;

  &-radio {
    @apply
      theme-sepia:border-amber-800
      theme-dark:border-gray-600
      w-4 rounded-full h-4 border;
  }

  &-correct {
    @apply
    theme-sepia:border-amber-800 theme-sepia:bg-green-300
    theme-dark:border-gray-600 theme-dark:text-black theme-dark:bg-green-400 theme-dark:hover:bg-green-400 theme-dark:hover:text-black
    bg-blue-100 hover:bg-blue-100 last:border-b border-blue-300;

    .multiple-choice-item-radio {
      @apply
      theme-dark:border-green-700
      border-4 border-blue-600;
    }
  }

  &-incorrect {

    @apply
    theme-sepia:border-amber-800 theme-sepia:bg-red-200
    theme-dark:border-gray-600 theme-dark:text-black theme-dark:hover:bg-red-100 theme-dark:hover:text-black
    bg-red-100 hover:bg-red-100 border last:border-b-0 border-red-300;
    .multiple-choice-item-radio {
      @apply
      theme-dark:border-red-600
      border-4 border-red-600;
    }
  }
}
</style>
