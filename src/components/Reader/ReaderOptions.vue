<template>
  <Menu as="div" class="relative">
    <MenuButton>
      <ReaderOptionsIcon class="hover:fill-gray-400 w-6 h-6 fill-white mr-4 mb-2" />
    </MenuButton>
    <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0">

      <MenuItems class="absolute right-0 mt-4 w-auto origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div>
          <div class="flex border-b border-gray-100">
            <button @click="readerOptionsStore().setTheme(READER_THEME.LIGHT)" :class="{'bg-gray-50': readerOptionsStore().theme === READER_THEME.LIGHT}" class="flex-grow text-gray-500 hover:bg-gray-50 rounded-tl-md p-2 px-5 border-r border-gray-100">Light</button>
            <button @click="readerOptionsStore().setTheme(READER_THEME.SEPIA)" :class="{'bg-gray-50': readerOptionsStore().theme === READER_THEME.SEPIA}" class="flex-grow text-gray-500 hover:bg-gray-50 p-2 px-5 border-r border-gray-100">Sepia</button>
            <button @click="readerOptionsStore().setTheme(READER_THEME.DARK)" :class="{'bg-gray-50': readerOptionsStore().theme === READER_THEME.DARK}" class="flex-grow text-gray-500 hover:bg-gray-50 p-2 px-5 border-r border-gray-100">Dark</button>
            <button @click="readerOptionsStore().setTheme(READER_THEME.AUTO)" :class="{'bg-gray-50': readerOptionsStore().theme === READER_THEME.AUTO}" class="flex-grow text-gray-500 hover:bg-gray-50 rounded-tr-md p-2 px-5">Auto</button>
          </div>

          <div class="flex border-b border-gray-100">
            <button @click="readerOptionsStore().setFont(READER_FONT.ANDADA)" :class="{'bg-gray-50': readerOptionsStore().font === READER_FONT.ANDADA}" class="flex-grow text-gray-500 hover:bg-gray-50 p-2 px-5">Andada</button>
            <button @click="readerOptionsStore().setFont(READER_FONT.LATO)" :class="{'bg-gray-50': readerOptionsStore().font === READER_FONT.LATO}" class="flex-grow text-gray-500 hover:bg-gray-50 p-2 px-5">Lato</button>
            <button @click="readerOptionsStore().setFont(READER_FONT.PTSERIF)" :class="{'bg-gray-50': readerOptionsStore().font === READER_FONT.PTSERIF}" class="flex-grow text-gray-500 hover:bg-gray-50 p-2 px-5">PT&nbsp;Serif</button>
            <button @click="readerOptionsStore().setFont(READER_FONT.PTSANS)" :class="{'bg-gray-50': readerOptionsStore().font === READER_FONT.PTSANS}" class="flex-grow text-gray-500 hover:bg-gray-50 p-2 px-5">PT&nbsp;Sans</button>
          </div>

          <div class="flex px-3 py-3 items-center">
            <span class="text-gray-500 mr-2 text-sm select-none">Aa</span>
            <input @change="readerOptionsStore().setSize($event.target.value)" type="range" min="1" max="5" step="1" class="flex-grow appearance-none cursor-pointer bg-gray-200 rounded-md h-2" v-model.lazy="readerOptionsStore().size" />
            <span class="text-gray-500 ml-2 font-bold text-xl select-none">Aa</span>
          </div>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script>
import ReaderOptionsIcon from '@/assets/img/reader-options-icon.svg'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { READER_THEME, READER_FONT, READER_SIZE, readerOptionsStore } from '@/components/Reader/ReaderOptionsStore'

export default {
  data() {
    return {
      READER_THEME,
      READER_FONT,
      READER_SIZE,
      readerOptionsStore,
    }
  },
  components: {
    Menu, MenuButton, MenuItems, MenuItem, ReaderOptionsIcon
  }
}

</script>