<template>
  <div
      :class="!ignoreStyles ? wrapperStyle.class : ''"
      :style="!ignoreStyles ? wrapperStyle.style : ''">
    <component
        v-if="blocks[block.type] && blocks[block.type].component"
        v-on="blocks[block.type].on"
        :key="`${block.type}_${block.id}`"
        :is="blocks[block.type].component"
        :block="block"
        :parent="parent"
        :class="!ignoreStyles ? `${blockStyle.class} ${blockTextStyle.class}` : ''"
        :style="!ignoreStyles ? `${blockStyle.style}; ${blockTextStyle.style}` : ''"
        :userInput="userInput"
    >
      <template
          v-for="(item, index) in block.items"
          :key="`${block.id}-${index}-${item.id || ''}`">
        <Block
            :block="item"
            :parent="block"
            :ignoreStyles="ignoreStyles"
        ></Block>
      </template>
    </component>
  </div>
</template>

<script>
import { shallowRef } from 'vue'
import { authStore } from '@/stores/auth'

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
import Table from '@/components/Resources/Blocks/Table.vue'
import { BlockStyle } from "../Style/BlockStyle"

export default {
  name: 'Block',
  props: [
    'block',
    'parent',
    'ignoreStyles',
  ],
  inject: ['getStyle', 'getDefaultStyles', 'getDocument', 'getDocumentUserInput'],
  computed: {
    document() {
      return this.getDocument()
    },

    defaultStyles() {
      return this.getDefaultStyles()
    },

    style () {
      return this.getStyle()
    },

    userInput () {
      return this.getDocumentUserInput().filter(i => i.blockId === this.block.id) ?? []
    },

    blockStyle () {
      return BlockStyle.getElementStyle(this.style?.blocks, 'block', this.block)
    },

    wrapperStyle () {
      return BlockStyle.getElementStyle(this.style?.blocks, 'wrapper', this.block)
    },

    blockTextStyle () {
      return BlockStyle.getTextStyle(this.style?.blocks, '', this.block)
    },
  },
  data () {
    return {
      blocks: {
        'list': { component: shallowRef(List), on: {}},
        'paragraph': { component: shallowRef(Paragraph), on: {
            highlight: (highlights) => { this.saveHighlight(highlights) },
            completion: (completion) => { this.saveCompletion(completion) },
          },
          annotation: true
        },
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
        'list-item': { component: shallowRef(ListItem), on: {
            highlight: (highlights) => { this.saveHighlight(highlights) },
            completion: (completion) => { this.saveCompletion(completion) },
          }
        },
        'slide': { component: shallowRef(Slide), on: {}},
        'appeal': { component: shallowRef(Appeal), on: { appeal: (appeal) => { this.saveAppeal(appeal) } }},
        'multiple-choice': { component: shallowRef(MultipleChoice), on: { choice: (choice) => { this.saveChoice(choice) } }, data: { answer: this.block.answer }},
        'list-item-choice': { component: shallowRef(ListItemChoice), on: {}},
        'checklist': { component: shallowRef(Checklist), on: { checked: (checked) => { this.saveChecklist(checked) } }},
        'list-item-checklist': { component: shallowRef(ListItemChecklist), on: {}},
        'excerpt': { component: shallowRef(Excerpt), on: {}, data: { parentBlockId: this.block.id }},
        'excerpt-item': { component: shallowRef(ExcerptItem), on: {}},
        'story': { component: shallowRef(Story), on: {}},
        'table': { component: shallowRef(Table), on: {}},
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
    },

    saveCompletion: async function (completion) {
      if (!authStore().isLoggedIn) return
      try {
        await this.$apiAuthResources.post(`/resources/user/input/completion/${this.document.id}/${this.block.id}`,
            {
              blockId: this.block.id,
              completion
            }
        )
      } catch (e) {}
    }
  },
}
</script>

<style lang="scss">

</style>