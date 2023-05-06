<script setup>
defineProps(['src', 'alt'])
</script>

<template>
  <p class="md:flex gap-6 md:-ml-4 lg:-ml-16">
    <!--  :class="[type]" -->
    <span class="block relative h-40 md:flex-1 overflow-hidden rounded-md">
      <img
        :src="src"
        :alt="alt"
        class="h-auto object-cover rounded-md"
      />
    </span>
    <span class="block mt-3 flex-1">
      <!-- <span class="credits">

      </span> -->
      <span class="block text-sm md:text-lg">
        <ContentSlot :use="$slots.default" unwrap="p" />
      </span>
    </span>
  </p>
</template>
