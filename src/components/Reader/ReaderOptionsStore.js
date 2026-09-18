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

function resolveSelectedTheme(theme) {
  if (theme === READER_THEME.AUTO) {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  }

  if (theme === READER_THEME.LIGHT || theme === READER_THEME.SEPIA) {
    return 'light'
  }

  return 'dark'
}

export function applyGlobalTheme(theme) {
  const html = document.querySelector('html')
  if (!html) {
    return
  }

  html.setAttribute('data-theme', resolveSelectedTheme(theme))
}

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
      applyGlobalTheme(theme)
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

export function initGlobalTheme() {
  const store = readerOptionsStore()
  applyGlobalTheme(store.theme)

  if (window.matchMedia) {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      if (store.theme === READER_THEME.AUTO) {
        applyGlobalTheme(READER_THEME.AUTO)
      }
    })
  }
}
