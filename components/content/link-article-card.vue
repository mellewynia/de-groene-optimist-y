
<script setup>
import { appFormatDate } from '~/utils/appFormatDate'

const props = defineProps(['slug'])

let article;

try {
  // @ts-ignore
  article = await queryContent(`/articles/${props.slug}`).findOne()
} catch (e) {
  console.log(`QueryContent failed: /articles/${props.slug}`)
  throw e;
}
</script>

<template>
  <NuxtLink v-if="article" :to="article._path" class="block bg-cta-default/10 py-3 px-4 max-w-[200px] rounded-md">
    <small class="block">{{ appFormatDate(article.created, 'dd MMMM yyyy') }}</small>
    {{ article?.title }}
    <!-- <div class="top-0 mt-6 ltr:right-0 rtl:left-0 md:mt-0 lg:absolute aos-init aos-animate" data-aos="fade-left" data-aos-duration="1000">
      <img v-if="article.leadImages" :src="article.leadImages[0]" :alt="article.title" class="mx-auto h-80 rounded-[32px] object-cover sm:h-[400px] sm:w-[445px]">
    </div> -->
  </NuxtLink>
</template>
