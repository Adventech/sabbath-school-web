<template>
  <!-- TODO: responsive design, mobile splash view -->
  <div class="flex gap-8 flex-col md:flex-row">
    <div :class="`resource-item-${resource.kind} flex-none`">
      <img :src="resourceCover" class="resource-item-cover object-cover" />
      <div v-if="resource.credits && resource.credits.length" class="flex gap-2 flex-col mt-4">
        <div  v-for="credit in resource.credits">
          <p class="text-gray-500 font-bold text-sm">{{ credit.name }}</p>
          <p class="text-gray-500 text-sm">{{ credit.value }}</p>
        </div>
      </div>
    </div>
    <div class="flex-grow">
      <p class="resource-item-title">{{ resource.title }}</p>
      <p class="resource-item-subtitle">{{ resource.subtitle }}</p>
      <p v-if="resource.description" class="resource-item-description">{{ resource.description }}</p>

      <div @click="expanded=!expanded" v-if="!expanded && sections.collapsed.length" class="sections-collapsed transition-all relative pt-2 mt-10 cursor-pointer">
        <div class="transition-all sections-collapsed-farthest absolute -top-2 bg-gray-100 left-7 right-7 h-2 border border-gray-200 rounded-t-lg"></div>
        <div class="transition-all sections-collapsed-far absolute top-0 bg-gray-100 left-3 right-3 h-2 border border-gray-200 rounded-t-lg"></div>
        <div class="transition-all sections-collapsed-near bg-gray-100 rounded-lg border border-gray-200 p-4">
          <p class="text-sm text-gray-400">{{ sections.collapsed[sections.collapsed.length-1].documents.slice(-1)[0].subtitle }}</p>
          <p>{{ sections.collapsed[sections.collapsed.length-1].documents.slice(-1)[0].title }}</p>
        </div>
      </div>

      <div v-if="expanded" class="mt-4">
        <SectionItem v-for="section in sections.collapsed" :resourceId="resource.id" :kind="resource.kind" :section="section" :progress="progress"></SectionItem>
      </div>

      <div class="mt-4">
        <SectionItem v-for="section in sections.sections" :resourceId="resource.id" :kind="resource.kind" :section="section" :progress="progress"></SectionItem>
      </div>
    </div>
  </div>
</template>

<script>
import SectionItem from './SectionItem.vue'

export default {
  components: { SectionItem },
  props: ['resource', 'progress'],
  data () {
    return {
      expanded: false,
    }
  },
  computed: {
    sections: function () {
      if (['magazine', 'book'].includes(this.resource.kind) || !this.progress || this.progress.length < 1 || !this.resource || this.resource.sections.length < 3) {
        return { sections: this.resource.sections, collapsed: [] }
      }

      let allCompletedDocs = this.progress.map(p => p.completed ? p.documentId : false)
      let sliceSectionIndex = this.resource.sections.length-1

      for (let sectionIndex = this.resource.sections.length-1; sectionIndex >= 0; sectionIndex--) {
        let section = this.resource.sections[sectionIndex]
        if (section.documents.map(d => d.id).filter(d => allCompletedDocs.includes(d)).length > 0) {
            if (sectionIndex < this.resource.sections.length-1
                && section.documents.map(d => d.id).every(d => allCompletedDocs.includes(d))) {
              sliceSectionIndex =  sectionIndex+1
            } else {
              sliceSectionIndex = sectionIndex
            }
            break
        }
      }

      return { sections: this.resource.sections.slice(sliceSectionIndex), collapsed: this.resource.sections.slice(0, sliceSectionIndex) }
    },
    resourceCover: function () {
      const coverMap = {
        'book': this.resource.covers.portrait,
        'magazine': this.resource.covers.portrait,
        'devotional': this.resource.covers.square,
        'plan': this.resource.covers.square,
        'blog': this.resource.covers.square,
      }
      return coverMap[this.resource.kind]
    }
  },
}
</script>

<style lang="scss">
.sections-collapsed {
  &:hover {
    .sections-collapsed-farthest {
      @apply h-3
    }
    .sections-collapsed-far {
      @apply top-1 h-3
    }
    .sections-collapsed-near {
      @apply mt-2
    }
  }
}
.resource-item {
  &-title {
    @apply text-3xl font-bold;
  }
  &-subtitle {
    @apply text-gray-500 mt-2;
  }
  &-description {
    @apply mt-4;
  }

  &-book, &-magazine {
    @apply w-36 lg:w-40 xl:w-48;
    .resource-item-cover {
      @apply h-56 lg:h-60 xl:h-72 w-36 lg:w-40 xl:w-48 rounded shadow;
    }
  }

  &-devotional, &-plan, &-blog {
    @apply w-40 md:w-44 lg:w-48 xl:w-56 2xl:w-60 flex-none;
    .resource-item-cover {
      @apply h-40 md:h-44 lg:h-48 xl:h-56 2xl:h-60 w-40 md:w-44 lg:w-48 xl:w-56 2xl:w-60 rounded shadow;
    }
  }
}
</style>
