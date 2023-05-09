// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // ssr: false,
  // nitro: {
  //   preset: 'service-worker'
  // },
  // generate: {routes: ['/','all','my','other','routes']},
  modules: [
    '@nuxt/image-edge',
    '@nuxt/content',
  ],
  // content: {
  //   // https://content.nuxtjs.org/api/configuration
  // },
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: '/css/fonts/Supreme.css' }
      ]
    }
  },
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ['~/style/app.css'],
})
