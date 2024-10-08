<template>
  <li>
    <div @click="selectOption"
        :class="{
          'multiple-choice-item-correct'  : selected && block.index === parent.answer,
          'multiple-choice-item-incorrect': selected && block.index !== parent.answer}"
        class="multiple-choice-item">
        <span class="multiple-choice-item-radio"></span>
      <div class="select-none flex-grow" v-html="listItemValue"></div>
    </div>
  </li>
</template>

<script>
import { marked } from "marked"

export default {
  props: ['block', 'parent', 'userInput'],
  data () {
    return {
      listItemValue: null,
      selected: undefined,
    }
  },
  async mounted () {
    this.listItemValue = marked.parse(this.block.markdown)
    this.emitter.on(`multiple-choice-reset-${this.parent.id}`, (items) => {
      if (items.includes(this.block.id)) {
        this.selected = false
      }
    })

    this.emitter.on(`multiple-choice-item-select-${this.parent.id}`, (index) => {
      if (this.block.index === index) {
        this.selected = true
      }
    })
  },
  methods: {
    selectOption: function (e) {
      this.selected = true
      this.emitter.emit(`multiple-choice-item-selected-${this.parent.id}`, this.block.index)
    }
  }
}
</script>

<style lang="scss">
.multiple-choice-item {
  @apply
    theme-sepia:border-none theme-sepia:bg-yellow-50
    theme-dark:border-none theme-dark:bg-gray-900
    select-none cursor-pointer
    hover:bg-gray-100 border-gray-200
    border rounded flex items-center gap-4 p-4;

  &-radio {
    @apply
      theme-sepia:border-amber-800
      theme-dark:border-gray-600
      w-4 rounded-full h-4 border;
  }

  &-correct {
    @apply
    theme-sepia:border-amber-800 theme-sepia:bg-green-300
    theme-dark:text-black theme-dark:bg-green-400
    bg-green-100 hover:bg-green-100 border border-green-300;

    .multiple-choice-item-radio {
      @apply
      theme-dark:border-green-700
      border-4 border-green-600;
    }
  }

  &-incorrect {
    @apply
    theme-sepia:border-amber-800 theme-sepia:bg-red-200
    theme-dark:text-black theme-dark:bg-red-100
    bg-red-100 hover:bg-red-100 border border-red-300;
    .multiple-choice-item-radio {
      @apply
      theme-dark:border-red-600
      border-4 border-red-600;
    }
  }
}
</style>
