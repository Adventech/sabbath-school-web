<template>
  <div class="flex gap-3 flex-col py-5">

    <div class="px-5">
      <slot name="auxPdfStory"></slot>
    </div>

    <template v-if="$slots.pdf && $slots.pdf().length">
      <slot name="pdf"></slot>
    </template>

    <Block v-else v-for="(block) in segment.blocks"
           :block="block"
           :key="`segment_block_${block.id}`"
    ></Block>
  </div>
</template>

<script>
export default {
  props: ['segment'],
}
</script>