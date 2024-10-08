<template>
  <div>
    <div :class="appealClass" @click="toggleAppeal" class="select-none appeal-block active:scale-appeal flex cursor-pointer gap-3 items-center p-4 rounded-lg" v-if="appealText">
      <CheckCircleIcon v-show="!appealStatus" class="w-8"></CheckCircleIcon>
      <CheckCircleIconSolid v-show="appealStatus" class="w-8"></CheckCircleIconSolid>
      <div class="select-none" v-html="appealText"></div>
    </div>
  </div>
</template>

<script>
import { marked } from "marked"
import { CheckCircleIcon } from '@heroicons/vue/24/outline'
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/vue/24/solid'

export default {
  components: { CheckCircleIcon, CheckCircleIconSolid },
  props: ['block', 'userInput'],
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
      return this.userInput.find(i => i.blockId === this.block.id)
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
  theme-sepia:from-sepia theme-sepia:via-amber-300 theme-sepia:to-amber-800 theme-sepia:border-none theme-sepia:bg-yellow-50
  theme-dark:from-black theme-dark:to-gray-900 theme-dark:border-none theme-dark:bg-black
  border from-gray-100 via-blue-300 to-blue-600;

  background-size: 300% 100%;
  transition: background-position .3s;
  background-position: 100%;
  &-on {
    @apply
    bg-gradient-to-l from-40% to-70% via-50%
    text-white;
    background-position: 0;
  }
}
</style>