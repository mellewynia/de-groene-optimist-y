<template>
  <div class="mx-auto w-[600px]">
    <div
      v-for="article in articles"
      :key="article._path"
      class="project"
      data-filter="website"
    >
      <div class="relative flex">
        <NuxtLink :to="article._path" class="absolute top-0 h-full w-full ltr:left-0 rtl:right-0" />
        <div>
          <img v-if="article.leadImages" :src="article.leadImages[0]" alt="project-1" class="h-52 w-full object-cover">
        </div>
        <div class="min-w-[400px ] p-5 text-md font-bold">
          <h6 class="mb-1">{{ article.title }}</h6>
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
