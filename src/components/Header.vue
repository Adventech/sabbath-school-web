<template>
  <header class="mt-3 md:flex w-full justify-between py-4 border-b items-center">
    <router-link :to="'/'" class="flex flex-grow justify-center md:justify-start mb-2 md:mb-0">
      <img class="w-9 h-9 mr-3" src="/assets/logo.png" />
      <p class="font-bold text-2xl">Sabbath School</p>
    </router-link>
    <div>
      <LanguageButton></LanguageButton>
    </div>

    <div v-if="authStore().isLoggedIn" class="ml-2">
      <UserProfileButton :displayName="authStore().displayName || 'Anonymous'"></UserProfileButton>
    </div>

    <button @click="loginWindow=true" v-if="!authStore().isLoggedIn" class="hover:bg-gray-200 p-2 rounded flex items-center">
      <ArrowRightOnRectangleIcon class="w-4 h-4 mr-2"></ArrowRightOnRectangleIcon> Login
    </button>
  </header>
  <Popup :open="loginWindow" @closed="loginWindow=false">
    <Login></Login>
  </Popup>
</template>

<script>
import { authStore } from '@/stores/auth'
import LanguageButton from '@/components/LanguageButton.vue'
import UserProfileButton from '@/components/UserProfileButton.vue'
import { ArrowRightOnRectangleIcon } from '@heroicons/vue/24/solid'
import Popup from '@/components/Popup.vue'
import Login from '@/components/Login.vue'
export default {
  components: { Login, Popup, LanguageButton, UserProfileButton, ArrowRightOnRectangleIcon },
  data () {
    return {
      authStore,
      loginWindow: false,
    }
  },
  created () {
    this.emitter.on('auth-login', () => {
      this.loginWindow = true
    })
    this.emitter.on('auth-logged-in', () => {
      this.loginWindow = false
    })
  }
}
</script>
