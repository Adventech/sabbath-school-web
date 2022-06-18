<template>
  <div class="reader p-5">
    <div class="ss-wrapper">
      <div class="ss-wrapper-font ss-wrapper-lato">
        <div class="ss-wrapper-size ss-wrapper-medium">
          <div class="ss-wrapper-theme ss-wrapper-light">
            <div v-html="content" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  content: String
})
</script>