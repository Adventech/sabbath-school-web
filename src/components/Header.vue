<template>
  <div class="border-b ">
    <header class="container mx-auto px-5 lg:px-24 mt-3 md:flex w-full justify-between py-4 items-center gap-2">
      <a href="https://www.sabbathschoolpersonalministries.org/" class="flex flex-grow justify-center md:justify-start mb-2 md:mb-0 items-center">
        <img class="w-9 h-9 mr-3" src="/assets/logo.png" />
        <div class="block md:hidden xl:block">
          <p class="font-bold leading-tight">Sabbath School and</p>
          <p class="font-bold leading-tight">Personal Ministries</p>
        </div>
      </a>

      <SabbathSchoolButton />
      <AIJButton />
<!--      <PersonalMinistriesButton />-->
<!--      <DevotionalsButton />-->
      <LanguageButton />
      <LoginButton />
    </header>
  </div>
</template>

<script setup>
import LanguageButton from '@/components/LanguageButton.vue'
import LoginButton from '@/components/LoginButton.vue'
import PersonalMinistriesButton from '@/components/PersonalMinistriesButton.vue'
import DevotionalsButton from '@/components/DevotionalsButton.vue'
import AIJButton from '@/components/AIJButton.vue'
import SabbathSchoolButton from '@/components/SabbathSchoolButton.vue'
</script>
