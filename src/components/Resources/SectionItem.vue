<template>
  <div :class="[`resource-item-section-${kind}`]" class="resource-item-section">
    <p v-if="!section.isRoot" class="mt-4 mb-2 text-ss-primary text-sm uppercase font-bold">{{ section.title }}</p>

    <div class="resource-item-document-list">
      <router-link v-for="document in section.documents" :to="{name: 'document', params: {sectionName: section.name, documentName: document.name}}"
                   class="resource-item-document-item flex justify-between items-center">
        <div>
          <p class="resource-item-document-item-subtitle" v-if="document.subtitle">{{ document.subtitle }}</p>
          <p class="resource-item-document-item-title">{{ document.title }}</p>
        </div>
        <div @click.prevent="saveDocumentProgress(document.id)">
          <CheckCircleIcon v-if="!documentCompleted(document.id)" class="text-ss-primary w-6 h-6"></CheckCircleIcon>
          <CheckCircleIconSolid v-else class="text-ss-primary w-6 h-6"></CheckCircleIconSolid>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { CheckCircleIcon } from '@heroicons/vue/24/outline'
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/vue/24/solid'
export default {
  props: ['resourceId', 'kind', 'section', 'progress'],
  components: { CheckCircleIcon, CheckCircleIconSolid },
  data () {
    return {
      CheckCircleIcon,
      CheckCircleIconSolid
    }
  },
  methods: {
    documentCompleted: function (documentId) {
      if (!this.progress) return false
      return this.progress.find(p => p.documentId === documentId && p.completed === true)
    },
    saveDocumentProgress: async function (documentId) {
      this.emitter.emit('update-document-progress', { documentId, completed: !this.documentCompleted(documentId) })
    },
  }
}
</script>

<style lang="scss">
.resource-item-section {
  .resource-item-document-list {
    @apply bg-gray-100 rounded-lg w-full;
    .resource-item-document-item {
      @apply hover:bg-gray-200 first:rounded-t-lg last:rounded-b-lg;
      &-title {}
      &-subtitle {
        @apply text-gray-400 text-sm;
      }
      @apply border-b last:border-0 border-b border-gray-200 px-5 py-2;
    }
  }
}
</style>