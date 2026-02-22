<template>
  <div class="flex flex-col gap-5 lg:gap-10 my-5 lg:my-10">
    <div class="sspm-container flex flex-col gap-10">
      <div class="flex flex-col gap-3">
        <p class="text-center sm:text-left lg:max-w-[64%] xl:max-w-[70%] leading-tight text-3xl font-bold text-sspm-accent-800">Adult Bible Study Guide Accessibility</p>
        <p class="text-center sm:text-left text-black/70">The Sabbath School and Personal Ministries department seeks to make our Bible study
          resources accessible to all people. For those who have vision or hearing impairment we
          hope the resources on this page can be a benefit to you.</p>
      </div>

      <img class="rounded-xl aspect-[16/5] object-cover my-5" src="/assets/img/sspm-absg-accessibility.jpg" />

      <p><strong>Braille code for the blind</strong>. Some regions of the world offer braille versions of the <em>Adult
        Bible Study Guide</em> to serve the spiritual needs of the blind.</p>

      <p class="ml-10"><strong>North America</strong> – <a class="underline text-ss-primary" href="https://christianrecord.org/member-services/magazines.html" target="_blank">Christian Record Services</a> offers subscriptions for the Adult Bible Study Guide in braille for users in North American region.</p>
      <p class="ml-10"><strong>Australia</strong> – <a class="underline text-ss-primary" href="https://csfbhi.adventistchurch.com" target="_blank">Christian Vision &amp; Hearing Services</a> offers Sabbath Schools lessons in braille for users in Australia.</p>
      <p class="ml-10"><strong>Ghana</strong> – Possibility Ministries in the <a class="underline text-ss-primary" href="https://swgucadventist.org" target="_blank">Southern Ghana Union Conference</a> offers braille Sabbath School lessons for users in Ghana.</p>

      <p><strong>Large print for low vision.</strong> Some areas of the world print large print editions of the <em>Adult Bible Study Guide</em>. In North America, subscriptions to the large print edition printed by Pacific Press can be ordered through the <a class="underline text-ss-primary" href="https://adventistbookcenter.com/large-print-adult-bible-study-guide-subscription.html" target="_blank">Adventist Book Center website</a>.</p>

      <p><strong>Audio recordings of the lesson.</strong> Our Sabbath School and Personal Ministries app and website include free audio recordings for each week’s Sabbath School lesson. Click on the headset icon in each week’s lesson to listen to audio.</p>

      <p><strong>Easy reading for the Deaf community</strong>. The <em>Easy Reading</em> edition of the <em>Adult Sabbath School Bible Study Guides</em> serves the spiritual needs of the Adventist Deaf community. The Sabbath School and Personal Ministries app and website offer digital access to the <em>Easy Reading</em> version.</p>
    </div>
  </div>
</template>

<script>
import { useTitle } from "@vueuse/core"

export default {
  mounted () {
    const title = useTitle()
    title.value = `Accessibility - Adult Bible Study Guides`
  }
}
</script>

<style lang="scss" scoped>
@import '@/absg.css';
.absg-scope-sequence {
  @apply min-w-full table-auto;
  thead {
    @apply bg-sspm-accent-1000 text-white;
    td {
      @apply p-6;
      &:first-child {
        @apply rounded-tl-xl;
      }
      &:last-child {
        @apply rounded-tr-xl;
      }
    }
  }
  tbody {
    tr {
      td {
        @apply p-6 text-gray-500;
      }
      &:nth-child(odd) {
        @apply bg-gray-100;
      }
      &:last-child {
        td {
          &:first-child {
            @apply rounded-bl-xl;
          }
          &:last-child {
            @apply rounded-br-xl;
          }
        }
      }
    }
  }
}
</style>