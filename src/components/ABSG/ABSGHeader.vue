<template>
  <div class="absg-header">
    <div class="absg-header-inner">
      <router-link to="/"><ABSGLogo /></router-link>

      <div class="flex items-center gap-4 lg:gap-10">
        <nav class="absg-header-inner-menu">
          <div class="absg-header-inner-menu-nav">
            <ul v-if="!useLang"><router-link :to="{'name': 'this-week'}">This Week</router-link></ul>

            <Menu v-if="!useLang"  as="ul" class="relative">
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
                    <MenuItem>
                      <router-link :to="{'name': 'study', params: {type: 'teacher'}}">Adult Teachers</router-link>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>

            <ul v-if="!useLang"><router-link :to="{'name': 'study', params: {type: 'teach'}}">Teach</router-link></ul>

            <ul v-if="!useLang"><router-link :to="{'name': 'media'}">Media</router-link></ul>

            <Menu as="ul" class="relative">
              <MenuButton class="flex items-center">
                More
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
                      <a href="https://sspmadventist.org/sabbathschool">Sabbath School Home</a>
                    </MenuItem>
                    <MenuItem>
                      <a href="https://sspmadventist.org/sabbathschool/history">History</a>
                    </MenuItem>
                    <MenuItem>
                      <a href="https://sspmadventist.org/sabbathschool/alive">Strategy</a>
                    </MenuItem>
                    <MenuItem>
                      <a href="https://sspmadventist.org/sabbathschool/missionstoriesandofferings">Mission Stories and Offerings</a>
                    </MenuItem>
                    <MenuItem>
                      <a href="https://sspmadventist.org/sabbathschool/resources">Training Resources</a>
                    </MenuItem>
                    <MenuItem>
                      <a href="https://www.inversebible.org/">Young Adult</a>
                    </MenuItem>
                    <MenuItem>
                      <a href="https://sspmadventist.org/sabbathschool/childrenandyouth">Children and Youth</a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>

            <ul><router-link :to="{'name': 'about'}">About</router-link></ul>

            <ul><router-link :to="{'name': 'contact'}">Contact</router-link></ul>

            <Menu as="ul" class="relative">
              <MenuButton class="flex items-center">
                {{ currentLang.flag }} {{ currentLang.native }}
              </MenuButton>
              <transition
                  enter-active-class="transition duration-100 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-in"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0">
                <MenuItems class="absg-header-dropdown max-h-64 overflow-x-scroll">
                  <div>
                    <MenuItem v-for="l in locales">
                      <router-link :to="l.code === 'en' ? '/' : {'name': 'language', params: {'resourceLanguage': l.code}}">{{ l.flag }} {{ l.native }}</router-link>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
            </div>
        </nav>

        <div class="absg-header-inner-menu-mobile-nav">
          <Menu as="ul" class="relative">
            <MenuButton class="absg-header-inner-menu-mobile-nav-button">
              <span class="text-xs">Menu</span> <Bars3Icon class="w-5 md:w-8 absg-header-inner-menu-mobile-nav-button-icon" />
            </MenuButton>
            <transition
                enter-active-class="transition duration-100 ease-out"
                enter-from-class="transform scale-95 opacity-0"
                enter-to-class="transform scale-100 opacity-100"
                leave-active-class="transition duration-75 ease-in"
                leave-from-class="transform scale-100 opacity-100"
                leave-to-class="transform scale-95 opacity-0">
              <MenuItems class="absg-header-dropdown">
                <MenuItem v-if="!useLang">
                  <ul><router-link :to="{'name': 'this-week'}">This Week</router-link></ul>
                </MenuItem>
                <div>
                  <Disclosure v-if="!useLang" v-slot="{ open }">
                    <DisclosureButton class="text-left p-2 w-full">
                      <div class="flex justify-between">
                        <div>Study</div>
                        <ChevronDownIcon class="shrink-0 w-4" :class="{'rotate-180': open}" />
                      </div>
                    </DisclosureButton>
                    <DisclosurePanel class="pl-4">
                      <MenuItem>
                        <router-link :to="{'name': 'study'}">Standard Adult</router-link>
                      </MenuItem>
                      <MenuItem>
                        <router-link :to="{'name': 'study', params: {type: 'easy-reading'}}">Easy Reading</router-link>
                      </MenuItem>
                      <MenuItem>
                        <router-link :to="{'name': 'study', params: {type: 'teacher'}}">Adult Teachers</router-link>
                      </MenuItem>
                    </DisclosurePanel>
                  </Disclosure>
                  <MenuItem v-if="!useLang">
                    <router-link :to="{'name': 'study', params: {type: 'teach'}}">Teach</router-link>
                  </MenuItem>
                  <MenuItem v-if="!useLang">
                    <router-link :to="{'name': 'media'}">Media</router-link>
                  </MenuItem>
                  <Disclosure v-if="!useLang" v-slot="{ open }">
                    <DisclosureButton class="text-left p-2 w-full">
                      <div class="flex justify-between">
                        <div>More</div>
                        <ChevronDownIcon class="shrink-0 w-4" :class="{'rotate-180': open}" />
                      </div>
                    </DisclosureButton>
                    <DisclosurePanel class="pl-4">
                      <MenuItem>
                        <a href="https://sspmadventist.org/sabbathschool">Sabbath School Home</a>
                      </MenuItem>
                      <MenuItem>
                        <a href="https://sspmadventist.org/sabbathschool/history">History</a>
                      </MenuItem>
                      <MenuItem>
                        <a href="https://sspmadventist.org/sabbathschool/alive">Strategy</a>
                      </MenuItem>
                      <MenuItem>
                        <a href="https://sspmadventist.org/sabbathschool/missionstoriesandofferings">Mission Stories and Offerings</a>
                      </MenuItem>
                      <MenuItem>
                        <a href="https://sspmadventist.org/sabbathschool/resources">Training Resources</a>
                      </MenuItem>
                      <MenuItem>
                        <a href="https://www.inversebible.org/">Young Adult</a>
                      </MenuItem>
                      <MenuItem>
                        <a href="https://sspmadventist.org/sabbathschool/childrenandyouth">Children and Youth</a>
                      </MenuItem>
                    </DisclosurePanel>
                  </Disclosure>
                  <MenuItem>
                    <router-link :to="{'name': 'about'}">About</router-link>
                  </MenuItem>
                  <MenuItem>
                    <Menu as="ul" class="relative my-2 px-2">
                      <MenuButton class="flex items-center">
                        {{ currentLang.flag }} {{ currentLang.native }}
                      </MenuButton>
                      <transition
                          enter-active-class="transition duration-100 ease-out"
                          enter-from-class="transform scale-95 opacity-0"
                          enter-to-class="transform scale-100 opacity-100"
                          leave-active-class="transition duration-75 ease-in"
                          leave-from-class="transform scale-100 opacity-100"
                          leave-to-class="transform scale-95 opacity-0">
                        <MenuItems class="absg-header-dropdown max-h-64 overflow-x-scroll">
                          <div>
                            <MenuItem v-for="l in locales">
                              <router-link :to="l.code === 'en' ? '/' : {'name': 'language', params: {'resourceLanguage': l.code}}">{{ l.flag }} {{ l.native }}</router-link>
                            </MenuItem>
                          </div>
                        </MenuItems>
                      </transition>
                    </Menu>
                  </MenuItem>
                  <MenuItem>
                    <router-link :to="{'name': 'contact'}">Contact</router-link>
                  </MenuItem>
                </div>
              </MenuItems>
            </transition>
          </Menu>
        </div>

        <div class="relative">
          <div class="w-[1px] h-100 bg-gray-600 absolute -top-10 -bottom-10">&nbsp;</div>
        </div>

        <SDALogoAIJ class="w-8 md:w-10 mr-5 lg:mr-0" />
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
import locales from '@/locales.js'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from '@headlessui/vue'
import { ChevronDownIcon } from '@heroicons/vue/24/solid'

const defaultLang = {'native': 'English', 'flag': '🇺🇸'}

let useLang = ref(false)
let currentLang = ref(defaultLang)

const route = useRoute()

if (route.params.resourceLanguage && route.params.resourceLanguage !== 'en') {
  useLang = true
  currentLang = locales.find((l) => l.code === route.params.resourceLanguage) ?? defaultLang
}

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
    @apply z-10 absolute -left-8 mt-4 mr-3 origin-top-right rounded-md bg-white shadow-md w-48 p-2;
    z-index: 999999;
    &-button {
      @apply block text-left text-gray-500 hover:bg-orange-100 m-3 py-2 px-6 rounded hover:text-orange-600;
    }
    a {
      @apply p-2 block hover:bg-gray-200 rounded;
    }
  }
}

</style>