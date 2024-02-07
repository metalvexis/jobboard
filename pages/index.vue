<template>
  <div class="flex flex-col gap-8 py-6 relative justify-center">
    <p class="font-serif font-semibold text-lg md:text-3xl text-center">Job Board</p>
    <div v-for="job in jobsList" :key="job.id">
      <div class="flex flex-col gap-2">
        <p class="font-serif font-semibold text-lg md:text-2xl">{{ job.id }} {{ job.name }}</p>
        <p class="font-sans font-semibold text-base md:text-lg">{{ job.office }}</p>
      </div>
    </div>
    <div class="flex justify-center">
      <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="loadMore"
        v-if="maxPages && page + 1 < maxPages">Load
        More</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GetWorkzagListRes } from '~/utils/zods';
import type { Tables } from "~/utils/supabase";

const jobsList = ref<Partial<Tables<'jobs'>>[]>([]);

const maxPages = ref<number | null>(null);
const page = ref(0);

const loadMore = async () => {
  if (maxPages.value !== null && page.value + 1 < maxPages.value) {
    console.log('loadMore')
    page.value += 1;

    await fetchJobs(page.value);
  }
}

const fetchJobs = async (page: number) => {
  const res: GetWorkzagListRes = await $fetch(`/api/jobs?page=${page}`);
  maxPages.value = res.totalPages;
  // TODO: Fix ignored Type instantiation is excessively deep and possibly infinite.
  res.jobs.forEach((job) => {
    jobsList.value.push(job);
  });
}

watch(jobsList, (newVal) => {
  console.log('jobsList', newVal.length)
  console.log('maxPages', maxPages.value)
});

fetchJobs(0);
</script>