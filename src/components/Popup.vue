<template>
  <TransitionRoot as="template" :show="open">
    <Dialog :class="{'pointer-events-auto': minimized}" as="div" class="relative z-40 " @close="!minimized ? closed(): null">
      <TransitionChild v-if="!minimized" as="template" enter="ease-out duration-300" enter-from="opacity-0" enter-to="opacity-100" leave="ease-in duration-200" leave-from="opacity-100" leave-to="opacity-0">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      </TransitionChild>
      <div :class="{'pointer-events-none': minimized}" class="fixed z-10 inset-0 overflow-y-auto">
        <div :class="{'items-end sm:items-center': !minimized, 'items-end': minimized}" class="flex justify-center min-h-full p-4 text-center sm:p-0">
          <TransitionChild as="template" enter="ease-out duration-300" enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95" enter-to="opacity-100 translate-y-0 sm:scale-100" leave="ease-in duration-200" leave-from="opacity-100 translate-y-0 sm:scale-100" leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95">
            <DialogPanel :class="{'xl:max-w-3xl': large}" class="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:max-w-2xl sm:w-full">
              <button v-if="minimizeable" type="button" :class="{'rotate-180': minimized, 'pointer-events-auto': minimized}" class="fixed outline-none top-5 right-16" ref="cancelButtonRef" @click="toggleMini()">
                <ChevronDownIcon class="h-6 w-6 text-gray-600 transition-all" aria-hidden="true" />
              </button>
              <button :class="{'pointer-events-auto': minimized}" type="button" class="fixed outline-none top-5 right-5" ref="cancelButtonRef" @click="closed()">
                <XMarkIcon class="h-6 w-6 text-gray-600 hover:rotate-90 transition-all" aria-hidden="true" />
              </button>
              <div :class="{'px-4 pt-5 pb-4 sm:p-6 sm:pb-4': !noPadding, 'pointer-events-auto': minimized}">
                <div class="mt-3 text-left sm:mt-0">
                  <div class="mt-0" >
                    <slot></slot>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script>
import Markdown from '@/components/Markdown.vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon, ChevronDownIcon } from '@heroicons/vue/24/outline'

export default {
  props: ['open', 'large', 'noPadding', 'minimizeable'],
  data () {
    return {
      minimized: false
    }
  },
  components: {
    Markdown, Dialog, DialogPanel, TransitionChild, TransitionRoot, XMarkIcon, ChevronDownIcon
  },
  methods: {
    closed () {
      this.$emit('closed')
    },
    toggleMini () {
      this.minimized = !this.minimized
      this.$emit(this.minimized ? 'minimized' : 'expanded')
      document.querySelector('html').style.overflow = this.minimized ? 'scroll' : 'hidden'
    }
  }
}
</script>