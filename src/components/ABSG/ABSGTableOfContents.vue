<template>
  <div class="flex gap-6 flex-col">
    <div class="flex gap-2 flex-col">
      <Menu v-if="resource.sectionView === 'dropdown'" as="div" class="relative inline-block text-left">
        <div>
          <MenuButton :class="{'w-full': inline, 'min-w-32 md:w-32 lg:w-64': !inline}" class="w-full min-w-32 rounded-md shadow-sm ring-1 ring-inset ring-gray-300 w-32 px-3 py-2 focus:outline-none">
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
      <SectionItem v-if="resource.sectionView === 'dropdown'" :inline="inline" :resourceId="resource.id" :kind="resource.kind" :section="selectedSection" :progress="progress"></SectionItem>
      <SectionItem v-else v-for="section in resource.sections" :inline="inline" :resourceId="resource.id" :kind="resource.kind" :section="section" :progress="progress"></SectionItem>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import SectionItem from '@/components/ABSG/ABSGSectionItem.vue'
import { CheckIcon } from '@heroicons/vue/24/solid'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'

const props = defineProps(['resource', 'progress', 'inline'])

const selectedSectionIndex = ref(0)

const selectedSection = computed(() => {
  return props.resource.sections[selectedSectionIndex.value]
})
</script>
