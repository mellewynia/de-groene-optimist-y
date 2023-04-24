<template>
  <div>
    <div
      v-for="article in articles"
      :key="article._path"
      class="project"
      data-filter="website"
    >
      <div class="relative rounded-3xl border border-transparent bg-white transition duration-500 hover:border-secondary hover:bg-secondary/20 dark:bg-gray-dark">
        <NuxtLink :to="article._path" class="absolute top-0 h-full w-full ltr:left-0 rtl:right-0" />
        <img v-if="article.leadImages" :src="article.leadImages[0]" alt="project-1" class="h-52 w-full rounded-t-3xl object-cover">
        <div class="p-5 text-sm font-bold">
          <h6 class="mb-1 text-black dark:text-white">{{ article.title }}</h6>
          <p>Website</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// definePageMeta({
//   title: 'Blog',
//   hideFooterArticles: true,
// })

// @ts-ignore
const articles = await queryContent('/articles')
  .where({ concept: { $ne: true } })
  .sort({ date: -1 })
  .find()
</script>
