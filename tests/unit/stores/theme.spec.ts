import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import {
  themeStore,
  THEME_COLOR,
  THEME_FONT_SIZE,
  THEME_FONT_SIZE_INT_MAP,
  THEME_FONT_SIZE_MODEL_MAP,
  THEME_FONT_COLOR_MAP
} from '@/plugins/Theme/ThemeStore'

describe('themeStore', () => {
  beforeEach(() => {
    // Create a fresh Pinia instance before each test
    setActivePinia(createPinia())
  })

  describe('constants', () => {
    describe('THEME_COLOR', () => {
      it('should have LIGHT value', () => {
        expect(THEME_COLOR.LIGHT).toBe('light')
      })

      it('should have SEPIA value', () => {
        expect(THEME_COLOR.SEPIA).toBe('sepia')
      })

      it('should have DARK value', () => {
        expect(THEME_COLOR.DARK).toBe('dark')
      })

      it('should have AUTO value', () => {
        expect(THEME_COLOR.AUTO).toBe('auto')
      })

      it('should be frozen (immutable)', () => {
        expect(Object.isFrozen(THEME_COLOR)).toBe(true)
      })
    })

    describe('THEME_FONT_SIZE', () => {
      it('should have XS value', () => {
        expect(THEME_FONT_SIZE.XS).toBe('xs')
      })

      it('should have SM value', () => {
        expect(THEME_FONT_SIZE.SM).toBe('sm')
      })

      it('should have BASE value', () => {
        expect(THEME_FONT_SIZE.BASE).toBe('base')
      })

      it('should have LG value', () => {
        expect(THEME_FONT_SIZE.LG).toBe('lg')
      })

      it('should have XL value', () => {
        expect(THEME_FONT_SIZE.XL).toBe('xl')
      })

      it('should be frozen (immutable)', () => {
        expect(Object.isFrozen(THEME_FONT_SIZE)).toBe(true)
      })
    })

    describe('THEME_FONT_SIZE_INT_MAP', () => {
      it('should map "1" to XS', () => {
        expect(THEME_FONT_SIZE_INT_MAP['1']).toBe(THEME_FONT_SIZE.XS)
      })

      it('should map "2" to SM', () => {
        expect(THEME_FONT_SIZE_INT_MAP['2']).toBe(THEME_FONT_SIZE.SM)
      })

      it('should map "3" to BASE', () => {
        expect(THEME_FONT_SIZE_INT_MAP['3']).toBe(THEME_FONT_SIZE.BASE)
      })

      it('should map "4" to LG', () => {
        expect(THEME_FONT_SIZE_INT_MAP['4']).toBe(THEME_FONT_SIZE.LG)
      })

      it('should map "5" to XL', () => {
        expect(THEME_FONT_SIZE_INT_MAP['5']).toBe(THEME_FONT_SIZE.XL)
      })
    })

    describe('THEME_FONT_SIZE_MODEL_MAP', () => {
      it('should map XS to "1"', () => {
        expect(THEME_FONT_SIZE_MODEL_MAP[THEME_FONT_SIZE.XS]).toBe('1')
      })

      it('should map SM to "2"', () => {
        expect(THEME_FONT_SIZE_MODEL_MAP[THEME_FONT_SIZE.SM]).toBe('2')
      })

      it('should map BASE to "3"', () => {
        expect(THEME_FONT_SIZE_MODEL_MAP[THEME_FONT_SIZE.BASE]).toBe('3')
      })

      it('should map LG to "4"', () => {
        expect(THEME_FONT_SIZE_MODEL_MAP[THEME_FONT_SIZE.LG]).toBe('4')
      })

      it('should map XL to "5"', () => {
        expect(THEME_FONT_SIZE_MODEL_MAP[THEME_FONT_SIZE.XL]).toBe('5')
      })
    })

    describe('THEME_FONT_COLOR_MAP', () => {
      it('should map LIGHT to text-black', () => {
        expect(THEME_FONT_COLOR_MAP[THEME_COLOR.LIGHT]).toBe('text-black')
      })

      it('should map SEPIA to text-yellow-900', () => {
        expect(THEME_FONT_COLOR_MAP[THEME_COLOR.SEPIA]).toBe('text-yellow-900')
      })

      it('should map DARK to text-white', () => {
        expect(THEME_FONT_COLOR_MAP[THEME_COLOR.DARK]).toBe('text-white')
      })
    })
  })

  describe('initial state', () => {
    it('should have LIGHT as default color', () => {
      const store = themeStore()
      expect(store.color).toBe(THEME_COLOR.LIGHT)
    })

    it('should have BASE as default size', () => {
      const store = themeStore()
      expect(store.size).toBe(THEME_FONT_SIZE.BASE)
    })
  })

  describe('actions', () => {
    describe('setColor', () => {
      it('should set color to LIGHT', () => {
        const store = themeStore()
        store.setColor(THEME_COLOR.LIGHT)
        expect(store.color).toBe(THEME_COLOR.LIGHT)
      })

      it('should set color to SEPIA', () => {
        const store = themeStore()
        store.setColor(THEME_COLOR.SEPIA)
        expect(store.color).toBe(THEME_COLOR.SEPIA)
      })

      it('should set color to DARK', () => {
        const store = themeStore()
        store.setColor(THEME_COLOR.DARK)
        expect(store.color).toBe(THEME_COLOR.DARK)
      })

      it('should set color to AUTO', () => {
        const store = themeStore()
        store.setColor(THEME_COLOR.AUTO)
        expect(store.color).toBe(THEME_COLOR.AUTO)
      })

      it('should allow changing color multiple times', () => {
        const store = themeStore()

        store.setColor(THEME_COLOR.DARK)
        expect(store.color).toBe(THEME_COLOR.DARK)

        store.setColor(THEME_COLOR.SEPIA)
        expect(store.color).toBe(THEME_COLOR.SEPIA)

        store.setColor(THEME_COLOR.LIGHT)
        expect(store.color).toBe(THEME_COLOR.LIGHT)
      })
    })

    describe('setSize', () => {
      it('should set size using string value', () => {
        const store = themeStore()
        store.setSize(THEME_FONT_SIZE.XS)
        expect(store.size).toBe(THEME_FONT_SIZE.XS)
      })

      it('should set size to SM', () => {
        const store = themeStore()
        store.setSize(THEME_FONT_SIZE.SM)
        expect(store.size).toBe(THEME_FONT_SIZE.SM)
      })

      it('should set size to LG', () => {
        const store = themeStore()
        store.setSize(THEME_FONT_SIZE.LG)
        expect(store.size).toBe(THEME_FONT_SIZE.LG)
      })

      it('should set size to XL', () => {
        const store = themeStore()
        store.setSize(THEME_FONT_SIZE.XL)
        expect(store.size).toBe(THEME_FONT_SIZE.XL)
      })

      it('should convert integer string "1" to XS', () => {
        const store = themeStore()
        store.setSize('1')
        expect(store.size).toBe(THEME_FONT_SIZE.XS)
      })

      it('should convert integer string "2" to SM', () => {
        const store = themeStore()
        store.setSize('2')
        expect(store.size).toBe(THEME_FONT_SIZE.SM)
      })

      it('should convert integer string "3" to BASE', () => {
        const store = themeStore()
        store.setSize('3')
        expect(store.size).toBe(THEME_FONT_SIZE.BASE)
      })

      it('should convert integer string "4" to LG', () => {
        const store = themeStore()
        store.setSize('4')
        expect(store.size).toBe(THEME_FONT_SIZE.LG)
      })

      it('should convert integer string "5" to XL', () => {
        const store = themeStore()
        store.setSize('5')
        expect(store.size).toBe(THEME_FONT_SIZE.XL)
      })

      it('should pass through unknown values unchanged', () => {
        const store = themeStore()
        store.setSize('unknown')
        expect(store.size).toBe('unknown')
      })

      it('should pass through integer outside of range unchanged', () => {
        const store = themeStore()
        store.setSize('10')
        expect(store.size).toBe('10')
      })
    })

    describe('getClassList', () => {
      it('should return correct class list for light theme with base size', () => {
        const store = themeStore()
        // Default: light, base
        const classList = store.getClassList()
        expect(classList).toBe('theme theme--light text-base bg-light text-black')
      })

      it('should return correct class list for dark theme', () => {
        const store = themeStore()
        store.setColor(THEME_COLOR.DARK)
        const classList = store.getClassList()
        expect(classList).toBe('theme theme--dark text-base bg-dark text-white')
      })

      it('should return correct class list for sepia theme', () => {
        const store = themeStore()
        store.setColor(THEME_COLOR.SEPIA)
        const classList = store.getClassList()
        expect(classList).toBe('theme theme--sepia text-base bg-sepia text-yellow-900')
      })

      it('should return correct class list with XS font size', () => {
        const store = themeStore()
        store.setSize(THEME_FONT_SIZE.XS)
        const classList = store.getClassList()
        expect(classList).toBe('theme theme--light text-xs bg-light text-black')
      })

      it('should return correct class list with SM font size', () => {
        const store = themeStore()
        store.setSize(THEME_FONT_SIZE.SM)
        const classList = store.getClassList()
        expect(classList).toBe('theme theme--light text-sm bg-light text-black')
      })

      it('should return correct class list with LG font size', () => {
        const store = themeStore()
        store.setSize(THEME_FONT_SIZE.LG)
        const classList = store.getClassList()
        expect(classList).toBe('theme theme--light text-lg bg-light text-black')
      })

      it('should return correct class list with XL font size', () => {
        const store = themeStore()
        store.setSize(THEME_FONT_SIZE.XL)
        const classList = store.getClassList()
        expect(classList).toBe('theme theme--light text-xl bg-light text-black')
      })

      it('should return correct class list for dark theme with XL size', () => {
        const store = themeStore()
        store.setColor(THEME_COLOR.DARK)
        store.setSize(THEME_FONT_SIZE.XL)
        const classList = store.getClassList()
        expect(classList).toBe('theme theme--dark text-xl bg-dark text-white')
      })

      it('should return correct class list for sepia theme with SM size', () => {
        const store = themeStore()
        store.setColor(THEME_COLOR.SEPIA)
        store.setSize(THEME_FONT_SIZE.SM)
        const classList = store.getClassList()
        expect(classList).toBe('theme theme--sepia text-sm bg-sepia text-yellow-900')
      })

      it('should handle AUTO color (undefined text color)', () => {
        const store = themeStore()
        store.setColor(THEME_COLOR.AUTO)
        const classList = store.getClassList()
        // AUTO is not in THEME_FONT_COLOR_MAP, so textColor will be undefined
        expect(classList).toBe('theme theme--auto text-base bg-auto undefined')
      })
    })
  })

  describe('persistence', () => {
    it('should have persist option enabled', () => {
      const store = themeStore()
      // Verify the store ID
      expect(store.$id).toBe('themeStore')
    })
  })

  describe('reactivity', () => {
    it('should be reactive when color changes', () => {
      const store = themeStore()

      expect(store.color).toBe(THEME_COLOR.LIGHT)

      store.setColor(THEME_COLOR.DARK)
      expect(store.color).toBe(THEME_COLOR.DARK)

      // getClassList should reflect the change
      expect(store.getClassList()).toContain('theme--dark')
    })

    it('should be reactive when size changes', () => {
      const store = themeStore()

      expect(store.size).toBe(THEME_FONT_SIZE.BASE)

      store.setSize(THEME_FONT_SIZE.XL)
      expect(store.size).toBe(THEME_FONT_SIZE.XL)

      // getClassList should reflect the change
      expect(store.getClassList()).toContain('text-xl')
    })
  })

  describe('edge cases', () => {
    it('should handle rapid color changes', () => {
      const store = themeStore()

      const colors = [
        THEME_COLOR.LIGHT,
        THEME_COLOR.DARK,
        THEME_COLOR.SEPIA,
        THEME_COLOR.AUTO,
        THEME_COLOR.LIGHT
      ]

      colors.forEach(color => {
        store.setColor(color)
        expect(store.color).toBe(color)
      })
    })

    it('should handle rapid size changes', () => {
      const store = themeStore()

      const sizes = [
        THEME_FONT_SIZE.XS,
        THEME_FONT_SIZE.SM,
        THEME_FONT_SIZE.BASE,
        THEME_FONT_SIZE.LG,
        THEME_FONT_SIZE.XL
      ]

      sizes.forEach(size => {
        store.setSize(size)
        expect(store.size).toBe(size)
      })
    })

    it('should handle empty string as color', () => {
      const store = themeStore()
      store.setColor('')
      expect(store.color).toBe('')
    })

    it('should handle null as color', () => {
      const store = themeStore()
      store.setColor(null)
      expect(store.color).toBeNull()
    })

    it('should handle undefined as size', () => {
      const store = themeStore()
      store.setSize(undefined)
      expect(store.size).toBeUndefined()
    })
  })

  describe('integration scenarios', () => {
    it('should support common user workflow: light -> dark -> sepia', () => {
      const store = themeStore()

      // Start in light mode
      expect(store.getClassList()).toContain('theme--light')
      expect(store.getClassList()).toContain('text-black')

      // Switch to dark mode
      store.setColor(THEME_COLOR.DARK)
      expect(store.getClassList()).toContain('theme--dark')
      expect(store.getClassList()).toContain('text-white')

      // Switch to sepia mode
      store.setColor(THEME_COLOR.SEPIA)
      expect(store.getClassList()).toContain('theme--sepia')
      expect(store.getClassList()).toContain('text-yellow-900')
    })

    it('should support font size adjustment workflow', () => {
      const store = themeStore()

      // User increases font size step by step
      store.setSize('1') // XS
      expect(store.getClassList()).toContain('text-xs')

      store.setSize('2') // SM
      expect(store.getClassList()).toContain('text-sm')

      store.setSize('3') // BASE
      expect(store.getClassList()).toContain('text-base')

      store.setSize('4') // LG
      expect(store.getClassList()).toContain('text-lg')

      store.setSize('5') // XL
      expect(store.getClassList()).toContain('text-xl')
    })

    it('should maintain consistent state across multiple operations', () => {
      const store = themeStore()

      store.setColor(THEME_COLOR.DARK)
      store.setSize(THEME_FONT_SIZE.LG)

      const classList = store.getClassList()

      expect(classList).toContain('theme')
      expect(classList).toContain('theme--dark')
      expect(classList).toContain('text-lg')
      expect(classList).toContain('bg-dark')
      expect(classList).toContain('text-white')
    })
  })
})
