<template>
  <FeedGroup v-for="feedGroup in feed.groups" :feedGroup="feedGroup"></FeedGroup>
</template>

<script>
import FeedGroup from './FeedGroup.vue'

export default {
  components: { FeedGroup },
  props: ['feed'],
}
</script>