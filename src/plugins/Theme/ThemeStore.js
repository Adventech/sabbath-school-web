import { defineStore } from 'pinia'

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

export const themeStore = defineStore({
  id: 'themeStore',
  state: () => ({
    color: THEME_COLOR.LIGHT,
    size: THEME_FONT_SIZE.BASE,
  }),
  actions: {
    setColor(color) {
      this.color = color
    },
    setSize(size) {
      this.size = THEME_FONT_SIZE_INT_MAP[size] ? THEME_FONT_SIZE_INT_MAP[size] : size
    },
    getClassList () {
      let textColor = THEME_FONT_COLOR_MAP[this.color]
      return `theme theme--${this.color} text-${this.size} bg-${this.color} ${textColor}`.trim()
    },
  },
  persist: true
})