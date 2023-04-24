// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxt/image-edge',
    '@nuxt/content',
  ],
  // content: {
  //   // https://content.nuxtjs.org/api/configuration
  // },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ['~/style/app.css'],
})
