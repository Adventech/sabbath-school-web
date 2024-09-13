<template>
  <div>
    <div v-if="authStore().isLoggedIn">
      <UserProfileButton :displayName="authStore().displayName || 'Anonymous'"></UserProfileButton>
    </div>

    <button @click="loginWindow=true" v-if="!authStore().isLoggedIn" class="hover:bg-gray-200 p-2 rounded flex items-center">
      <ArrowRightOnRectangleIcon class="w-4 h-4"></ArrowRightOnRectangleIcon> Login
    </button>

    <Popup :open="loginWindow" @closed="loginWindow=false">
      <Login></Login>
    </Popup>
  </div>
</template>

<script>
import { authStore } from '@/stores/auth'
import UserProfileButton from '@/components/UserProfileButton.vue'
import { ArrowRightOnRectangleIcon } from '@heroicons/vue/24/solid'
import Popup from '@/components/Popup.vue'
import Login from '@/components/Login.vue'

export default {
  components: { Login, Popup, UserProfileButton, ArrowRightOnRectangleIcon },
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