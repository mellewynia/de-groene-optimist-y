<script setup>
import { appFormatDate } from '~/utils/appFormatDate'

const { path } = useRoute();
const cleanPath = path.replace(/\/+$/, '');

const { data, error } = await useAsyncData(`content-${cleanPath}`, async () => {
  const article = queryContent('/articles').where({ _path: cleanPath }).findOne();
  const surround = queryContent('/articles').sort({ date: -1 }).only(['_path', 'headline', 'excerpt']).findSurround(cleanPath, { before: 1, after: 1 });
  return {
    article: await article,
    surround: await surround,
  };
});

// Get the authors
// const { data: authorData } = await useAsyncData('home', () => queryContent('/authors').findOne());
// Set the meta
const baseUrl = 'https://degroeneoptimist.nl';
const canonicalPath = baseUrl + (path + '/').replace(/\/+$/, '/');
const image = baseUrl + (data.value?.article?.socialImage?.src || '/sample.webp');
// JSON+LD
const jsonScripts = [
    {
        type: 'application/ld+json',
        children: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'BlogPosting',
            mainEntityOfPage: {
                '@type': 'WebPage',
                '@id': 'https://degroeneoptimist.nl/'
            },
            url: canonicalPath,
            image: image,
            headline: data.value?.article?.headline,
            abstract: data.value?.article?.excerpt,
            datePublished: data.value?.article?.date,
            dateModified: data.value?.article?.dateUpdated || data.value?.article?.date,
            // author: authorData?.value[data.value?.article?.author],
            // publisher: authorData?.value['Gonzalo Hirsch']
        })
    }
];
useHead({
    title: data.value?.article?.title,
    meta: [
      { name: 'author', content: data.value?.article?.author },
      { name: 'description', content: data.value?.article?.description },
      { property: 'article:published_time', content: data.value?.article?.date.split('T')[0] },
      // OG
      { hid: 'og:title', property: 'og:title', content: data.value?.article?.headline },
      { hid: 'og:url', property: 'og:url', content: canonicalPath },
      { hid: 'og:description', property: 'og:description', content: data.value?.article?.description },
      { hid: 'og:image', name: 'image', property: 'og:image', content: image },
      { hid: 'og:type', property: 'og:type', content: 'Article' },
      { hid: 'og:image:type', property: 'og:image:type', content: `image/${data.value?.article?.socialImage?.mime}` },
      { hid: 'og:image:width', property: 'og:image:width', content: data.value?.article?.socialImage?.width || 190 },
      { hid: 'og:image:height', property: 'og:image:height', content: data.value?.article?.socialImage?.height || 190 },
      { hid: 'og:image:alt', property: 'og:image:alt', content: data.value?.article?.socialImage?.alt },
      // Twitter
      { hid: 'twitter:card', name: 'twitter:card', content: 'Summary' },
      { hid: 'twitter:title', name: 'twitter:title', content: data.value?.article?.headline },
      { hid: 'twitter:url', name: 'twitter:url', content: canonicalPath },
      { hid: 'twitter:description', name: 'twitter:description', content: data.value?.article?.description },
      { hid: 'twitter:image', name: 'twitter:image', content: image },
      { hid: 'twitter:image:alt', name: 'twitter:image:alt', content: data.value?.article?.socialImage?.alt }
    ],
    link: [
      {
        hid: 'canonical',
        rel: 'canonical',
        href: canonicalPath
      }
    ],
    script: jsonScripts
});
</script>

<template>
  <div class="pb-10">
    <article v-if="data.article?.title">
      <ContentRenderer :value="data.article">
        <div class="mx-auto max-w-[700px]">
          <div class="mt-6 md:mt-10 flex-1 overflow-hidden rounded-md">
            <img v-if="data.article.leadImages" :src="data.article.leadImages[0]" alt="project-1" class="h-52 w-full object-cover">
          </div>
          <div class="heading px-4 relative mb-8 mt-8 md:mt-16">
            <h1 class="font-[200] text-3xl md:text-6xl md:font-[100]">{{ data.article.title }}</h1>
            <div class="relative">
              <div class="opacity-60 mt-8 mb-2 w-16 h-[1px] overflow-hidden bg-lime-400 dark:bg-white/40"/>
              <p class="text-sm opacity/70">
                {{ appFormatDate(data.article.date, 'd MMMM yyyy') }} - {{ data.article.author }}
              </p>
              <div class="opacity-60 mt-2 mb-4 w-12 h-[1px] overflow-hidden bg-lime-400 dark:bg-white/40"/>
            </div>
          </div>
        </div>
        <div class="mx-auto max-w-[700px]">
          <p v-if="data.article.concept" class="mt-2 py-2 px-3 bg-lime-200/30 rounded text-sm">
            Dit artikel is (nog) in concept. Volg [@MelleWynia](https://twitter.com/@MelleWynia)" voor een berichtje wanneer het af is.
          </p>
          <div class="max-w-2xl px-4 dark:prose-invert text-black dark:text-white/80">
            <ContentRendererMarkdown v-if="data.article" :value="data.article" class="prose" />
          </div>
        </div>
      </ContentRenderer>
    </article>
  </div>
</template>
