<template>
  <router-link :to="{name:'category', params: {lang: $route.params.lang, category: category.id }}" :class="`category-item`">
    <img :src="`https://picsum.photos/536/354?t=${Math.random()}`" class="category-item-cover" alt="" aria-hidden="true" />
    <div class="category-item-title">
      {{ category.title }}
    </div>
  </router-link>
</template>

<script>
export default {
  props: ['category']
}
</script>

<style lang="scss">
.category-item {
  @apply h-36 w-64 flex relative rounded;
  &-title {
    @apply flex items-center align-middle z-10 mx-auto justify-center w-full h-full text-center text-white text-3xl tracking-wide rounded;
    background: linear-gradient(to bottom, #00000080, #00000080)
  }
  &-cover {
    @apply absolute z-0 w-full h-full rounded shadow-xl object-cover;
  }
}
</style>