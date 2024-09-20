<template>
  <router-link :to="{name: 'resources', params: {lang: 'en', resourceType: 'pm'}}" class="flex gap-2 hover:bg-gray-200 hover:bg-gray-200 p-2 rounded">
    <PersonalMinistriesIcon class="w-4 text-blue-700"></PersonalMinistriesIcon> Personal Ministries
  </router-link>
</template>

<script>
import PersonalMinistriesIcon from '@/assets/img/personal-ministries-icon.svg'
export default {
  components: { PersonalMinistriesIcon }
}
</script>
