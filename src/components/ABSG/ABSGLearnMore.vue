<template>
  <a v-if="href" :href="href" class="sspm-learn-more" :class="classes"><span class="shrink-0">{{ text ?? 'Learn More' }}</span><ArrowUpRight class="shrink-0 w-4 h-4"/></a>
  <router-link v-else :to="to" class="sspm-learn-more" :class="classes"><span class="shrink-0">{{ text ?? 'Learn More' }}</span><ArrowUpRight class="shrink-0 w-4 h-4"/></router-link>
</template>

<script>
import ArrowUpRight from '@/assets/img/arrow-up-right.svg'
export default {
  components: { ArrowUpRight },
  props: ['to', 'classes', 'href', 'text']
}
</script>

<style lang="scss">
.sspm-learn-more {
  @apply flex gap-2 items-center text-sspm-accent-600;
}
</style>