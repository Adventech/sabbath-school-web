import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import { useLanguageStore } from '@/stores/language'

describe('useLanguageStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('starts with the English locale', () => {
    const store = useLanguageStore()

    expect(store.locale.native).toBe('English')
    expect(store.locale.en).toBe('English')
    expect(store.code).toBe('en')
  })

  it('derives the code from the current locale', () => {
    const store = useLanguageStore()

    store.locale = {
      native: 'Español',
      en: 'Spanish',
      code: 'es',
      flag: '🇪🇸'
    }

    expect(store.code).toBe('es')
  })

  it('does not share state between Pinia instances', () => {
    const first = useLanguageStore()
    first.locale = { ...first.locale, code: 'de' }

    setActivePinia(createPinia())

    expect(useLanguageStore().code).toBe('en')
  })
})
