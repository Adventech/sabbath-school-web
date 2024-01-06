<template>
  <FeedGroup v-for="feedGroup in feed" :feedGroup="feedGroup"></FeedGroup>
</template>

<script>
import FeedGroup from './FeedGroup.vue'

export default {
  components: { FeedGroup },
  props: ['feed'],
}
</script>