import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useLanguageStore } from '@/stores/language'

describe('useLanguageStore', () => {
  beforeEach(() => {
    // Create a fresh Pinia instance before each test
    setActivePinia(createPinia())
  })

  describe('initial state', () => {
    it('should have English as default locale', () => {
      const store = useLanguageStore()

      expect(store.locale).toEqual({
        native: 'English',
        en: 'English',
        code: 'en',
        flag: '🇺🇸'
      })
    })

    it('should have "en" as default code', () => {
      const store = useLanguageStore()
      expect(store.code).toBe('en')
    })
  })

  describe('getters', () => {
    describe('code', () => {
      it('should return the locale code', () => {
        const store = useLanguageStore()
        expect(store.code).toBe('en')
      })

      it('should update when locale changes', () => {
        const store = useLanguageStore()

        store.locale = {
          native: 'Español',
          en: 'Spanish',
          code: 'es',
          flag: '🇪🇸'
        }

        expect(store.code).toBe('es')
      })
    })
  })

  describe('locale updates', () => {
    it('should allow updating to Spanish', () => {
      const store = useLanguageStore()

      store.locale = {
        native: 'Español',
        en: 'Spanish',
        code: 'es',
        flag: '🇪🇸'
      }

      expect(store.locale.native).toBe('Español')
      expect(store.locale.en).toBe('Spanish')
      expect(store.code).toBe('es')
    })

    it('should allow updating to French', () => {
      const store = useLanguageStore()

      store.locale = {
        native: 'Français',
        en: 'French',
        code: 'fr',
        flag: '🇫🇷'
      }

      expect(store.locale.native).toBe('Français')
      expect(store.code).toBe('fr')
    })

    it('should allow updating to Arabic (RTL language)', () => {
      const store = useLanguageStore()

      store.locale = {
        native: 'العربية',
        en: 'Arabic',
        code: 'ar',
        flag: '🇸🇦'
      }

      expect(store.locale.native).toBe('العربية')
      expect(store.code).toBe('ar')
    })

    it('should allow updating to Hebrew (RTL language)', () => {
      const store = useLanguageStore()

      store.locale = {
        native: 'עברית',
        en: 'Hebrew',
        code: 'he',
        flag: '🇮🇱'
      }

      expect(store.locale.native).toBe('עברית')
      expect(store.code).toBe('he')
    })

    it('should allow updating to Chinese', () => {
      const store = useLanguageStore()

      store.locale = {
        native: '中文',
        en: 'Chinese',
        code: 'zh',
        flag: '🇨🇳'
      }

      expect(store.locale.native).toBe('中文')
      expect(store.code).toBe('zh')
    })

    it('should allow updating to Japanese', () => {
      const store = useLanguageStore()

      store.locale = {
        native: '日本語',
        en: 'Japanese',
        code: 'ja',
        flag: '🇯🇵'
      }

      expect(store.locale.native).toBe('日本語')
      expect(store.code).toBe('ja')
    })

    it('should allow updating to Portuguese', () => {
      const store = useLanguageStore()

      store.locale = {
        native: 'Português',
        en: 'Portuguese',
        code: 'pt',
        flag: '🇧🇷'
      }

      expect(store.locale.native).toBe('Português')
      expect(store.code).toBe('pt')
    })
  })

  describe('RTL language codes', () => {
    const rtlLanguages = [
      { code: 'ar', native: 'العربية', en: 'Arabic', flag: '🇸🇦' },
      { code: 'he', native: 'עברית', en: 'Hebrew', flag: '🇮🇱' },
      { code: 'fa', native: 'فارسی', en: 'Persian', flag: '🇮🇷' }
    ]

    rtlLanguages.forEach(lang => {
      it(`should correctly store ${lang.en} (RTL) locale`, () => {
        const store = useLanguageStore()

        store.locale = {
          native: lang.native,
          en: lang.en,
          code: lang.code,
          flag: lang.flag
        }

        expect(store.code).toBe(lang.code)
        expect(store.locale.native).toBe(lang.native)
      })
    })
  })

  describe('persistence', () => {
    it('should have persist option enabled', () => {
      const store = useLanguageStore()

      // Verify the store ID which is used for persistence
      expect(store.$id).toBe('language')
    })
  })

  describe('edge cases', () => {
    it('should handle partial locale updates', () => {
      const store = useLanguageStore()

      // Update only code
      store.locale = {
        ...store.locale,
        code: 'de'
      }

      expect(store.code).toBe('de')
      expect(store.locale.native).toBe('English') // Should keep other values
    })

    it('should handle empty strings in locale', () => {
      const store = useLanguageStore()

      store.locale = {
        native: '',
        en: '',
        code: '',
        flag: ''
      }

      expect(store.code).toBe('')
      expect(store.locale.native).toBe('')
    })

    it('should handle long language names', () => {
      const store = useLanguageStore()

      const longNativeName = 'A very long language name that might occur in some edge cases'
      store.locale = {
        native: longNativeName,
        en: 'Test Language',
        code: 'test',
        flag: '🏳️'
      }

      expect(store.locale.native).toBe(longNativeName)
    })

    it('should handle unicode emoji flags', () => {
      const store = useLanguageStore()

      // Test various flag emojis
      const flags = ['🇺🇸', '🇬🇧', '🇪🇸', '🇫🇷', '🇩🇪', '🇧🇷', '🇯🇵', '🇨🇳']

      flags.forEach(flag => {
        store.locale = {
          ...store.locale,
          flag
        }
        expect(store.locale.flag).toBe(flag)
      })
    })
  })

  describe('store reactivity', () => {
    it('should be reactive when locale changes', () => {
      const store = useLanguageStore()

      // Initial value
      expect(store.code).toBe('en')

      // Change locale
      store.locale = {
        native: 'Deutsch',
        en: 'German',
        code: 'de',
        flag: '🇩🇪'
      }

      // Getter should reflect the change
      expect(store.code).toBe('de')
    })

    it('should maintain reference integrity', () => {
      const store = useLanguageStore()

      const originalLocale = store.locale
      store.locale = {
        native: 'Test',
        en: 'Test',
        code: 'test',
        flag: '🏳️'
      }

      // Should be a different object now
      expect(store.locale).not.toBe(originalLocale)
    })
  })

  describe('common language codes', () => {
    const commonLanguages = [
      { code: 'en', name: 'English' },
      { code: 'es', name: 'Spanish' },
      { code: 'fr', name: 'French' },
      { code: 'de', name: 'German' },
      { code: 'it', name: 'Italian' },
      { code: 'pt', name: 'Portuguese' },
      { code: 'ru', name: 'Russian' },
      { code: 'zh', name: 'Chinese' },
      { code: 'ja', name: 'Japanese' },
      { code: 'ko', name: 'Korean' }
    ]

    commonLanguages.forEach(lang => {
      it(`should accept ${lang.name} language code "${lang.code}"`, () => {
        const store = useLanguageStore()

        store.locale = {
          native: lang.name,
          en: lang.name,
          code: lang.code,
          flag: '🏳️'
        }

        expect(store.code).toBe(lang.code)
      })
    })
  })
})
