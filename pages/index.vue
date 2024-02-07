<template>
  <div class="container p-8 sm:px-16">
    <div class="flex flex-col gap-8 py-6 relative justify-center">
      <p class="font-serif font-semibold text-lg md:text-3xl text-center">Job Board</p>
      <div v-for="job in jobList?.jobs" :key="job.id">
        <div class="flex flex-col gap-2">
          <p class="font-serif font-semibold text-lg md:text-2xl">{{ job.name }}</p>
          <p class="font-serif font-semibold text-base md:text-lg">{{ job.office }}</p>
        </div>
      </div>
      <div class="flex justify-center">
        <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" @click="loadMore">Load
          More</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { GetWorkzagListRes } from '~/utils/zods';

// import type { Tables } from '~/utils/supabase';
// const jobsList = ref<Partial<Tables<'jobs'>>[]>([]);

const page = ref(0);
const {
  pending,
  data: jobList
} = await useFetch<GetWorkzagListRes>(`/api/jobs?page=${page.value}`);

const loadMore = () => {
  const maxPages = jobList.value?.totalPages || null;
  if (maxPages !== null && page.value + 1 < maxPages) {
    console.log('loadMore')
    page.value += 1;
  }
}
</script>