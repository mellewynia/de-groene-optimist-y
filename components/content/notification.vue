<script setup>
defineProps(['type'])
</script>

<template>
  <div class="notification px-3 py-2" :class="[type]">
    <ContentSlot :use="$slots.default" unwrap="p" />
  </div>
</template>

<style>
.notification {
  background: yellow;
}
</style>
