<template>
  <div class="overflow-x-auto">
    <table class="block-table">
      <thead>
      <tr>
        <th v-for="column in block.header">
          <template
              v-for="item in column.items"
              :key="item.id">
            <Block
                :block="item"
                :parentBlockType="block.type"
            ></Block>
          </template>
        </th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="row in block.rows">
        <td v-for="column in row">
          <template
              v-for="item in column.items"
              :key="item.id">
            <Block
                :block="item"
                :parentBlockType="block.type"
            ></Block>
          </template>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: ['block', 'parent'],
}
</script>

<style lang="scss">
.block-table {
  @apply table-fixed w-full min-w-[700px]
  border border-gray-200
  theme-dark:border-gray-800
  theme-sepia:border-amber-400;

  th {
    @apply

    bg-gray-200
    theme-dark:bg-black
    theme-sepia:bg-amber-100;
  }
  th, td {
    @apply break-all align-top p-0
    border border-gray-200
    theme-dark:border-gray-800
    theme-sepia:border-amber-300;
    > div {
      @apply py-2 #{!important};

    }
  }
}
</style>