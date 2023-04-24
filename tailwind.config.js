/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app.vue",
    "./components/**/*.{js,vue,ts}",
    "./content/**/*.md",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
