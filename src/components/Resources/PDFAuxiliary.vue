<template>
  <div v-if="pdf.length">
    <DocumentTextIcon class="auxiliary-icon" @click="pdfAuxOpen=true" />
    <Popup :open="pdfAuxOpen" @closed="pdfAuxOpen = false" :noPadding="true">
      <PDFViewer :pdfs="pdf" />
    </Popup>
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, computed } from 'vue'
import Popup from '@/components/Popup.vue'
import PDFViewer from '@/components/Resources/PDFViewer.vue'
import { DocumentTextIcon } from '@heroicons/vue/24/outline'

const props = defineProps(['resource', 'target'])
const { proxy } = getCurrentInstance()

let pdfAuxOpen = ref(false)
let pdfAux = ref(null)

const pdf = computed(() => {
  if (!pdfAux.value) { return [] }
  return pdfAux.value.filter(p => props.target.indexOf(p.target) >= 0)
})

const checkIfPDFAuxAvailable = async () => {
  try {
    let response = await proxy.$apiResources.get(`${props.resource.index}/pdf.json`)
    pdfAux.value = response.data
  } catch (e) {}
}

onMounted(async () => {
  await checkIfPDFAuxAvailable()
})
</script>