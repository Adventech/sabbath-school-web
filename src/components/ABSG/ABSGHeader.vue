<template>
  <div class="absg-header">
    <div class="absg-header-inner">

      <router-link to="/"><ABSGLogo /></router-link>

      <div class="flex items-center gap-10">
        <nav class="absg-header-inner-menu">
          <div class="absg-header-inner-menu-nav">
            <ul><router-link :to="{'name': 'this-week'}">This Week</router-link></ul>

            <Menu as="ul" class="relative">
              <MenuButton class="flex items-center">
                Study
              </MenuButton>
              <transition
                  enter-active-class="transition duration-100 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-in"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0">
                <MenuItems class="absg-header-dropdown">
                  <div>
                    <MenuItem>
                      <router-link :to="{'name': 'study'}">Standard Adult</router-link>
                    </MenuItem>
                    <MenuItem>
                      <router-link :to="{'name': 'study', params: {type: 'easy-reading'}}">Easy Reading</router-link>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>

            <ul><router-link :to="{'name': 'study', params: {type: 'teach'}}">Teach</router-link></ul>

            <ul><router-link :to="{'name': 'media'}">Media</router-link></ul>
            <ul><router-link :to="{'name': 'about'}">About</router-link></ul>

            <Menu as="ul" class="relative">
              <MenuButton class="flex items-center">
                Passcode Access
              </MenuButton>
              <transition
                  enter-active-class="transition duration-100 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-in"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0">
                <MenuItems class="absg-header-dropdown">
                  <div>
                    <MenuItem>
                      <a href="https://www.adultbiblestudyguide.org/translator" target="_blank">Translators</a>
                    </MenuItem>
                    <MenuItem>
                      <a href="https://www.adultbiblestudyguide.org/residents" target="_blank">Manuscript Evaluation – Residents</a>
                    </MenuItem>
                    <MenuItem>
                      <a href="https://www.adultbiblestudyguide.org/world" target="_blank">Manuscript Evaluation – World</a>
                    </MenuItem>
                    <MenuItem>
                      <a href="https://www.adultbiblestudyguide.org/resource-login" target="_blank">Publishing House Resource Login</a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>

            <ul><router-link :to="{'name': 'contact'}">Contact</router-link></ul>
            </div>
        </nav>

        <div class="absg-header-inner-menu-mobile-nav">
          <Menu as="ul" class="relative">
            <MenuButton class="absg-header-inner-menu-mobile-nav-button">
              <Bars3Icon class="w-5 md:w-8 absg-header-inner-menu-mobile-nav-button-icon" />
            </MenuButton>
            <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0">
              <MenuItems class="absg-header-dropdown">
                <div>
                  <MenuItem>
                    <ul><router-link :to="{'name': 'this-week'}">This Week</router-link></ul>
                  </MenuItem>
                  <MenuItem>
                    <router-link :to="{'name': 'study'}">Standard Adult</router-link>
                  </MenuItem>
                  <MenuItem>
                    <router-link :to="{'name': 'study', params: {type: 'easy-reading'}}">Easy Reading</router-link>
                  </MenuItem>
                  <MenuItem>
                    <router-link :to="{'name': 'study', params: {type: 'teach'}}">Teach</router-link>
                  </MenuItem>
                  <MenuItem>
                    <router-link :to="{'name': 'media'}">Media</router-link>
                  </MenuItem>
                  <MenuItem>
                    <router-link :to="{'name': 'about'}">About</router-link>
                  </MenuItem>
                  <MenuItem>
                    <router-link :to="{'name': 'contact'}">Contact</router-link>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>

        <div class="w-[1px] h-100 bg-gray-300">&nbsp;</div>

        <SDALogoAIJ class="w-8 md:w-10" />
      </div>
    </div>
  </div>
</template>

<script setup>
import ABSGLogo from '@/assets/img/absg-logo.svg'
import SDALogoAIJ from '@/assets/img/sda-logo-aij.svg'
import LoginButton from '@/components/LoginButton.vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { Bars3Icon } from '@heroicons/vue/24/solid'
</script>


<style lang="scss" scoped>
@import '@/absg.css';
.absg-header {
  @apply sspm-container;
  &-inner {
    @apply flex justify-between p-0 items-center py-4;

    &-menu {
      @apply flex items-center gap-4 xl:gap-8;
      &-nav {
        @apply flex items-center gap-4 xl:gap-8 hidden xl:flex;
      }

      &-mobile-nav {
        @apply flex xl:hidden items-center z-20;
        &-button {
          @apply flex items-center flex-row hover:bg-gray-200 rounded  gap-2 p-2 cursor-pointer;
          &-icon {
            @apply shrink-0 w-8 h-8;
          }
        }
      }
    }
  }

  &-dropdown {
    @apply z-10 absolute left-0 mt-4 mr-3 origin-top-right rounded-md bg-white shadow-md w-48 p-2;
    &-button {
      @apply block text-left text-gray-500 hover:bg-orange-100 m-3 py-2 px-6 rounded hover:text-orange-600;
    }
    a {
      @apply p-2 block hover:bg-gray-200 rounded;
    }
  }
}

</style>