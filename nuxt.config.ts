// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: true,
  modules: [
    '@nuxt/image-edge',
    '@nuxt/content',
  ],
  // content: {
  //   // https://content.nuxtjs.org/api/configuration
  // },
  experimental: {
    payloadExtraction: false
  },
  router: {
    options: {
      strict: false
    }
  },
  sourcemap: false,
  app: {
    head: {
      link: [
        { rel: 'stylesheet', href: '/css/fonts/Supreme.css' },
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.png' },
      ],
      meta: [
      ],
      htmlAttrs: {
        lang: 'nl',
      },
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
