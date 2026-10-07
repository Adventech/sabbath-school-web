import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

import {
  THEME_COLOR,
  THEME_FONT_COLOR_MAP,
  THEME_FONT_SIZE,
  THEME_FONT_SIZE_INT_MAP,
  THEME_FONT_SIZE_MODEL_MAP,
  themeStore
} from '@/plugins/Theme/ThemeStore'

describe('themeStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('uses the light, base-sized theme by default', () => {
    const store = themeStore()

    expect(Object.isFrozen(THEME_COLOR)).toBe(true)
    expect(Object.isFrozen(THEME_FONT_SIZE)).toBe(true)
    expect(store.color).toBe(THEME_COLOR.LIGHT)
    expect(store.size).toBe(THEME_FONT_SIZE.BASE)
    expect(store.getClassList()).toBe('theme theme--light text-base bg-light text-black')
  })

  it.each(Object.entries(THEME_FONT_SIZE_INT_MAP))(
    'maps persisted size %s to %s',
    (model, size) => {
      const store = themeStore()

      store.setSize(model)

      expect(store.size).toBe(size)
      expect(THEME_FONT_SIZE_MODEL_MAP[size]).toBe(model)
    }
  )

  it('preserves an already-normalized size', () => {
    const store = themeStore()

    store.setSize(THEME_FONT_SIZE.XL)

    expect(store.size).toBe(THEME_FONT_SIZE.XL)
  })

  it.each(Object.keys(THEME_FONT_COLOR_MAP))('applies the %s theme', (color) => {
    const store = themeStore()

    store.setColor(color)

    expect(store.color).toBe(color)
    expect(store.getClassList()).toContain(`theme--${color}`)
    expect(store.getClassList()).toContain(`${THEME_FONT_COLOR_MAP[color]}`)
  })
})
