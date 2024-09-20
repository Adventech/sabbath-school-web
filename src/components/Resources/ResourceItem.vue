<template>
  <div class="flex gap-4 md:gap-8 flex-col md:flex-row">
    <div class="flex flex-col items-center md:items-start">
      <div :class="`resource-item-${resource.kind} flex-none`">
        <img :src="resourceCover" class="resource-item-cover object-cover" />

        <div class="hidden md:flex gap-2 flex-col mt-4"
             v-if="resource.credits && resource.credits.length">
          <div v-for="credit in resource.credits">
            <p class="text-gray-500 font-bold text-sm">{{ credit.name }}</p>
            <p class="text-gray-500 text-sm">{{ credit.value }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-grow flex flex-col gap-2">
      <div class="w-full flex flex-col gap-2">
        <p class="resource-item-title text-center md:text-start">{{ resource.title }}</p>
        <p class="resource-item-subtitle">{{ resource.subtitle }}</p>
        <p v-if="resource.description" class="resource-item-description">{{ resource.description }}</p>
      </div>
      <div class="flex gap-2 flex-col">
        <Menu v-if="resource.sectionView === 'dropdown'" as="div" class="relative inline-block text-left">
          <div>
            <MenuButton class="rounded-md shadow-sm ring-1 ring-inset ring-gray-300 w-32 px-3 py-2  focus:outline-none">
              <div class="flex items-center justify-between">
                <span>{{selectedSection.title}}</span>
                <span class="pointer-events-none flex items-center">
                <svg class="h-5 w-5 text-gray-400" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M10 3a.75.75 0 01.55.24l3.25 3.5a.75.75 0 11-1.1 1.02L10 4.852 7.3 7.76a.75.75 0 01-1.1-1.02l3.25-3.5A.75.75 0 0110 3zm-3.76 9.2a.75.75 0 011.06.04l2.7 2.908 2.7-2.908a.75.75 0 111.1 1.02l-3.25 3.5a.75.75 0 01-1.1 0l-3.25-3.5a.75.75 0 01.04-1.06z" clip-rule="evenodd" />
                </svg>
              </span>
              </div>
            </MenuButton>
          </div>
          <transition
              enter-active-class="transition duration-100 ease-out"
              enter-from-class="transform scale-95 opacity-0"
              enter-to-class="transform scale-100 opacity-100"
              leave-active-class="transition duration-75 ease-in"
              leave-from-class="transform scale-100 opacity-100"
              leave-to-class="transform scale-95 opacity-0">
            <MenuItems class="absolute max-h-56 overflow-auto left-0 mt-2 w-56 origin-top-left divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none">
              <div v-for="(section, index) in resource.sections" class="px-1 py-1">
                <MenuItem v-slot="{ active }">
                  <button @click="selectedSectionIndex = index" class="text-gray-900 group flex w-full items-center rounded-md px-2 py-2 text-sm justify-between text-start">
                    <span>{{ section.title }}</span>
                    <span v-if="selectedSection.name === section.name">
                      <CheckIcon class="w-5" />
                    </span>
                  </button>
                </MenuItem>
              </div>
            </MenuItems>
          </transition>
        </Menu>
      </div>
      <div class="flex flex-col gap-4 md:gap-8">
        <SectionItem v-if="resource.sectionView === 'dropdown'" :resourceId="resource.id" :kind="resource.kind" :section="selectedSection" :progress="progress"></SectionItem>
        <SectionItem v-else v-for="section in resource.sections" :resourceId="resource.id" :kind="resource.kind" :section="section" :progress="progress"></SectionItem>
      </div>
    </div>

    <div class="flex md:hidden gap-2 flex-col"
         v-if="resource.credits && resource.credits.length">
      <div v-for="credit in resource.credits">
        <p class="text-gray-500 font-bold text-sm">{{ credit.name }}</p>
        <p class="text-gray-500 text-sm">{{ credit.value }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import SectionItem from './SectionItem.vue'
import { CheckIcon } from '@heroicons/vue/24/solid'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

export default {
  components: { SectionItem, Menu, MenuButton, MenuItems, MenuItem, CheckIcon },
  props: ['resource', 'progress'],
  data () {
    return {
      expanded: false,
      selectedSectionIndex: 0,
    }
  },
  computed: {
    selectedSection: function () {
      return this.resource.sections[this.selectedSectionIndex]
    },
    resourceCover: function () {
      const coverMap = {
        'book': this.resource.covers.portrait,
        'magazine': this.resource.covers.portrait,
        'devotional': this.resource.covers.square,
        'plan': this.resource.covers.square,
        'blog': this.resource.covers.square,
      }
      return coverMap[this.resource.kind]
    }
  },
  created () {
    // select default section based on the resource kind
    // if sectionView === dropdown
  },
}
</script>

<style lang="scss">
.resource-item {
  &-title {
    @apply text-3xl font-bold;
  }
  &-subtitle {
    @apply text-gray-500;
  }

  &-book, &-magazine {
    @apply w-36 lg:w-40 xl:w-48;
    .resource-item-cover {
      @apply h-56 lg:h-60 xl:h-72 w-36 lg:w-40 xl:w-48 rounded shadow;
    }
  }

  &-devotional, &-plan, &-blog {
    @apply w-40 md:w-44 lg:w-48 xl:w-56 2xl:w-60 flex-none;
    .resource-item-cover {
      @apply h-40 md:h-44 lg:h-48 xl:h-56 2xl:h-60 w-40 md:w-44 lg:w-48 xl:w-56 2xl:w-60 rounded shadow;
    }
  }
}
</style>
