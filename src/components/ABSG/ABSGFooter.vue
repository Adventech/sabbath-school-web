<template>
  <footer class="footer-absg">
    <div class="footer-absg-content">
      <div class="footer-absg-inner footer-absg-menu">
        <div class="footer-absg-menu-title">An official website of the Seventh-day Adventist Church</div>

        <ul class="footer-absg-menu-social-media">
          <li><a href="https://www.facebook.com/TheAdventistChurch">Facebook</a></li>
          <li><a href="https://www.instagram.com/adventistchurch">Instagram</a></li>
        </ul>

        <ul class="footer-absg-menu-links">
          <li><a href="https://www.adultbiblestudyguide.org/translator"><ABSGFooterLock class="w-3" /> Translators</a></li>
          <li><a href="https://www.adultbiblestudyguide.org/residents"><ABSGFooterLock class="w-3" /> Manuscript Evaluation – Residents</a></li>
          <li><a href="https://www.adultbiblestudyguide.org/world"><ABSGFooterLock class="w-3" /> Manuscript Evaluation – World</a></li>
          <li><a href="https://www.adultbiblestudyguide.org/resource-login"><ABSGFooterLock class="w-3" /> Publishing House Resource Login</a></li>
          <li><a href="https://www.adventist.org/en/copyright/legal-notic/"><ABSGFooterLink /> Legal Notice</a></li>
          <li><a href="https://privacy.adventist.org/"><ABSGFooterLink /> Privacy Policy</a></li>
          <li><router-link :to="{'name': 'contact'}"><ABSGFooterLink /> Contact</router-link></li>
        </ul>
      </div>
    </div>

    <div class="footer-absg-copyright">
      <p>© {{ year }} General Conference of Seventh-day Adventists</p>
      <p>12501 Old Columbia Pike Silver Spring, MD 20904-6601 USA +1-301-680-6000</p>
    </div>
  </footer>
</template>

<script setup>
import ABSGFooterLock from '@/assets/img/lock-icon.svg'
import ABSGFooterLink from '@/assets/img/sspm-footer-link.svg'
import { ref } from 'vue'

const year = ref(new Date().getFullYear())
</script>

<style lang="scss" scoped>
.footer-absg {
  @apply relative w-full;

  &-content {
    @apply flex flex-col gap-10;
  }

  &-inner {
    @apply container mx-auto lg:px-32;
  }

  &-menu {
    @apply footer-absg-inner px-10 pt-10 flex justify-between flex-col lg:flex-row gap-5 lg:gap-0;

    &-title {
      @apply xl:w-6/12 text-lg;
    }

    &-social-media {
      @apply uppercase flex flex-col text-sm;
    }
    &-links {
      @apply uppercase flex flex-col font-normal text-xs gap-1;
      & > li > a {
        @apply flex flex-row gap-2 items-center;
        & > svg {
          @apply w-4;
        }
      }
    }
  }

  &-copyright {
    @apply footer-absg-inner font-normal text-xs p-10;
  }

  font-weight: 500;
  @apply text-gray-500 bg-gray-100;
}
</style>