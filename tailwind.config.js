/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    listStyleType: {
      none: 'none',
      decimal: 'decimal',
      disc: 'disc'
    },

    fontFamily: {
      sans: ['lato', 'sans-serif'],
    },

    extend: {
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
        'ss-primary': '#2E5797'
      },
      height: {
        'ss-cover': '335px',
        'ss-cover-small': '15rem'
      },
      width: {
        'ss-cover': '250px',
      },
    },
  },
  plugins: [],
}
