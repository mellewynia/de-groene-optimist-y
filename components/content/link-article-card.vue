<script setup>
import { appFormatDate } from '~/utils/appFormatDate'

const props = defineProps(['slug'])

const { data, error } = await useAsyncData(`content-link-article-${props.slug}`, async () => {
  const article = queryContent(`/articles/${props.slug}`).findOne();
  return {
    article: await article,
  };
});
</script>

<template>
  <NuxtLink v-if="data.article" :to="data.article._path" class="block transition ease-out leading-[126%] text-cta-default dark:text-cta-400 bg-cta-200/10 dark:bg-cta-400/10 transition ease-out hover:bg-cta-200/20 dark:hover:bg-cta-400/20 active:transition-none active:bg-cta-200/30 dark:active:bg-cta-400/30 py-3 px-4 max-w-[200px] rounded-md">
    <small v-if="data.article.date" class="block opacity-60">{{ appFormatDate(data.article.date, 'dd MMMM yyyy') }}</small>
    <span class="font-[300]">{{ data.article.title }}</span>
    <!-- <div class="top-0 mt-6 ltr:right-0 rtl:left-0 md:mt-0 lg:absolute aos-init aos-animate" data-aos="fade-left" data-aos-duration="1000">
      <img v-if="data.article.leadImages" :src="data.article.leadImages[0]" :alt="data.article.title" class="mx-auto h-80 rounded-[32px] object-cover sm:h-[400px] sm:w-[445px]">
    </div> -->
  </NuxtLink>
</template>
