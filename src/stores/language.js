import { defineStore } from 'pinia'

export const useLanguageStore = defineStore({
  id: 'language',
  state: () => ({
    locale: {
      native: "English",
      en: "English",
      code: "en",
      flag: "🇺🇸",
    }
  }),
  getters: {
    code(state) {
      return state.locale.code
    }
  },
  persist: true
})