<template>
  <div class="flex flex-col gap-5 lg:gap-10 my-5 lg:my-10">
    <div class="sspm-container flex flex-col gap-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div class="flex flex-col gap-4">
          <p class="text-2xl font-bold">Contact us</p>
          <p class="">We welcome your feedback and will do our best to respond to your specific needs in a timely way.</p>
          <p class="">To reach us by email please complete the form below.</p>

          <div>
            <form class="flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                <label for="name">Name*</label>
                <input class="rounded border p-2 border-gray-100" type="text" id="name" name="name" placeholder="Enter your name" />
              </div>

              <div class="flex flex-col gap-2">
                <label for="email">Email*</label>
                <input class="rounded border p-2 border-gray-100" type="text" id="email" name="email" placeholder="Enter your email" />
              </div>

              <div class="flex flex-col gap-2">
                <label for="message">Message*</label>
                <textarea class="rounded border p-2 border-gray-100 min-h-44" name="message" id="message" placeholder="Type your message..."></textarea>
              </div>

              <p class="text-black/70 text-sm">
                All queries, comments, or other correspondence relating to the Adult Bible Study Guide/Adult Sabbath School Quarterly should be directed to their editorial office. All emails received regarding that publication will be forwarded to their editorial office.
              </p>

              <div>
                <button class="px-6 py-3 rounded-full text-white bg-sspm-accent-600 flex gap-2" type="submit"><span>Send your Message</span><ArrowUpRight class="shrink-0 w-4"></ArrowUpRight></button>
              </div>
            </form>
          </div>
        </div>
        <div>
          <img class="aspect-[3/3.5] rounded shadow object-cover" src="/assets/img/sspm-absg-contact.jpg" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArrowUpRight from '@/assets/img/arrow-up-right.svg'
import { useTitle } from "@vueuse/core"

export default {
  components: { ArrowUpRight },
  mounted () {
    const title = useTitle()
    title.value = `Contact us - InVerse Bible Study Guides`
  }
}
</script>

<style lang="scss" scoped>
@import '@/absg.css';
</style>