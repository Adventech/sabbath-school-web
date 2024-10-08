<template>
  <div
      :style="`top: ${y}px; left: ${x}px`"
      :class="{'hidden': !show}"
       class="select-none	absolute rounded shadow bg-white p-2 text-sm flex gap-3 items-center">

      <div @click="highlight(COLORS.BLUE)" class="cursor-pointer hover:bg-gray-200 rounded p-1"><div class="border border-blue-500 rounded-full w-4 h-4 bg-blue-500"></div></div>
      <div @click="highlight(COLORS.YELLOW)" class="cursor-pointer hover:bg-gray-200 rounded p-1"><div class="border border-yellow-500 rounded-full w-4 h-4 bg-yellow-500"></div></div>
      <div @click="highlight(COLORS.ORANGE)" class="cursor-pointer hover:bg-gray-200 rounded p-1"><div class="border border-orange-500 rounded-full w-4 h-4 bg-orange-500"></div></div>
      <div @click="highlight(COLORS.GREEN)" class="cursor-pointer hover:bg-gray-200 rounded p-1"><div class="border border-green-500 rounded-full w-4 h-4 bg-green-500"></div></div>
      <div @click="highlight()" class="cursor-pointer hover:bg-gray-200 rounded p-1 -ml-1">
        <XCircleIcon class="w-5 h-5 text-gray-500"></XCircleIcon>
      </div>
    <div class="h-5 border border-r border-gray-200"></div>
    <div @click="comment()" class="cursor-pointer hover:bg-gray-200 rounded p-1">
      <ChatBubbleBottomCenterTextIcon class="w-5 h-5 fill-gray-600" />
    </div>
  </div>
</template>

<script>
const COLORS = {
  BLUE: 'blue',
  ORANGE: 'orange',
  YELLOW: 'yellow',
  GREEN: 'green',
}
import { XCircleIcon, ChatBubbleBottomCenterTextIcon } from '@heroicons/vue/24/solid'
export default {
  components: { XCircleIcon, ChatBubbleBottomCenterTextIcon },
  data () {
    return {
      x: null,
      y: null,
      show: false,
      COLORS,
    }
  },
  methods: {
    comment: function () {
      this.emitter.emit('comment')
      this.show = false
    },
    highlight: function (color) {
      this.emitter.emit('highlight', color)
      this.show = false
    },
    toggleContextMenu: async function (args) {
      function wait(duration) {
        return new Promise(resolve => {
          setTimeout(() => { resolve(true) }, duration);
        })
      }
      await wait(1)

      const selection = args.selection
      const selectionText = selection.toString()

      if (!selection.anchorNode || !selectionText || !selectionText.length) {
        this.show = false
        return
      }

      const { x, y, width } = selection.getRangeAt(0).getBoundingClientRect()

      if (width < 10) {
        this.show = false
        return
      }

      this.x = x + (width / 2) - 70
      this.y = y + window.scrollY - 60
      this.show = true
    },
  },
  mounted () {
    this.emitter.on('show', this.toggleContextMenu);
  }
}
</script>

<style lang="scss">

</style>