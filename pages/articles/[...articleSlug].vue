<template>
  <div>
    <article>
      <ContentRenderer v-if="article" :value="article">
        <div class="mx-auto max-w-[700px]">
          <div class="mt-6 md:mt-10 flex-1 overflow-hidden rounded-md">
            <img v-if="article.leadImages" :src="article.leadImages[0]" alt="project-1" class="h-52 w-full object-cover">
          </div>
          <div class="heading px-4 relative mb-8 mt-8 md:mt-16">
            <h1 class="font-[200] text-3xl md:text-6xl md:font-[100]">{{ article.title }}</h1>
            <div class="relative">
              <div class="opacity-60 mt-8 mb-2 w-16 h-[1px] overflow-hidden bg-black dark:bg-white"/>
              <p class="text-sm opacity/70">
                {{ appFormatDate(article.created, 'dd MMMM yyyy') }}
              </p>
              <div class="opacity-60 mt-2 mb-4 w-12 h-[1px] overflow-hidden bg-black dark:bg-white"/>
            </div>
          </div>
        </div>
        <div class="mx-auto max-w-[700px]">
          <div class="max-w-2xl px-4 dark:prose-invert text-black dark:text-white/80">
            <ContentRendererMarkdown v-if="article" :value="article" class="prose" />
          </div>
        </div>
      </ContentRenderer>
    </article>
  </div>
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
