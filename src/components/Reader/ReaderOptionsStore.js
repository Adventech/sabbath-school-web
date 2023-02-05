import { defineStore } from 'pinia'

export const READER_THEME = Object.freeze({
  LIGHT: "light",
  SEPIA: "sepia",
  DARK: "dark",
  AUTO: "auto",
})

export const READER_FONT = Object.freeze({
  ANDADA: "andada",
  LATO: "lato",
  PTSANS: "ptsans",
  PTSERIF: "ptserif",
})

export const READER_SIZE = Object.freeze({
  XS: "1",
  SM: "2",
  MD: "3",
  LG: "4",
  XL: "5",
})

export const readerOptionsStore = defineStore({
  id: 'readerOptions',
  state: () => ({
    theme: READER_THEME.AUTO,
    font: READER_FONT.LATO,
    size: READER_SIZE.MD
  }),
  actions: {
    setTheme(theme) {
      this.theme = theme
    },
    setFont(font) {
      this.font = font
    },
    setSize(size) {
      this.size = size
    },
  },
  persist: true
})