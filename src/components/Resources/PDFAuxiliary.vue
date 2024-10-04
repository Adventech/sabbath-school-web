<template>
  <div v-if="pdf.length">
    <template v-if="story">
      <div class="flex flex-col sm:flex-row gap-3">
        <button @click="togglePdf()" :class="{'bg-ss-primary text-white': !pdfAuxOpen}"
                class="py-2 px-3 bg-gray-200 hover:bg-gray-300 rounded flex flex-row text-left text-xs md:text-sm items-center gap-2">
          <CursorArrowRippleIcon class="auxiliary-icon" /> Interactive Story</button>
        <button @click="togglePdf()" :class="{'bg-ss-primary text-white': pdfAuxOpen}"
                class="py-2 px-3 bg-gray-200 hover:bg-gray-300 rounded flex flex-row text-left text-xs md:text-sm items-center gap-2">
          <DocumentTextIcon class="auxiliary-icon" /> Original PDF</button>
      </div>
    </template>
    <DocumentTextIcon v-else class="auxiliary-icon" @click="togglePdf()" />
  </div>
</template>

<script setup>
import { ref, onMounted, getCurrentInstance, computed } from 'vue'
import { DocumentTextIcon, CursorArrowRippleIcon } from '@heroicons/vue/24/outline'

const emit = defineEmits(['pdfAuxToggle'])
const props = defineProps(['resource', 'target', 'popup', 'story'])

// Access the current component's instance
const internalInstance = getCurrentInstance();

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

  internalInstance.appContext.config.globalProperties.emitter.on('pdfAuxToggle', () => {
    pdfAuxOpen.value = !pdfAuxOpen.value
  })
})
</script>