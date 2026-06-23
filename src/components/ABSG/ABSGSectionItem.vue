<template>
  <div :class="[`resource-item-section-${kind}`]" class="resource-item-section">
    <p v-if="!section.isRoot" class="mb-2 text-ss-primary text-sm uppercase font-bold">{{ section.title }}</p>

    <div class="resource-item-document-list">
      <RouterLinkWithExternal v-for="document in section.documents"
                   :externalURL="document.externalURL"
                   :to="{'name': 'document', params: {'resourceLanguage': $route.params.resourceLanguage, 'resourceName': document.resourceName, 'documentName': document.name}}"
                   class="resource-item-document-item flex justify-between items-center gap-2">
        <div class="flex flex-row items-center justify-between w-full gap-4">
          <div class="grow order-1 md:order-2 flex items-center gap-4">
            <p class="resource-item-document-item-sequence">{{ document.sequence }}</p>
            <div>
              <p :class="{'font-bold':!inline && kind === 'blog' && document.cover}" class="resource-item-document-item-title">{{ document.title }}</p>
              <p class="resource-item-document-item-date" v-if="document.startDate && document.endDate">{{DayJS(document.startDate, 'DD/MM/YYYY').format('MMM DD')}} - {{DayJS(document.endDate, 'DD/MM/YYYY').format('MMM DD')}}</p>
            </div>
          </div>
          <div v-if="!inline && kind === 'blog' && document.cover"
               class="shrink-0 order-2 md:order-1">
            <img :src="document.cover"
                 class="w-32 rounded" />
          </div>
        </div>
        <div v-if="document.externalURL" >
          <ArrowTopRightOnSquareIcon class="w-4 text-gray-400"/>
        </div>
      </RouterLinkWithExternal>
    </div>
  </div>
</template>

<script>
import DayJS from 'dayjs'
import { CheckCircleIcon, ArrowTopRightOnSquareIcon } from '@heroicons/vue/24/outline'
import { CheckCircleIcon as CheckCircleIconSolid } from '@heroicons/vue/24/solid'
import RouterLinkWithExternal from '@/components/RouterLinkWithExternal.vue'

export default {
  props: ['resourceId', 'kind', 'section', 'progress', 'inline'],
  components: { CheckCircleIcon, CheckCircleIconSolid, ArrowTopRightOnSquareIcon, RouterLinkWithExternal },
  data () {
    return {
      DayJS,
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
  @apply flex flex-col gap-2;
  .resource-item-document-list {
    @apply bg-gray-100 rounded-lg w-full;
    .resource-item-document-item {
      @apply hover:bg-gray-200 first:rounded-t-lg last:rounded-b-lg cursor-pointer;
      &-sequence {
        @apply text-xl font-bold text-black/35;
      }
      &-title {
        @apply font-bold text-lg text-black/80;
      }
      &-date {
        @apply text-gray-500 text-sm;
      }
      &-subtitle {
        @apply text-gray-500 text-sm;
      }
      @apply border-b last:border-0 border-b border-gray-200 px-5 py-2;
    }
  }
}
</style>