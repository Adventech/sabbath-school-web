<template>
  <div class="flex flex-col gap-5 lg:gap-10 my-5 lg:my-10">
    <div class="sspm-container flex flex-col gap-10">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-20">
        <div class="flex flex-col gap-4">
          <p class="text-2xl font-bold">Contact us</p>
          <p class="">We welcome your feedback and will do our best to respond to your specific needs in a timely way.</p>
          <p class="">To reach us by email please complete the form below.</p>

          <div v-if="!contacted">
            <form @submit.prevent="sendMessage()" class="flex flex-col gap-4">
              <div class="flex flex-col gap-2">
                <label for="name">Name*</label>
                <input v-model="name" class="rounded border p-2 border-gray-100" type="text" id="name" name="name" placeholder="Enter your name" required minlength="2" />
              </div>

              <div class="flex flex-col gap-2">
                <label for="email">Email*</label>
                <input v-model="email" class="rounded border p-2 border-gray-100" type="email" id="email" name="email" placeholder="Enter your email" required />
              </div>

              <div class="flex flex-col gap-2">
                <label for="message">Message*</label>
                <textarea v-model="message" class="rounded border p-2 border-gray-100 min-h-44" name="message" id="message" placeholder="Type your message..." required minlength="10"></textarea>
              </div>

              <p class="text-black/70 text-sm">
                All queries, comments, or other correspondence relating to the Adult Bible Study Guide/Adult Sabbath School Quarterly should be directed to their editorial office. All emails received regarding that publication will be forwarded to their editorial office.
              </p>

              <div id="my-captcha-container"></div>

              <div>
                <button class="px-6 py-3 rounded-full text-white bg-sspm-accent-600 flex gap-2" type="submit"><span>Send your Message</span><ArrowUpRight class="shrink-0 w-4"></ArrowUpRight></button>
              </div>
            </form>
          </div>
          <div v-else class="p-4 rounded-xl bg-gray-100 text-center">
            <p class="text-lg">Thank you! You message have been successfully sent.</p>
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
  data () {
    return {
      email: '',
      name: '',
      message: '',
      contacted: false,
    }
  },
  mounted () {
    const title = useTitle()
    title.value = `Contact us - InVerse Bible Study Guides`
    const script = document.createElement("script")
    script.src = "https://a22ca26954ac.us-east-1.captcha-sdk.awswaf.com/a22ca26954ac/jsapi.js"
    script.defer = true
    document.head.appendChild(script)
  },

  methods: {
    sendMessage () {
      AwsWafCaptcha.renderCaptcha(
          document.getElementById('my-captcha-container'),
          {
            apiKey: 'nKZE+LgFtIM5kq7u0ZVU3KKMqlzQz0oVpZsQVD3XRMF/NWEF8Q9Ipo6GJtC1lMUwN/0SGL5CEzNqnm7yJyq+yDukcqdClmZGqIjTHeWm5CDXQ0cWdS3Z6Ss4vwW38CLEeZwWiOB5m/R6eqCZ7tC2JYAKlSbECtyOc6DE+xRS9RahsJtL37+zqNuPagqr16ZLspeSAxcdISSIuz71RtZORNT//cdDMNQxsDCio+76N8gg7Q0cgO1mh7+Efc3FZNycCgy7xLfORv9tupaWBgz934yM2FFKojC6LM36KXpY2FRBfeeGooZXzMZaljQr0k0gFV41hMeECEa5KYJQKaZhe8cytDvH4SyGLAas9UwLFTOVDKMq2qS7mCe3xHUASUPKEEntXXH9N0PSqyNqqGtm93OfaL6TjbMq4eCu+IzBghwQhJjJ40WeZzxmGnN/x6fEnoeVTpg2ifxATTuZZolBb6rYleE6tgoLEDHcmhMGnE9wTKn04J17iA0FfGmStzCSG3FaJ1vvsYxWPrVgvovkkdvIqvK4KSMG9WXRnxCOQMcS9pWeY3TozdOBshUVos+vsYaeXPu4WjWvXETcTjecNPwDG390x1RCtizF+oOzes5lrU/63U2rmRm+Dgj/O0QN8kURW8mLBVgHbQKz2lk6wlOt1xmjgWr7dpxHJxnPxCo=_0_1',
            onSuccess: () => {
              this.contacted = true
              this.$api.post('/misc/contact', {
                name: this.name,
                email: this.email,
                message: this.message,
                type: 'inverse',
              })
            },
            onError: (err) => {
              // console.error('CAPTCHA error', err);
            }
          }
      );
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/absg.css';
</style>