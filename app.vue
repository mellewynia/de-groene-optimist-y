<template>
  <div class="">
    <AppHeader />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import '@fontsource/open-sans/variable.css'

useHead({
  titleTemplate: (productCategory) => {
    return productCategory
      ? `${productCategory} - De Groene Optimist`
      : 'De Groene Optimist'
  }
})
</script>
