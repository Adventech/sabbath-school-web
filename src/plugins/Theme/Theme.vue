<template>
  <Menu as="div" class="relative">
    <MenuButton>
      <div class="bg-black/10 p-2 rounded">
        <ThemeIcon class="fill-white w-6 h-6" />
      </div>
    </MenuButton>
    <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0">
      <MenuItems class="z-20 absolute right-0 w-auto origin-top-left rounded-md bg-white shadow-lg border border-gray-200">
        <div>
          <div class="flex border-b border-gray-100">
            <button @click="themeStore().setColor(THEME_COLOR.LIGHT)" class="flex-grow text-gray-500 hover:bg-gray-50 rounded-tl-md p-2 px-5 border-r border-gray-100">Light</button>
            <button @click="themeStore().setColor(THEME_COLOR.SEPIA)" class="flex-grow text-gray-500 hover:bg-gray-50 p-2 px-5 border-r border-gray-100">Sepia</button>
            <button @click="themeStore().setColor(THEME_COLOR.DARK)" class="flex-grow text-gray-500 hover:bg-gray-50 p-2 px-5 border-r border-gray-100">Dark</button>
            <button @click="themeStore().setColor(THEME_COLOR.AUTO)" class="flex-grow text-gray-500 hover:bg-gray-50 rounded-tr-md p-2 px-5">Auto</button>
          </div>
          <div class="flex px-3 py-3 items-center">
            <span class="text-gray-500 mr-2 text-sm select-none">Aa</span>
            <input :value="THEME_FONT_SIZE_MODEL_MAP[themeStore().size]" @change="themeStore().setSize($event.target.value)" type="range" min="1" max="5" step="1" class="flex-grow appearance-none cursor-pointer bg-gray-200 rounded-md h-2" />
            <span class="text-gray-500 ml-2 font-bold text-xl select-none">Aa</span>
          </div>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script>
import ThemeIcon from './theme-icon.svg'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { THEME_COLOR, THEME_FONT_SIZE, THEME_FONT_SIZE_MODEL_MAP, themeStore } from './ThemeStore.js'
export default {
  data () {
    return {
      themeStore,
      THEME_COLOR,
      THEME_FONT_SIZE,
      THEME_FONT_SIZE_MODEL_MAP
    }
  },
  components: {
    Menu, MenuButton, MenuItems, MenuItem, ThemeIcon, themeStore
  }
}
</script>