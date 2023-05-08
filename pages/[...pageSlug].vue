
<script setup>
import { appFormatDate } from '~/utils/appFormatDate'

const route = useRoute()

const { data: _article } = await useAsyncData('article', async () => await queryContent(`/pages/${route.params.pageSlug}`).findOne())

const article = computed(() => _article.value || [])

useHead({
  title: `${article?.title}`,
})
</script>

<template>
  <div class="pb-10">
    <article>
      <ContentRenderer v-if="article" :value="article">
        <div class="mx-auto max-w-[700px]">

          <div class="heading px-4 relative mb-8 mt-16">
            <h1 class="font-extrabold text-3xl">{{ article.title }}</h1>
            <div class="relative">
              <div class="mt-6 mb-1 w-16 border border-bottom-2"/>
              <p v-if="article.created" class="text-sm opacity/70">
                {{ appFormatDate(article.created, 'dd MMMM yyyy') }}
              </p>
              <div class="mt-1 mb-6 w-16 border border-bottom-2"/>
            </div>
          </div>
          <!-- <div class="top-0 mt-6 ltr:right-0 rtl:left-0 md:mt-0 lg:absolute aos-init aos-animate" data-aos="fade-left" data-aos-duration="1000">
            <img v-if="article.leadImages" :src="article.leadImages[0]" :alt="article.title" class="mx-auto h-80 rounded-[32px] object-cover sm:h-[400px] sm:w-[445px]">
          </div> -->
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
