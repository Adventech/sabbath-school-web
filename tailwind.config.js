const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  safelist: [
    'font-bold',
    {
      pattern: /([pm])([tblr])?-[0-9.]+/,
    },
    {
      pattern: /text-(3xs|2xs|xs|sm|base|lg|xl|start|end|center)+/,
    },
    {
      pattern: /align-(sub|super)+/,
    },
    {
      pattern: /(bg|theme)-(light|sepia|dark)+/,
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
        'ss-primary': '#2E5797',
        'light': 'var(--tw-color-gray-50)',
        'sepia': '#fbf0d9',
        'dark': '#000000',
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
    })
  ],
}
