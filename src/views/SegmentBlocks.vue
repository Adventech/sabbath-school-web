<template>
  <div>
    <div class="mx-5 mb-5">
      <p class="text-3xl font-bold">{{ segment.title }}</p>
      <p v-if="segment.subtitle" class="text-gray-400 mt-2">{{ segment.subtitle }}</p>
    </div>
    <div v-context-menu>
      <div class="flex gap-3 flex-col">
        <Block v-for="(block) in segment.blocks"
               :block="block"
               :key="`segment_block_${block.id}`"
        ></Block>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['segment'],
}
</script>