<template>
  <div class="border-b">
    <header class="container mx-auto px-3 lg:px-24 mt-3 flex w-full justify-between py-2 md:py-4 items-center gap-1 md:gap-2">
      <a href="https://www.sabbathschoolpersonalministries.org/" class="flex items-center flex-shrink-0">
        <img class="w-9 h-9 mr-2 md:mr-3" src="/assets/logo.png" />
        <div>
          <p class="text-xs md:text-sm font-bold leading-tight">Sabbath School and</p>
          <p class="text-xs md:text-sm font-bold leading-tight">Personal Ministries</p>
        </div>
      </a>

      <div class="flex items-center gap-1 md:gap-2">
        <SabbathSchoolButton />
        <AIJButton />
<!--      <PersonalMinistriesButton />-->
<!--      <DevotionalsButton />-->
        <LanguageButton />
        <LoginButton />
      </div>
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
