<template>
  <div class="flex gap-3 flex-col py-5">
    <Block v-for="(block) in segment.blocks"
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