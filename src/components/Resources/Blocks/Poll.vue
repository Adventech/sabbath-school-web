<template>
  <div class="select-none">
    <p class="font-bold">{{ block.caption }}</p>
    <div class="mt-1">
      <div @click="vote(index)" :class="{'border-blue-300': ifVoteSelected(index), 'cursor-pointer hover:bg-blue-100': !voted}" class="relative border rounded-md mt-2 px-4 p-3" v-for="(pollOption, index) in block.items">
        <div class="flex items-center justify-between z-20">
          <p v-html="marked.parse(pollOption.markdown)"></p>
          <div v-if="voted && pollResults" class="text-gray-600 italic">{{ votePercentage(index) }}%</div>
        </div>
        <div v-if="voted && pollResults" :style="`width: ${votePercentage(index)}%`" class="absolute bg-blue-100 w-full h-full top-0 left-0 z-[-1]"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { authStore } from '@/stores/auth'
import { CheckCircleIcon } from '@heroicons/vue/24/solid'
import { marked } from "../Renderer.js"

export default {
  components: { CheckCircleIcon },
  props: ['block', 'documentId', 'userInput', 'blockData'],
  data () {
    return {
      selected: null,
      pollResults: null,
      marked
    }
  },
  async mounted () {
    await this.fetchPollData()
  },
  computed: {
    blockUserInput: function () {
      if (!this.userInput) return null
      return this.userInput.find(i => i.inputType === this.block.type)
    },
    voted: function () {
      return this.selected !== null || this.blockUserInput && this.blockUserInput.hasOwnProperty('vote')
    }
  },
  methods: {
    saveVote: async function (vote) {
      if (!authStore().isLoggedIn) return
      try {
        await this.$apiAuth.post(`/resources/user/input/poll/${this.documentId}/${this.block.id}`,
            {
              blockId: this.block.id,
              vote,
            }
        )
      } catch (e) {}
    },
    fetchPollData: async function () {
      if (!authStore().isLoggedIn) return
      try {
        let pollResults = await this.$apiAuth.get(`/resources/polls/${this.block.id}`)
        this.pollResults = pollResults.data
      } catch (e) {}
    },
    votePercentage: function (index) {
      return this.pollResults[index] ? this.pollResults[index].percentage || 0 : 0
    },
    ifVoteSelected: function (index) {
      return this.selected === index || (this.voted && this.blockUserInput && this.blockUserInput.vote === index)
    },
    vote: async function (index) {
      if (this.voted) return
      if (!authStore().isLoggedIn) {
        alert('Please log in to vote')
        return
      }

      await this.saveVote(index)
      await this.fetchPollData()
      this.selected = index
    }
  }
}
</script>

<style lang="scss">

</style>