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
    title.value = `Contact us - Adult Bible Study Guides`
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
            apiKey: 'V1rvn50wcT9Jfu7MnNQE3Mx70hZ47NMOPEbJ6XrpvN+8Lg00gea5C/v9ZhA5sZOsVi19YAHImGSCb5SU9uch+7hlj5dTd4NfLke0hsPFgUK5IJA1WWkKp3lbqynp68R1r5vbzEmOKBig8jCYU/FwNUohaBMyg2OFvVrBNIz1xhmIRw8OKw1MOfsHBxfNeVc8RyKLXjDE9tuBl3RN15o9BSSDjj1pac93MOkk15p+OFeCZe8fX8icRfgTtO3VUFJg0ujATZWUDXEoi48wd51knK+TzoUG0IslxCJDaOeP/76/flfmDwtgJBlDKBpBVYr3MR0CWrHFC33cCJCbbwMzfDNq6ZliLkybQiGColTGJHxn5uP/k1VC7dbNsGC37i0T2R3DyztBvz5jy/5Wl3h0zBPhm1LFKP7zSJR6P5ADA85q0rvOWylH/37VvZ5rIuZVtKwmuhZyb3H5LPXq29vTmAgKxhWoQQOx50UiMVVgLysTgkG+mjmC+2XyJ92B+107J9zZeHm6IMX7zWZTLY+Mty/hO7muMxW5kMjlsiW5gLjIS54lHQSVxMuG0ub+9Rf9fLTGuut/o5XEvi1wziJMYJiHiE43vMJH7TitQ38KJKj7x7b2hhg9I9D6VegBKydkhjFIW21PwpXRg5n6/aQjBO2ea8/xwue6Eh7+Cq0cfqs=_0_1',
            onSuccess: () => {
              this.contacted = true
              this.$api.post('/misc/contact', {
                name: this.name,
                email: this.email,
                message: this.message,
                type: 'absg',
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