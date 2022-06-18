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
  persist: true
})