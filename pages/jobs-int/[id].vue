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
const route = useRoute();

const jobId = route.params.id;


const jobItem = ref<Partial<Tables<"jobs">> | null>(null);

const res = await $fetch<{
  job: Partial<Tables<"jobs">>
} | null>(`/api/jobs/${jobId}`);
// TODO: Fix ignored Type instantiation is excessively deep and possibly infinite.
jobItem.value = res ? res.job : null;
</script>