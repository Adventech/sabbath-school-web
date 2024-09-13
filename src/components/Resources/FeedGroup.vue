<template>
  <div class="px-4">
    <div class="feed-group">{{ feedGroup.title }}</div>
    <div v-if="feedGroup.scope === 'resource'"
         :class="{
            'flex-row gap-x-6 gap-y-10': feedGroup.direction === 'horizontal',
            'flex-col gap-5': feedGroup.direction === 'vertical'
         }" class="flex flex-wrap pb-5">

        <RouterLinkWithExternal v-for="feedItem in feedGroup.resources" :externalURL="feedItem.externalURL" :to="`/resources/${feedItem.index}`">
          <FeedResourceItem :view="feedGroup.view" :feedItem="feedItem" :direction="feedGroup.direction" :id="feedItem.id"></FeedResourceItem>
        </RouterLinkWithExternal>
    </div>

    <div v-if="feedGroup.scope === 'document'"
         class="flex flex-wrap pb-5 flex-col gap-x-6 gap-y-10">
      <router-link v-for="feedDocumentItem in feedGroup.documents" :to="`/resources/${feedDocumentItem.index}`">
        <FeedDocumentItem  :feedDocumentItem="feedDocumentItem" :id="feedDocumentItem.id"></FeedDocumentItem>
      </router-link>
    </div>
  </div>
</template>

<script>
import FeedResourceItem from '@/components/Resources/FeedResourceItem.vue'
import FeedDocumentItem from '@/components/Resources/FeedDocumentItem.vue'
import RouterLinkWithExternal from '@/components/RouterLinkWithExternal.vue'

export default {
  components: { FeedResourceItem, FeedDocumentItem, RouterLinkWithExternal },
  props: ['feedGroup'],
}
</script>

<style lang="scss">
.feed-group {
  @apply text-sm font-bold uppercase text-ss-primary my-4;
}
</style>