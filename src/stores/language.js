import { defineStore } from 'pinia'

/**
 * Languages that use right-to-left text direction
 * Required for WCAG 1.3.2 Meaningful Sequence (Level A) compliance
 */
const RTL_LANGUAGES = ['ar', 'he', 'fa']

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
    },
    /**
     * Check if current language is RTL
     */
    isRTL(state) {
      return RTL_LANGUAGES.includes(state.locale.code)
    },
    /**
     * Get direction value for current language
     */
    direction(state) {
      return RTL_LANGUAGES.includes(state.locale.code) ? 'rtl' : 'ltr'
    }
  },
  persist: true
})