<template>
  <div class="px-4">
    <FeedGroup v-for="feedGroup in feed.groups" :feedGroup="feedGroup"></FeedGroup>
  </div>
</template>

<script>
import { useTitle } from "@vueuse/core"
import FeedGroup from '@/components/Resources/FeedGroup.vue'

export default {
  components: { FeedGroup },
  props: ['feed'],
  mounted () {
    const title = useTitle()
    title.value = `${this.feed.title}`
  },
}
</script>