<template>
  <div class="flex flex-col gap-8 py-6 relative justify-center">
    Jobs Page here
    <div class="flex flex-col gap-2">
      <p class="font-serif font-semibold text-lg md:text-2xl">{{ jobItem?.id }} {{ jobItem?.name }}</p>
      <p class="font-sans font-semibold text-base md:text-lg">{{ jobItem?.office }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const cachedWorkzag = await useCachedWorkzag();
const route = useRoute();
const jobItem = computed(() => {
  const items = cachedWorkzag.value?.workzag
    .filter(
      (p: any) => p.id == route.params.id
    )
  return items[0];
});
</script>