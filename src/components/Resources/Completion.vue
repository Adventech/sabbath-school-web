<template>
  <div class="p-4 flex flex-col gap-4">
    <p class="font-bold text-xl">Fill in the Blanks</p>
    <input
        :value="props.completionUserCompletion"
        @input="emit('update:completionUserCompletion', $event.target.value)"
        :placeholder="placeholder"
        ref="completion"
        class="text-xl border p-4 w-full rounded shadow font-mono text-center"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
const props = defineProps(['completionUserCompletion', 'completionData'])
const emit = defineEmits(['update:completionUserCompletion', 'filled'])
const completion = ref(null);


const handleKeyPress = (event) => {
  if (event.key === 'Enter') {
    emit('filled')
  }
}

const placeholder = computed(() => {
  let length = 10
  let placeholderSymbol = '_'
  if (props.completionData) {
    placeholderSymbol = props.completionData.placeholder
    length = props.completionData.length > 0 ? props.completionData.length : length
  }
  return placeholderSymbol.repeat(length)
})

const focusInput = () => {
  if (completion.value) {
    completion.value.focus();
  }
};


onMounted(() => {
  focusInput()
  window.addEventListener('keyup', handleKeyPress)
})

onBeforeUnmount(() => {
  window.removeEventListener('keyup', handleKeyPress)
})
</script>

<style lang="scss">

</style>