<template>
  <div v-if="pdf.length">
    <DocumentTextIcon class="auxiliary-icon" @click="togglePdf()" />
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, computed } from 'vue'
import { DocumentTextIcon } from '@heroicons/vue/24/outline'

const emit = defineEmits(['pdfAuxToggle'])
const props = defineProps(['resource', 'target', 'popup'])
const { proxy } = getCurrentInstance()

let pdfAuxOpen = ref(false)
let pdfAux = ref(null)

const pdf = computed(() => {
  if (!pdfAux.value) { return [] }
  return pdfAux.value.filter(p => props.target.indexOf(p.target) >= 0)
})

const togglePdf = () => {
  pdfAuxOpen.value = !pdfAuxOpen.value
  emit('pdfAuxToggle', pdfAuxOpen.value, pdf)
}

const checkIfPDFAuxAvailable = async () => {
  try {
    let response = await proxy.$apiResources.get(`${props.resource.index}/pdf.json`)
    const contentType = response.headers["content-type"]
    if (contentType && contentType.indexOf("application/json") !== -1) {
      pdfAux.value = response.data
    }
  } catch (e) {}
}

onMounted(async () => {
  await checkIfPDFAuxAvailable()
})
</script>