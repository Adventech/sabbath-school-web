<template>
  <li>
    <div @click="selectChoice"
        :class="{'checklist-item-selected': selected}"
        class="checklist-item">
      <CheckCircleIconSolid class="checklist-item-icon flex-none"></CheckCircleIconSolid>
      <div class="select-none" v-html="listItemValue"></div>
    </div>
  </li>
</template>

<script>
import { CheckCircleIcon } from '@heroicons/vue/24/outline'
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/vue/24/solid'
import { marked } from "../Renderer.js"
export default {
  components: { CheckCircleIcon, CheckCircleIconSolid },
  props: ['block', 'parent', 'userInput'],

  data () {
    return {
      listItemValue: null,
      selected: false,
    }
  },
  async mounted () {
    this.listItemValue = marked.parse(this.block.markdown)
    this.emitter.on(`checklist-item-select-${this.parent.id}`, (index) => {
      if (this.block.index === index) {
        this.selected = true
      }
    })
  },
  methods: {
    selectChoice: function () {
      this.selected = !this.selected
      this.emitter.emit(`checklist-item-selected-${this.parent.id}`, { index: this.block.index, checked: this.selected })
    }
  }
}
</script>

<style lang="scss">
.checklist-item {
  @apply
  theme-sepia:border-none theme-sepia:bg-yellow-50 theme-sepia:hover:bg-yellow-100
  theme-dark:border-none theme-dark:bg-gray-900 theme-dark:hover:bg-gray-800 theme-dark:hover:text-white
  select-none
  cursor-pointer
  hover:bg-gray-100 border-gray-200
  cursor-pointer border-x last:border-b border-t first:rounded-t-md last:rounded-b-md flex items-center gap-4 p-4;

  &-icon {
    @apply
    theme-sepia:text-gray-200
    theme-dark:text-gray-600
    w-6 h-6 text-gray-300;
  }

  &-selected {
    .checklist-item-icon {
      @apply
      theme-sepia:text-amber-500
      theme-dark:text-gray-100
      text-blue-500;
    }
  }
}
</style>