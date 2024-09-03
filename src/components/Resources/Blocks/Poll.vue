<template>
  <div class="select-none">
    <p class="font-bold">{{ block.caption }}</p>
    <div class="mt-1">
      <div @click="vote(index)"
           v-for="(pollOption, index) in block.items"
           :class="{'poll-item-voted': ifVoteSelected(index), 'poll-item-not-voted': !voted}"
           class="poll-item">
        <div class="poll-item-option">
          <p v-html="marked.parse(pollOption.markdown)"></p>
          <div v-if="voted && pollResults" class="poll-item-percentage">{{ votePercentage(index) }}%</div>
        </div>
        <div v-if="voted && pollResults" :style="`width: ${votePercentage(index)}%`" class="poll-item-percentage-background"></div>
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
  inject: ['getDocument'],
  props: ['block', 'userInput'],
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
    document () {
      return this.getDocument()
    },
    blockUserInput () {
      if (!this.userInput) return null
      return this.userInput.find(i => i.blockId === this.block.id)
    },
    voted () {
      return this.selected !== null || this.blockUserInput && this.blockUserInput.hasOwnProperty('vote')
    }
  },
  methods: {
    saveVote: async function (vote) {
      if (!authStore().isLoggedIn) return
      try {
        await this.$apiAuth.post(`/resources/user/input/poll/${this.document.id}/${this.block.id}`,
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
        this.pollResults = pollResults.data.results
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
.poll-item {
  @apply
  theme-sepia:bg-yellow-50 theme-sepia:border-yellow-50
  theme-dark:bg-gray-800
  theme-light:border
  relative rounded-md mt-2 px-4 p-3 z-10;

  &-voted {
    @apply
    theme-sepia:border-yellow-500
    theme-dark:border-gray-600 theme-dark:border
    border-blue-300;
  }
  &-not-voted {
    @apply
    theme-sepia:border-none
    theme-dark:border-none
    cursor-pointer hover:bg-blue-100;
  }
  &-option {
    @apply flex items-center justify-between z-20;
  }
  &-percentage {
    @apply text-gray-600 italic;
    &-background {
      @apply
      theme-sepia:bg-yellow-200
      theme-dark:bg-gray-900
      absolute bg-blue-200 w-full h-full top-0 left-0 z-[-1] rounded;
    }
  }
}
</style>