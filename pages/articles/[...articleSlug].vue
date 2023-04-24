<template>
  <article>
    <ContentRenderer v-if="article" :value="article">
      <div class="relative bg-[url(/images/inner-page-hero-bg.png)] bg-cover bg-bottom bg-no-repeat">
        <div class="container">
          <div class="relative w-full py-14 md:my-14 md:inline-block md:py-0 lg:my-[128px]">
            <div class="heading relative mb-8 text-center lg:mb-0 lg:w-1/2 ltr:lg:text-left rtl:lg:text-right">
              <h2 class="mb-3 text-lg font-extrabold text-primary sm:mb-4"><NuxtLink to="/blog">Blog</NuxtLink></h2>
              <h1 class="!text-white text-2xl font-extrabold text-black dark:text-white sm:text-3xl lg:text-[40px] lg:!leading-[50px]">{{ article.title }}</h1>
              <ul class="items-center justify-center pt-6 sm:flex lg:justify-start">
                <li class="flex items-center justify-center">
                  <!-- <img src="assets/images/sophia-avtar.png" alt="avtar"> -->
                  <span class="px-4 font-semibold sm:text-lg">{{ article.author }}</span>
                </li>
                <li class="relative px-4 font-semibold before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-full before:bg-gray ltr:before:left-0 rtl:before:right-0 sm:text-lg sm:before:h-1 sm:before:w-1">
                  {{ appFormatDate(article.created, 'dd MMMM yyyy') }}
                </li>
                <!-- <li v-if="article.estimatedReadingTime" class="relative px-4 font-semibold before:absolute before:top-1/2 before:-translate-y-1/2 before:rounded-full before:bg-gray ltr:before:left-0 rtl:before:right-0 sm:text-lg sm:before:h-1 sm:before:w-1">
                  {{ article.estimatedReadingTime }}
                </li> -->
              </ul>
            </div>
            <div class="top-0 mt-6 ltr:right-0 rtl:left-0 md:mt-0 lg:absolute aos-init aos-animate" data-aos="fade-left" data-aos-duration="1000">
              <img v-if="article.leadImages" :src="article.leadImages[0]" :alt="article.title" class="mx-auto h-80 rounded-[32px] object-cover sm:h-[400px] sm:w-[445px]">
            </div>
          </div>
        </div>
      </div>
      <div class="container">
        <div class="prose max-w-2xl m-4 md:ml-14 dark:prose-invert text-black dark:text-white/80">
          <ContentRendererMarkdown v-if="article" :value="article" />
        </div>
      </div>
    </ContentRenderer>
  </article>
</template>

<script setup>
import { appFormatDate } from '~/utils/appFormatDate'

const route = useRoute()

// @ts-ignore
const article = await queryContent(`/articles/${route.params.articleSlug}`).findOne()

useHead({
  title: `${article?.title}`,
})

</script>
<!--
<style>
.prose h2 a {
  @apply !no-underline
}
</style> -->
