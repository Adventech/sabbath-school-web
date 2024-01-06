<template>
  <div :class="appealClass" @click="toggleAppeal" class="select-none appeal-block active:scale-appeal flex cursor-pointer gap-3 items-center p-4 rounded-lg" v-if="appealText">
    <CheckCircleIcon v-show="!appealStatus" class="w-8"></CheckCircleIcon>
    <CheckCircleIconSolid v-show="appealStatus" class="w-8"></CheckCircleIconSolid>
    <div class="select-none" v-html="appealText"></div>
  </div>
</template>

<script>
import { CheckCircleIcon } from '@heroicons/vue/24/outline'
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/vue/24/solid'
import { marked } from "../Renderer.js"
export default {
  components: { CheckCircleIcon, CheckCircleIconSolid },
  props: ['block', 'userInput', 'blockData', 'documentId'],
  data () {
    return {
      appealStatusInternal: undefined,
      appealText: null,
    }
  },
  computed: {
    appealStatus: function () {
      return this.appealStatusInternal ?? (this.blockUserInput ? this.blockUserInput.appeal : false)
    },
    blockUserInput: function () {
      return this.userInput.find(i => i.inputType === this.block.type)
    },
    appealClass: function () {
      return this.appealStatus ? 'appeal-block-on' : 'appeal-block-off'
    }
  },
  mounted () {
    this.appealText = marked.parse(this.block.markdown)
  },
  methods: {
    toggleAppeal: function () {
      this.appealStatusInternal = !this.appealStatus
      this.$emit('appeal', this.appealStatus)
    }
  }
}
</script>

<style lang="scss">
.appeal-block {
  @apply
  theme-sepia:from-sepia theme-sepia:via-amber-300 theme-sepia:to-amber-800 theme-sepia:border theme-sepia:border-amber-800
  theme-dark:from-black theme-dark:to-black theme-dark:border theme-dark:border-gray-600
  from-gray-100 via-blue-300 to-blue-600
  bg-gradient-to-l from-40% to-70% via-50%;

  background-size: 300% 100%;
  transition: background-position .3s;
  background-position: 100%;
  &-on {
    @apply text-white;
    background-position: 0;
  }
}
</style>