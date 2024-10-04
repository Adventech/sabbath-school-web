<template>
  <div>
    <audio class="w-full" controls preload="none">
      <source :src="block.src" />
    </audio>
    <p v-if="block.caption" class="select-none italic text-gray-400 mt-1 text-center w-full">{{ block.caption }}</p>
    <div class="flex justify-center text-sm">
      <Popover v-if="block.credits" class="relative">
        <PopoverButton class="outline-none text-gray-600 underline flex items-center gap-1">
          Copyright & Credits
          <ArrowTopRightOnSquareIcon class="w-4" />
        </PopoverButton>

        <transition
            enter-active-class="transition duration-200 ease-out"
            enter-from-class="translate-y-1 opacity-0"
            enter-to-class="translate-y-0 opacity-100"
            leave-active-class="transition duration-150 ease-in"
            leave-from-class="translate-y-0 opacity-100"
            leave-to-class="translate-y-1 opacity-0"
        >
        <PopoverPanel class="mt-5 border border-gray-200 bg-gray-50 p-4 shadow-xl rounded-lg absolute z-10 w-52 flex flex-col gap-3">
          <p class="text-base font-bold">Credits</p>
          <hr>
          <div v-for="credit in block.credits.credits" class="flex flex-col gap-1">
            <div class="font-bold">{{ credit.value }}</div>
            <div class="text-gray-500">{{ credit.key }}</div>
          </div>
          <template v-if="copyright">
            <hr>
            <div v-html="copyright" class="text-xs text-gray-400"></div>
          </template>

        </PopoverPanel>
        </transition>
      </Popover>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { marked, renderer } from "@/components/Resources/Renderer.js"
import { ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline'
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'
const props = defineProps(['block', 'userInput', 'blockData', 'documentId'])

const copyright = computed(() => {
  if (!props.block.credits || !props.block.credits.copyright) { return null }
  return marked.parse(props.block.credits.copyright, { renderer })
})
</script>