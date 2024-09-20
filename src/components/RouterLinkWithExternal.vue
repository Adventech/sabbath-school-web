<template>
  <template v-if="externalURL">
    <a :href="externalURL" class="block" target="_blank"><slot/></a>
  </template>
  <template v-else>
    <router-link :to="to" class="block"><slot/></router-link>
  </template>
</template>

<script>
export default {
  props: ['externalURL', 'to']
}
</script>