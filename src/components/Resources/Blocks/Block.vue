<template>
  <component :is="blocks[block.type].component"
             :blockData="{ ...block.data, ...blockData } ?? null"
             :block="block"
             :class="style.class"
             :style="style.style"
             :documentId="documentId"
             :userInput="userInput ?? userInputForBlock(block)"
             v-on="blocks[block.type].on"
             v-if="blocks[block.type] && blocks[block.type].component"
             :key="`${block.type}_${block.id}`">
      <template v-if="block.items" v-for="(item, index) in block.items" :key="`${block.id}-${index}-${item.id || ''}`">
          <Block :block="item"
                 :parentBlockType="block.type"
                 :blockData="blocks[block.type]?.data"
                 :documentId="documentId"
                 :documentUserInput="documentUserInput"
                 :userInput="['list-item', 'list-item-choice', 'list-item-checklist', 'excerpt-item'].includes(item.type) ? userInputForBlock(block).concat(userInputForBlock(item)) : userInputForBlock(item)"
          ></Block>
      </template>
  </component>
</template>

<script>
import { shallowRef } from 'vue'
import { authStore } from '@/stores/auth'
import { getBlockStyleClass } from '@/plugins/Theme/BlockStyle.js'

import List from './List.vue'
import ListItem from './ListItem.vue'
import Paragraph from './Paragraph.vue'
import Blockquote from './Blockquote.vue'
import Collapse from './Collapse.vue'
import Heading from './Heading.vue'
import Hr from './Hr.vue'
import Image from './Image.vue'
import Question from './Question.vue'
import Reference from './Reference.vue'
import Audio from './Audio.vue'
import Video from './Video.vue'
import Poll from './Poll.vue'
import Carousel from './Carousel.vue'
import Slide from './Slide.vue'
import Appeal from './Appeal.vue'
import MultipleChoice from './MultipleChoice.vue'
import ListItemChoice from './ListItemChoice.vue'
import Checklist from './Checklist.vue'
import ListItemChecklist from './ListItemChecklist.vue'
import Excerpt from './Excerpt.vue'
import ExcerptItem from './ExcerptItem.vue'

export default {
  name: 'Block',
  props: ['block', 'documentId', 'documentUserInput', 'userInput', 'parentBlockType', 'blockData'],
  computed: {
    style: function () {
      let ret = { class: "", style: "" }
      if (!this.block.id) return ret
      if (['list-item', 'list-item-choice', 'list-item-checklist', 'excerpt-item'].includes(this.block.type)) { return ret }
      if (this.parentBlockType === 'excerpt-item') { return getBlockStyleClass({
        block: {margin: {
          start: "none",
          end: "none",
        }}
      }) }
      // skip default margins for blockquote children
      // TODO: Refactor, because ugly
      if (["blockquote"].includes(this.parentBlockType)) return ret

      let blockStyle = this.blocks[this.block.type]?.component?.methods?.getBlockStyle?.call(this, this.parentBlockType)
      // let blockStyleClasses = getBlockStyleClass(this.block.style, blockStyle)

      // if (this.blocks[this.block.type].annotation) {
      //   blockStyleClasses += ` block-annotate`
      // }

      return getBlockStyleClass(this.block.style, blockStyle)
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
        'carousel': { component: shallowRef(Carousel), on: {}},
        'list-item': { component: shallowRef(ListItem), on: { highlight: (highlights) => { this.saveHighlight(highlights) }}},
        'slide': { component: shallowRef(Slide), on: {}},
        'appeal': { component: shallowRef(Appeal), on: { appeal: (appeal) => { this.saveAppeal(appeal) } }},
        'multiple-choice': { component: shallowRef(MultipleChoice), on: { choice: (choice) => { this.saveChoice(choice) } }, data: { answer: this.block.answer }},
        'list-item-choice': { component: shallowRef(ListItemChoice), on: {}},
        'checklist': { component: shallowRef(Checklist), on: { checked: (checked) => { this.saveChecklist(checked) } }},
        'list-item-checklist': { component: shallowRef(ListItemChecklist), on: {}},
        'excerpt': { component: shallowRef(Excerpt), on: {}, data: { parentBlockId: this.block.id }},
        'excerpt-item': { component: shallowRef(ExcerptItem), on: {}},
      }
    }
  },
  methods: {
    userInputForBlock: function (block) {
      return this.documentUserInput && this.documentUserInput.length && block.id ? this.documentUserInput.filter(i => i.blockId === block.id) : []
    },
    saveAppeal: async function (appeal) {
      if (!authStore().isLoggedIn) return
      try {
        await this.$apiAuth.post(`/resources/user/input/appeal/${this.documentId}/${this.block.id}`,
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
        await this.$apiAuth.post(`/resources/user/input/multiple-choice/${this.documentId}/${this.block.id}`,
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
        await this.$apiAuth.post(`/resources/user/input/checklist/${this.documentId}/${this.block.id}`,
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
        await this.$apiAuth.post(`/resources/user/input/question/${this.documentId}/${this.block.id}`,
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
        await this.$apiAuth.post(`/resources/user/input/highlights/${this.documentId}/${this.block.id}`,
            {
              blockId: this.block.id,
              highlights
            }
        )
      } catch (e) {}
    }

    // TODO: interactive components
    // - save annotation / comment
  },
}
</script>

<style lang="scss">
.resource-link-sspm-bible,
.resource-link-sspm-egw {
  @apply border-b border-ss-primary font-bold;
}
</style>