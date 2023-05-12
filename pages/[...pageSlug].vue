<script setup>
import { appFormatDate } from '~/utils/appFormatDate'

const { path } = useRoute();
const cleanPath = path.replace(/\/+$/, '');

const { data, error } = await useAsyncData(`content-${cleanPath}`, async () => {
  const article = queryContent(`/pages${cleanPath}`).findOne();
  return {
    article: await article,
  };
});

useHead({
  title: data.value?.article?.title,
});
</script>

<template>
  <div class="pb-10">
    <article v-if="data.article">
      <ContentRenderer :value="data.article">
        <div class="mx-auto max-w-[700px]">

          <div v-if="!data.article.headerHide" class="heading px-4 relative mb-8 mt-16">
            <h1 class="font-[240] text-xl md:text-3xl">{{ data.article.title }}</h1>
            <div class="relative">
              <div class="mt-6 mb-1 w-16 border border-bottom-2"/>
              <p v-if="data.article.date" class="text-sm opacity/70">
                {{ appFormatDate(data.article.date, 'dd MMMM yyyy') }}
              </p>
              <div class="mt-1 mb-6 w-16 border border-bottom-2"/>
            </div>
          </div>
        </div>
        <div class="mx-auto max-w-[700px]">
          <div class="max-w-2xl px-4 dark:prose-invert text-black dark:text-white/80">
            <ContentRendererMarkdown :value="data.article" class="prose" />
          </div>
        </div>
      </ContentRenderer>
    </article>
  </div>
</template>
