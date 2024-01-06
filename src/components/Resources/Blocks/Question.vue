<template>
  <div class="question-block">
    <div class="question-block-caption">
      <p v-if="questionText" v-html="questionText"></p>
    </div>
    <div class="relative">
      <div class="question-block-separator"></div>
      <textarea @input="e => debounce($emit, e.target.value)" class="question-block-answer" placeholder="Enter your answer">{{ (blockUserInput && blockUserInput.answer) ? blockUserInput.answer : "" }}</textarea>
    </div>
  </div>
</template>

<script>
import { marked } from "../Renderer.js"

const debounce = function (fn, wait) {
  let timer
  return function(...args){
    if (timer) {
      clearTimeout(timer)
    }
    const context = this
    timer = setTimeout(()=>{
      fn.apply(context, args)
    }, wait)
  }
}

export default {
  props: ['block', 'userInput', 'blockData', 'documentId'],
  computed: {
    blockUserInput: function () {
      if (!this.userInput) return null
      return this.userInput.find(i => i.inputType === this.block.type)
    }
  },
  data () {
    return {
      answer: null,
      questionText: null
    }
  },
  mounted () {
    this.questionText = marked.parse(this.block.markdown)
  },
  methods: {
    debounce: debounce((emit, e) => { emit('answered', e) }, 1000)
  }
}
</script>

<style lang="scss">

.question-block {
  @apply shadow-lg;
  &-caption {
    @apply
    theme-dark:bg-black theme-dark:border-gray-500
    bg-gray-100 border-gray-200
    py-3 px-5 rounded-t-lg border;
    & > p {
      @apply select-none font-bold;
    }
  }
  &-separator {
    @apply
    theme-dark:border-gray-500
    border-red-400
    absolute top-0 bottom-0 left-10 border-l w-1;
  }
  &-answer {
    @apply
    theme-dark:bg-black theme-dark:border-gray-500
    bg-gray-100
    border resize-none font-mono rounded-b p-2 px-12 h-32 block outline-none w-full bg-local;
    background-image: linear-gradient(theme('colors.gray.200') 1px, theme('colors.transparent') 1px);
    background-size: 100% theme('lineHeight.6');
  }
}

.theme--dark {
  .question-block-answer {
    background-image: linear-gradient(theme('colors.gray.800') 1px, theme('colors.transparent') 1px);
  }
}
</style>