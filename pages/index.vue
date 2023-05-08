<template>
  <div class="mx-auto max-w-[700px]">
    <div
      v-for="article in articles"
      :key="article._path"
      class="project mt-6 md:mt-10 "
      data-filter="website"
    >
      <div class="relative flex">
        <NuxtLink :to="article._path" class="absolute top-0 h-full w-full ltr:left-0 rtl:right-0" />
        <div class="w-[60px] md:flex-1 overflow-hidden rounded-md">
          <img v-if="article.leadImages" :src="article.leadImages[0]" alt="project-1" class="h-52 w-full object-cover">
        </div>
        <div class="flex-1 w-full md:min-w-[400px] ml-4 mr-4 md:ml-6">
          <h6 class="font-[240] text-xl md:text-3xl">{{ article.title }}</h6>
          <p class="mt-2 text-sm opacity-70">
            {{ appFormatDate(article.created, 'dd MMMM yyyy') }}
          </p>
          <p class="mt-3 intro">
            {{ article.description }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// definePageMeta({
//   title: 'Blog',
// })

const articles = await queryContent('/articles')
  .where({ concept: { $ne: true } })
  .sort({ date: -1 })
  .find()
</script>

<style scoped>
.intro {
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
}
</style>
