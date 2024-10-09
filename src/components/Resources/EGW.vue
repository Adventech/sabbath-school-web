<template>
  <div class="flex flex-col gap-3 p-4">
    <Block v-for="block in egwBlocks" :block="block" :key="`egw_block_${block.id}`" :ignoreStyles="true"></Block>
  </div>
</template>

<script>
export default {
  props: ['egwData', 'reference'],
  data () {
    return {
      egwBlocks: [],
    }
  },
  mounted () {
    if (this.egwData) {
      this.egwBlocks = this.egwData[this.reference]
    }
  },
}
</script>

<style lang="scss">

</style>