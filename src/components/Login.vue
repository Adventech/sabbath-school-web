<template>
  <div>
    <h3 class="text-3xl font-bold mb-6">Log in</h3>
    <div class="w-full flex flex-col items-center">
      <button class="w-52 max-w-52 mb-3" ref="googleLoginBtn"></button>
<!--      <div id="appleid-signin" class="z-10 w-52 h-10 signin-button" data-color="black" data-border="true" data-type="sign-in"></div>-->
    </div>
  </div>
</template>

<script>
import { authStore } from '@/stores/auth'
export default {
  data () {
    return {
      loaded: false
    }
  },
  methods: {
    handleCredentialResponse: async function(response) {
      try {
        let r = await this.$api.post(`/auth/signin/google`, { id_token: response.credential })
        authStore().setAccount(r.data)
        this.emitter.emit('auth-logged-in')
      } catch (err) {}
    },
    loadGSIClient: function () {
      return new Promise((resolve, reject) => {
        let googleSignIn = document.createElement('script')
        googleSignIn.setAttribute('src', 'https://accounts.google.com/gsi/client')
        googleSignIn.defer = true
        googleSignIn.async = true
        googleSignIn.onload = () => { resolve() }
        googleSignIn.onerror = () => { reject() }

        document.body.appendChild(googleSignIn)
      })
    },
    loadSIWAClient: function () {
      return new Promise((resolve, reject) => {
        let appleSignIn = document.createElement('script')
        appleSignIn.setAttribute('src', 'https://appleid.cdn-apple.com/appleauth/static/jsapi/appleid/1/en_US/appleid.auth.js')
        appleSignIn.defer = true
        appleSignIn.async = true
        appleSignIn.onload = () => { resolve() }
        appleSignIn.onerror = () => { reject() }

        document.body.appendChild(appleSignIn)
      })
    }
  },
  mounted () {
    let self = this
    this.loadGSIClient().then(() => {
      window.google.accounts.id.initialize({
        client_id: import.meta.env.VITE_APP_GOOGLE_CLIENT_ID,
        callback: this.handleCredentialResponse
      });
      window.google.accounts.id.renderButton(
          this.$refs.googleLoginBtn, { theme: "outline", size: "large" }
      );
    }).catch((err) => {
      console.log('error')
    })

    return
  }
}
</script>