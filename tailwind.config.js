const colors = require('tailwindcss/colors')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app.vue",
    "./components/**/*.{js,vue,ts}",
    "./content/*.md",
    "./content/**/*.md",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      'sans': ['Supreme-Variable', 'Inter', 'sans-serif', 'system-ui'],
    },
    colors: {
      black: '#161515',
      white: '#fff',
      gray: colors.gray,
      lime: colors.lime,
      cta: {
        ...colors.sky,
        default: '#3874ff',
      },
    }
  },
  colors: {
  },
  plugins: [],
}
