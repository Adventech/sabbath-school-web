<template>
  <div class="excerpt-block flex flex-col">
    <Menu as="div" class="select-none relative hover:bg-gray-500 p-2 rounded inline cursor-pointer bg-gray-600 text-white self-end">
      <MenuButton>
        {{ optionItem.option }}
      </MenuButton>
      <transition
          enter-active-class="transition duration-100 ease-out"
          enter-from-class="transform scale-95 opacity-0"
          enter-to-class="transform scale-100 opacity-100"
          leave-active-class="transition duration-75 ease-in"
          leave-from-class="transform scale-100 opacity-100"
          leave-to-class="transform scale-95 opacity-0">

        <MenuItems class="absolute text-black right-0 mt-4 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <MenuItem @click="selectOption(key)" v-for="(option, key) in block.items" as="div" class="p-2 hover:bg-gray-200">
            {{ option.option }}
          </MenuItem>
        </MenuItems>
      </transition>
    </Menu>
    <slot></slot>
  </div>
</template>

<script>
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

export default {
  props: ['block', 'userInput', 'blockData', 'documentId'],
  components: { Menu, MenuButton, MenuItems, MenuItem },
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
</style>