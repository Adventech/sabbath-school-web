<template>
  <footer class="footer-aij">
    <div class="footer-aij-content">
      <div class="footer-aij-inner footer-aij-menu">
        <div class="footer-aij-menu-title">An official website of the Seventh-day Adventist Church</div>

        <ul class="footer-aij-menu-social-media">
          <li><a href="https://www.facebook.com/TheAdventistChurch">Facebook</a></li>
          <li><a href="https://www.instagram.com/adventistchurch">Instagram</a></li>
        </ul>
        <ul class="footer-aij-menu-links">
          <li><a href="https://www.sabbathschoolpersonalministries.org"><AIJFooterLink /> Sabbath School and Personal Ministries</a></li>
          <li><a href="https://identity.adventist.org/legal"><AIJFooterLink /> Trademark and Logo Usage</a></li>
          <li><a href="https://www.adventist.org/en/copyright/legal-notic/"><AIJFooterLink /> Legal Notice</a></li>
          <li><a href="https://privacy.adventist.org/"><AIJFooterLink /> Privacy Policy</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-aij-copyright">
      <p>© {{ year }} General Conference of Seventh-day Adventists</p>
      <p>12501 Old Columbia Pike Silver Spring, MD 20904-6601 USA +1-301-680-6000</p>
    </div>
  </footer>
</template>

<script setup>
import AIJFooterLink from '@/assets/img/aij-footer-link.svg'
import { ref } from 'vue'

const year = ref(new Date().getFullYear())
</script>

<style lang="scss">
.footer-aij {
  @apply relative w-full min-h-64 bg-cover bg-top bg-no-repeat;

  &-content {
    @apply flex flex-col gap-10;
  }

  &-inner {
    @apply container mx-auto lg:px-32;
  }

  &-menu {
    @apply footer-aij-inner px-10 pt-44 lg:pt-72 flex justify-between flex-col lg:flex-row gap-5 lg:gap-0;

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
      }
    }
  }

  &-copyright {
    @apply footer-aij-inner font-normal text-xs p-10;
  }

  font-family: 'manrope';
  font-weight: 500;
  color: #324156B8;
  background-image: url('@/assets/img/aij-babies-footer.svg');
  min-height: 550px;
}
</style>