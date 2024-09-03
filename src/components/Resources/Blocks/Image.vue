<template>
  <div class="mx-auto">
    <img class="w-full rounded shadow-lg object-cover" :src="block.src" />
    <p v-if="block.caption" class="select-none mt-1 italic text-gray-500 text-center break-words">
      {{ block.caption }}
    </p>
  </div>
</template>

<script>
export default {
  props: ['block', 'userInput', 'blockData', 'documentId']
}
</script>