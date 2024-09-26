<template>
  <div class="mx-auto overflow-hidden md:overflow-initial flex flex-col gap-2">
    <img class="w-full lg:rounded lg:mx-auto lg:shadow-lg" :src="block.src" />
    <p v-if="block.caption" class="select-none mt-1 italic text-gray-500 text-center break-words px-4">
      {{ block.caption }}
    </p>
  </div>
</template>

<script>
export default {
  props: ['block', 'userInput', 'blockData', 'documentId']
}
</script>