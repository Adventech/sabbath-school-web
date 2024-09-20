<template>
  <div>
    <video class="w-full rounded shadow" controls>
      <source :src="block.src" />
    </video>
    <p v-if="block.caption" class="select-none italic text-gray-400 mt-1 text-center w-full">{{ block.caption }}</p>
  </div>
</template>

<script>
export default {
  props: ['block', 'userInput', 'blockData', 'documentId']
}
</script>