//const colors = require('tailwindcss/colors')

module.exports = {
  purge: {
    mode: 'layers',
    content: ['./public/**/*.html','./src/**/*.vue'],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        'card': '226px',
        'card-sm': '132px',
      },
      height: {
        'card': '314px',
        'card-sm': '183px',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
