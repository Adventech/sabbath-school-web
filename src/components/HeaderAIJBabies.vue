<template>
  <div class="shadow-sm">
    <div class="aij-header">
      <div class="aij-header-inner">
        <div class="aij-header-inner-logo">
          <a href="https://aliveinjesus.info" aria-label="Alive in Jesus Home">
            <AIJLogo class="w-16 md:w-32 fill-[#F4793B]" aria-hidden="true" />
          </a>
          <div class="w-0.5 h-8 bg-orange-100"></div>
          <a href="https://babies.aliveinjesus.info" class="aij-header-inner-logo-title">Babies</a>
        </div>
        <nav class="aij-header-inner-menu">
          <div class="aij-header-inner-menu-nav">
            <ul><a href="https://babies.aliveinjesus.info/about-us">About</a></ul>
            <ul><a href="https://babies.aliveinjesus.info/parents">Parents</a></ul>
            <ul><a href="https://babies.aliveinjesus.info/teachers">Teachers</a></ul>
            <ul><a href="https://babies.aliveinjesus.info/handouts">Handouts</a></ul>
            <ul><a href="https://babies.aliveinjesus.info/training">Training</a></ul>

            <Menu as="ul" class="relative">
              <MenuButton class="flex items-center">
                Other Ages
              </MenuButton>
              <transition
                  enter-active-class="transition duration-100 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-in"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0">
                <MenuItems class="aij-header-dropdown">
                  <div>
                    <MenuItem>
                      <a href="https://beginner.aliveinjesus.info" class="aij-header-dropdown-button">Beginner</a>
                    </MenuItem>
                    <MenuItem>
                      <a href="https://kindergarten.aliveinjesus.info" class="aij-header-dropdown-button">Kindergarten</a>
                    </MenuItem>
                    <MenuItem>
                      <a href="https://primary.aliveinjesus.info" class="aij-header-dropdown-button">Primary</a>
                    </MenuItem>
                    <MenuItem>
                      <a href="https://junior.aliveinjesus.info" class="aij-header-dropdown-button">Junior</a>
                    </MenuItem>
                    <MenuItem>
                      <a href="https://teen.aliveinjesus.info" class="aij-header-dropdown-button">Teen</a>
                    </MenuItem>
                    <MenuItem>
                      <a href="https://youth.aliveinjesus.info" class="aij-header-dropdown-button">Youth</a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>

            <LoginButton />
          </div>

          <div class="aij-header-inner-menu-mobile-nav">
            <Menu as="ul" class="relative">
              <MenuButton class="aij-header-inner-menu-mobile-nav-button">
                <span>Menu</span>
                <Bars3Icon class="w-5 md:w-8 aij-header-inner-menu-mobile-nav-button-icon" />
              </MenuButton>
              <transition
                  enter-active-class="transition duration-100 ease-out"
                  enter-from-class="transform scale-95 opacity-0"
                  enter-to-class="transform scale-100 opacity-100"
                  leave-active-class="transition duration-75 ease-in"
                  leave-from-class="transform scale-100 opacity-100"
                  leave-to-class="transform scale-95 opacity-0">
                <MenuItems class="aij-header-dropdown">
                  <div>
                    <MenuItem>
                      <a href="https://babies.aliveinjesus.info/about-us" class="aij-header-dropdown-button">About</a>
                    </MenuItem>
                    <MenuItem>
                      <a href="https://babies.aliveinjesus.info/parents" class="aij-header-dropdown-button">Parents</a>
                    </MenuItem>
                    <MenuItem>
                      <a href="https://babies.aliveinjesus.info/teachers" class="aij-header-dropdown-button">Teachers</a>
                    </MenuItem>
                    <MenuItem>
                      <a href="https://babies.aliveinjesus.info/handouts" class="aij-header-dropdown-button">Handouts</a>
                    </MenuItem>
                    <MenuItem>
                      <a href="https://babies.aliveinjesus.info/training" class="aij-header-dropdown-button">Training</a>
                    </MenuItem>
                    <MenuItem>
                      <a href="https://aliveinjesus.info/" class="aij-header-dropdown-button">AIJ Home</a>
                    </MenuItem>
                    <MenuItem>
                      <a href="https://beginner.aliveinjesus.info/" class="aij-header-dropdown-button">Beginner</a>
                    </MenuItem>
                    <MenuItem>
                      <a href="https://kindergarten.aliveinjesus.info" class="aij-header-dropdown-button">Kindergarten</a>
                    </MenuItem>
                    <MenuItem>
                      <a href="https://primary.aliveinjesus.info" class="aij-header-dropdown-button">Primary</a>
                    </MenuItem>
                    <MenuItem>
                      <a href="https://junior.aliveinjesus.info" class="aij-header-dropdown-button">Junior</a>
                    </MenuItem>
                    <MenuItem>
                      <a href="https://teen.aliveinjesus.info" class="aij-header-dropdown-button">Teen</a>
                    </MenuItem>
                    <MenuItem>
                      <a href="https://youth.aliveinjesus.info" class="aij-header-dropdown-button">Youth</a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
          </div>
          <div class="w-0.5 h-8 bg-gray-200"></div>
          <SDALogoAIJ class="w-8 md:w-10 fill-[#F4793B]" />
        </nav>
      </div>
    </div>
  </div>
</template>

<script setup>
import AIJLogo from '@/assets/img/aij-logo.svg'
import SDALogoAIJ from '@/assets/img/sda-logo-aij.svg'
import LoginButton from '@/components/LoginButton.vue'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { Bars3Icon } from '@heroicons/vue/24/solid'
</script>


<style lang="scss" scoped>
@import '@/aij.css';

.aij-header {
  @apply container mx-auto px-5 lg:px-24 py-3 p-4;

  &-inner {
    @apply flex flex-row justify-between items-center;

    &-logo {
      @apply flex flex-row gap-2 xl:gap-5 items-center;

      &-title {
        @apply text-orange-500 xl:text-lg font-extrabold;
      }
    }

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

  font-family: 'manrope';
  font-weight: 600;
  color: #324156B8;
  font-size: 14px;

  &-dropdown {
    @apply z-10 absolute left-0 mt-4 mr-3 origin-top-right rounded-md bg-white shadow-md w-48;
    &-button {
      @apply block text-left text-gray-500 hover:bg-orange-100 m-3 py-2 px-6 rounded hover:text-orange-600;
    }
  }
}
</style>