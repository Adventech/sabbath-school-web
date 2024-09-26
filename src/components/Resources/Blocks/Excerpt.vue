<template>
  <div class="excerpt-block flex flex-col">
    <div class="flex pb-5">
      <button @click="selectOption(key)" v-for="(opt, key) in block.items"
              :class="{'excerpt-block-version-selected': option === key}"
              class="excerpt-block-version">
        {{ opt.option }}
      </button>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: ['block'],
  data () {
    return {
      excerptsReady: 0,
      option: 0,
    }
  },
  computed: {
    optionItem: function () {
      return this.block.items[this.option]
    },
  },
  created () {
    this.emitter.on(`excerpt-mounted-${this.block.id}`, () => {
      this.excerptsReady++

      if (this.excerptsReady === this.block.items.length) {
        this.selectExcerpt()
      }
    })
  },
  methods: {
    selectOption: function (option) {
      this.option = option
      this.selectExcerpt()
    },
    selectExcerpt: function () {
      this.emitter.emit(`excerpt-selected-${this.block.id}`, this.optionItem.id)
    }
  }
}
</script>

<style lang="scss">
.excerpt-block-version {
  @apply
  theme-sepia:hover:bg-yellow-500 theme-sepia:border-yellow-800
  theme-dark:hover:bg-gray-800 theme-dark:border-gray-600
  py-2 px-3 hover:bg-gray-100 first:rounded-l-md last:rounded-r-md border-l border-t border-b last:border-r border-gray-200 shadow-sm;

  &-selected {
    @apply
    theme-dark:bg-gray-900
    theme-sepia:bg-yellow-600 theme-sepia:text-white
    bg-gray-200;
  }
}
</style>