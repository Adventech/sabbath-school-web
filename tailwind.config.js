const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  safelist: [
    'font-bold',
    '!text-start', '!text-end', '!text-center',
    '!align-sub', '!align-super',
    '!bg-left', '!bg-right', '!bg-center', '!bg-bottom', '!bg-top',
    {
      pattern: /^!?([pm])([tblr])?-[0-9.]+$/,
    },
    {
      pattern: /^!?text-(3xs|2xs|xs|sm|base|lg|xl|2xl|3xl|4xl|5xl|6xl|7xl|8xl|9xl|10xl)$/,
    },
    {
      pattern: /align-(sub|super)+/,
    },
    {
      pattern: /(bg|theme)-(light|sepia|dark)+/,
    },
    {
      pattern: /(bg)-(left|right|center|bottom|top)+/,
    },
  ],
  theme: {
    listStyleType: {
      none: 'none',
      decimal: 'decimal',
      disc: 'disc',
      square: 'square',
      roman: 'upper-roman',
      circle: 'circle',
    },

    fontFamily: {
      sans: ['lato', 'sans-serif'],
      mono: ['ui-monospace', 'SFMono-Regular'],
    },

    extend: {
      fontSize: {
        '3xs': '.5rem',
        '2xs': '.625rem',
        'xs': '0.8rem',
        'sm': '1rem',
        'base': '1.125rem',
        'lg': '1.25rem',
        'xl': '1.563rem',
        '2xl': '1.953rem',
        '3xl': '2.441rem',
        '4xl': '3.052rem',
        '5xl': '3.815rem',
        '6xl': '4.768rem',
        '7xl': '5.96rem',
        '8xl': '7.451rem',
        '9xl': '9.313rem',
        '10xl': '11.642rem',
      },
      maxWidth: {
        'ss-cover': '250px',
      },
      minWidth: {
        'ss-cover': '250px',
      },
      maxHeight: {
        'ss-cover': '335px',
      },
      minHeight: {
        'ss-cover': '335px',
        'ss-pdf': '600px',
        'ss-pdf-md': '800px',
        'ss-pdf-lg': '1000px',
        'ss-pdf-xl': '1200px',
      },
      dropShadow: {
        '4xl': [
          '0 35px 35px rgba(0, 0, 0, 0.25)',
          '0 45px 65px rgba(0, 0, 0, 0.15)'
        ]
      },
      colors: {
        // Dynamic theme colors that respond to the data-theme attribute on <html>
        'app': {
          'bg': 'var(--app-bg)',
          'bg-secondary': 'var(--app-bg-secondary)',
          'bg-tertiary': 'var(--app-bg-tertiary)',
          'bg-hover': 'var(--app-bg-hover)',
          'bg-header': 'var(--app-bg-header)',
          'bg-dropdown': 'var(--app-bg-dropdown)',
          'bg-modal': 'var(--app-bg-modal)',
          'bg-input': 'var(--app-bg-input)',
          'bg-tooltip': 'var(--app-bg-tooltip)',
          'bg-reader': 'var(--app-bg-reader)',
          'bg-textarea': 'var(--app-bg-textarea)',
          'bg-code': 'var(--app-bg-code)',
          'text-primary': 'var(--app-text-primary)',
          'text-secondary': 'var(--app-text-secondary)',
          'text-tertiary': 'var(--app-text-tertiary)',
          'text-muted': 'var(--app-text-muted)',
          'text-link': 'var(--app-text-link)',
          'text-inverse': 'var(--app-text-inverse)',
          'text-reader': 'var(--app-text-reader)',
          'border': 'var(--app-border)',
          'border-secondary': 'var(--app-border-secondary)',
        },
        'light': '#ffffff',
        'sepia': '#fbf0d9',
        'dark': '#000000',
        'ss-primary': 'var(--color-primary)',
        'sspm-accent': '#00506B',
        'sspm-secondary': '#E3F3F7',
        'sspm-accent-600': '#0096B4',
        'sspm-accent-800': '#00506B',
        'sspm-accent-900': '#002D47',
        'sspm-accent-50': '#E3F3F7',
        'sspm-accent-1000': '#2F557F',
      },
      backgroundColor: {
        'app': 'var(--app-bg)',
        'app-secondary': 'var(--app-bg-secondary)',
        'app-tertiary': 'var(--app-bg-tertiary)',
        'app-hover': 'var(--app-bg-hover)',
        'app-header': 'var(--app-bg-header)',
        'app-dropdown': 'var(--app-bg-dropdown)',
        'app-modal': 'var(--app-bg-modal)',
        'app-input': 'var(--app-bg-input)',
        'app-tooltip': 'var(--app-bg-tooltip)',
      },
      textColor: {
        'app': 'var(--app-text-primary)',
        'app-primary': 'var(--app-text-primary)',
        'app-secondary': 'var(--app-text-secondary)',
        'app-tertiary': 'var(--app-text-tertiary)',
        'app-muted': 'var(--app-text-muted)',
        'app-link': 'var(--app-text-link)',
        'app-inverse': 'var(--app-text-inverse)',
      },
      borderColor: {
        'app': 'var(--app-border)',
        'app-secondary': 'var(--app-border-secondary)',
      },
      height: {
        'ss-cover': '335px',
        'ss-cover-small': '15rem'
      },
      width: {
        'ss-cover': '250px',
      },
      scale: {
        'appeal': '0.995',
      },
      spacing: {
        '7': '1.75rem',
        '8': '2rem',
        '9': '2.25rem',
      },
    },
  },
  plugins: [
    plugin(function({addVariant}) {
      // here is your CSS selector - could be anything
      // in this case it is `.theme` element
      // with `.theme--red` class (both present)
      addVariant('theme-sepia', '.theme.theme--sepia &')
      addVariant('theme-dark', '.theme.theme--dark &')
      addVariant('theme-light', '.theme.theme--light &')
      addVariant('data-theme-light', 'html[data-theme="light"] &')
      addVariant('data-theme-dark', 'html[data-theme="dark"] &')
      addVariant('data-theme-sepia', 'html[data-theme="sepia"] &')
    })
  ],
}
