<template>
  <Menu as="div" class="relative hover:bg-gray-200 p-2 rounded">
    <MenuButton class="flex items-center" :title="displayName">
      <UserIcon class="w-5 h-5 md:mr-2 flex-shrink-0"></UserIcon>
      <span class="hidden lg:inline">{{ displayName }}</span>
    </MenuButton>
    <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0">
      <MenuItems class="absolute right-0 mt-4 w-32 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
        <div>
          <MenuItem>
            <button @click="logOut()" class="w-full flex items-center text-left text-gray-500 hover:bg-gray-50 p-2"><PowerIcon class="w-4 h-4 mr-2"></PowerIcon> Log out</button>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>

<script>
import { authStore } from '@/stores/auth'
import { PowerIcon, UserIcon } from '@heroicons/vue/24/solid'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

export default {
  props: {
    displayName: String
  },
  components: { PowerIcon, UserIcon, Menu, MenuButton, MenuItems, MenuItem },
  methods: {
    logOut: function () {
      authStore().logOut()
      this.emitter.emit('auth-logged-out')
    }
  }
}
</script>