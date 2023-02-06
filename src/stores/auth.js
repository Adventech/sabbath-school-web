import { defineStore } from 'pinia'

export const authStore = defineStore({
  id: 'auth',
  state: () => ({
    uid: null,
    displayName: null,
    email: null,
    stsTokenManager: null,
    isAnonymous: null
  }),
  getters: {
    userObject: (state) => {
      return {
        uid: state.uid,
        displayName: state.displayName,
        email: state.email,
        stsTokenManager: state.stsTokenManager,
        isAnonymous: state.isAnonymous,
      }
    },
    isLoggedIn: (state) => {
      return state.displayName || state.isAnonymous
    }
  },
  actions: {
    setAccount(account) {
      this.uid = account.uid
      this.displayName = account.displayName
      this.email = account.email
      this.stsTokenManager = account.stsTokenManager
      this.isAnonymouse = account.isAnonymous
    },

    logOut: function () {
      this.uid = null
      this.displayName = null
      this.email = null
      this.stsTokenManager = null
      this.isAnonymouse = null
    }
  },
  persist: true
})