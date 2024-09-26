<template>
  <div
      :class="wrapperClassesAndStyle.class"
      :style="wrapperClassesAndStyle.style">
    <component
        v-if="blocks[block.type] && blocks[block.type].component"
        v-on="blocks[block.type].on"
        :key="`${block.type}_${block.id}`"
        :is="blocks[block.type].component"
        :block="block"
        :parent="parent"
        :class="`${blockClassesAndStyle.class} ${textClassesAndStyle.class}`"
        :style="`${blockClassesAndStyle.style}; ${textClassesAndStyle.style}`"
        :userInput="userInput"
    >
      <template
          v-for="(item, index) in block.items"
          :key="`${block.id}-${index}-${item.id || ''}`">
        <Block
            :block="item"
            :parent="block"
            :nested="true"
        ></Block>
      </template>
    </component>
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import { authStore } from '@/stores/auth'
import { getBlockStyleClass } from '@/plugins/Theme/BlockStyle.js'
import { getTextStyleAndClass } from "@/plugins/Theme/TextStyle.js"

import List from '@/components/Resources/Blocks/List.vue'
import ListItem from '@/components/Resources/Blocks/ListItem.vue'
import Paragraph from '@/components/Resources/Blocks/Paragraph.vue'
import Blockquote from '@/components/Resources/Blocks/Blockquote.vue'
import Collapse from '@/components/Resources/Blocks/Collapse.vue'
import Heading from '@/components/Resources/Blocks/Heading.vue'
import Hr from '@/components/Resources/Blocks/Hr.vue'
import Image from '@/components/Resources/Blocks/Image.vue'
import Question from '@/components/Resources/Blocks/Question.vue'
import Reference from '@/components/Resources/Blocks/Reference.vue'
import Audio from '@/components/Resources/Blocks/Audio.vue'
import Video from '@/components/Resources/Blocks/Video.vue'
import Poll from '@/components/Resources/Blocks/Poll.vue'
import Carousel from '@/components/Resources/Blocks/Carousel.vue'
import Slide from '@/components/Resources/Blocks/Slide.vue'
import Appeal from '@/components/Resources/Blocks/Appeal.vue'
import MultipleChoice from '@/components/Resources/Blocks/MultipleChoice.vue'
import ListItemChoice from '@/components/Resources/Blocks/ListItemChoice.vue'
import Checklist from '@/components/Resources/Blocks/Checklist.vue'
import ListItemChecklist from '@/components/Resources/Blocks/ListItemChecklist.vue'
import Excerpt from '@/components/Resources/Blocks/Excerpt.vue'
import ExcerptItem from '@/components/Resources/Blocks/ExcerptItem.vue'
import Story from '@/components/Resources/Blocks/Story.vue'

export default {
  name: 'Block',
  props: [
    'block',
    'nested',
    'parent',
  ],
  inject: ['getDefaultStyles', 'getDocument', 'getDocumentUserInput'],
  computed: {
    document() {
      return this.getDocument()
    },

    defaultStyles() {
      return this.getDefaultStyles()
    },

    userInput () {
      return this.getDocumentUserInput().filter(i => i.blockId === this.block.id) ?? []
    },

    blockClassesAndStyle () {
      let ret = { class: "", style: "" }
      if (!this.block.id || !this.defaultStyles) return ret
      return { ...ret, ...getBlockStyleClass(this.defaultStyles, this.block, this.nested, "block") }
    },

    textClassesAndStyle () {
      let ret = { class: "", style: "" }
      if (!this.block.id || !this.defaultStyles) return ret
      let b = { ...ret, ...getTextStyleAndClass(this.defaultStyles, this.block, this.nested, "text") }
      return b
    },

    wrapperClassesAndStyle () {
      let ret = { class: "", style: "" }
      if (!this.block.id || !this.defaultStyles) return ret
      return { ...ret, ...getBlockStyleClass(this.defaultStyles, this.block, this.nested, "wrapper") }
    },
  },
  data () {
    return {
      getBlockStyleClass,
      blocks: {
        'list': { component: shallowRef(List), on: {}},
        'paragraph': { component: shallowRef(Paragraph), on: { highlight: (highlights) => { this.saveHighlight(highlights) }}, annotation: true},
        'blockquote': { component: shallowRef(Blockquote), on: {}},
        'collapse': { component: shallowRef(Collapse), on: {}},
        'heading': { component: shallowRef(Heading), on: {}},
        'hr': { component: shallowRef(Hr), on: {}},
        'image': { component: shallowRef(Image), on: {}},
        'question': { component: shallowRef(Question), on: { answered: (answer) => { this.saveAnswer(answer) } }},
        'reference': { component: shallowRef(Reference), on: {}},
        'audio': { component: shallowRef(Audio), on: {}},
        'video': { component: shallowRef(Video), on: {}},
        'poll': { component: shallowRef(Poll), on: {}},
        'list-item': { component: shallowRef(ListItem), on: { highlight: (highlights) => { this.saveHighlight(highlights) }}},
        'slide': { component: shallowRef(Slide), on: {}},
        'appeal': { component: shallowRef(Appeal), on: { appeal: (appeal) => { this.saveAppeal(appeal) } }},
        'multiple-choice': { component: shallowRef(MultipleChoice), on: { choice: (choice) => { this.saveChoice(choice) } }, data: { answer: this.block.answer }},
        'list-item-choice': { component: shallowRef(ListItemChoice), on: {}},
        'checklist': { component: shallowRef(Checklist), on: { checked: (checked) => { this.saveChecklist(checked) } }},
        'list-item-checklist': { component: shallowRef(ListItemChecklist), on: {}},
        'excerpt': { component: shallowRef(Excerpt), on: {}, data: { parentBlockId: this.block.id }},
        'excerpt-item': { component: shallowRef(ExcerptItem), on: {}},
        'story': { component: shallowRef(Story), on: {}},
      }
    }
  },
  methods: {
    saveAppeal: async function (appeal) {
      if (!authStore().isLoggedIn) return
      try {
        await this.$apiAuthResources.post(`/resources/user/input/appeal/${this.document.id}/${this.block.id}`,
            {
              blockId: this.block.id,
              appeal,
            }
        )
      } catch (e) {}
    },

    saveChoice: async function (choice) {
      if (!authStore().isLoggedIn) return
      try {
        await this.$apiAuthResources.post(`/resources/user/input/multiple-choice/${this.document.id}/${this.block.id}`,
            {
              blockId: this.block.id,
              choice,
            }
        )
      } catch (e) {}
    },

    saveChecklist: async function (checked) {
      if (!authStore().isLoggedIn) return
      try {
        await this.$apiAuthResources.post(`/resources/user/input/checklist/${this.document.id}/${this.block.id}`,
            {
              blockId: this.block.id,
              checked,
            }
        )
      } catch (e) {}
    },

    saveAnswer: async function (answer) {
      if (!authStore().isLoggedIn) return
      try {
        await this.$apiAuthResources.post(`/resources/user/input/question/${this.document.id}/${this.block.id}`,
            {
              blockId: this.block.id,
              answer,
            }
        )
      } catch (e) {}
    },

    saveHighlight: async function (highlights) {
      if (!authStore().isLoggedIn) return
      try {
        await this.$apiAuthResources.post(`/resources/user/input/highlights/${this.document.id}/${this.block.id}`,
            {
              blockId: this.block.id,
              highlights
            }
        )
      } catch (e) {}
    }
  },
}
</script>

<style lang="scss">

</style>