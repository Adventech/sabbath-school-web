import { defineStore } from 'pinia'
import { READER_THEME, readerOptionsStore } from '@/components/Reader/ReaderOptionsStore'

export const THEME_COLOR = Object.freeze({
  LIGHT: "light",
  SEPIA: "sepia",
  DARK: "dark",
  AUTO: "auto",
})

export const THEME_FONT_SIZE = Object.freeze({
  XS: "xs",
  SM: "sm",
  BASE: "base",
  LG: "lg",
  XL: "xl",
})

export const THEME_FONT_SIZE_INT_MAP = {
  "1": THEME_FONT_SIZE.XS,
  "2": THEME_FONT_SIZE.SM,
  "3": THEME_FONT_SIZE.BASE,
  "4": THEME_FONT_SIZE.LG,
  "5": THEME_FONT_SIZE.XL,
}

export const THEME_FONT_SIZE_MODEL_MAP = {
  [THEME_FONT_SIZE.XS]: "1",
  [THEME_FONT_SIZE.SM]: "2",
  [THEME_FONT_SIZE.BASE]: "3",
  [THEME_FONT_SIZE.LG]: "4",
  [THEME_FONT_SIZE.XL]: "5",
}

export const THEME_FONT_COLOR_MAP = {
  [THEME_COLOR.LIGHT]: "text-black",
  [THEME_COLOR.SEPIA]: "text-yellow-900",
  [THEME_COLOR.DARK]: "text-white",
}

const THEME_TO_READER_MAP = {
  [THEME_COLOR.LIGHT]: READER_THEME.LIGHT,
  [THEME_COLOR.SEPIA]: READER_THEME.SEPIA,
  [THEME_COLOR.DARK]: READER_THEME.DARK,
}

const READER_TO_THEME_MAP = {
  [READER_THEME.LIGHT]: THEME_COLOR.LIGHT,
  [READER_THEME.SEPIA]: THEME_COLOR.SEPIA,
  [READER_THEME.DARK]: THEME_COLOR.DARK,
  [READER_THEME.AUTO]: THEME_COLOR.LIGHT,
}

export const themeStore = defineStore({
  id: 'themeStore',
  state: () => ({
    color: THEME_COLOR.LIGHT,
    size: THEME_FONT_SIZE.BASE,
  }),
  actions: {
    setColor(color) {
      this.color = color
      const readerTheme = THEME_TO_READER_MAP[color]
      if (readerTheme && readerOptionsStore().theme !== readerTheme) {
        readerOptionsStore().setTheme(readerTheme)
      }
    },
    setSize(size) {
      this.size = THEME_FONT_SIZE_INT_MAP[size] ? THEME_FONT_SIZE_INT_MAP[size] : size
    },
    getClassList () {
      let themedTextColor = THEME_FONT_COLOR_MAP[this.color]
      return `theme theme--${this.color} text-${this.size} bg-app text-app-primary ${themedTextColor}`.trim()
    },
    syncFromReader() {
      const readerTheme = readerOptionsStore().theme

      let themeColor
      if (readerTheme === READER_THEME.AUTO) {
        const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
        themeColor = prefersDark ? THEME_COLOR.DARK : THEME_COLOR.LIGHT
      } else {
        themeColor = READER_TO_THEME_MAP[readerTheme] || THEME_COLOR.LIGHT
      }

      if (this.color !== themeColor) {
        this.color = themeColor
      }
    },
    initializeFromReader() {
      if (!this._initialized) {
        this.syncFromReader()
        this._initialized = true
      }
    },
  },
  persist: true
})