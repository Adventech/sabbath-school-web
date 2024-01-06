<template>
  <router-link :to="{name: 'categories', params: {lang: 'en'}}" class="flex gap-2 hover:bg-gray-200 hover:bg-gray-200 p-2 rounded">
    <CategoriesIcon class="w-5 text-blue-700"></CategoriesIcon> Categories
  </router-link>
</template>

<script>
import CategoriesIcon from '@/assets/img/categories-icon.svg'
export default {
  components: { CategoriesIcon }
}
</script>
