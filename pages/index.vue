
<template>
  <div class="flex flex-col gap-8 py-6 px-8 relative justify-center">
    <!-- <ULink to="/jobs-ext">Jobs External</ULink> -->
    <JobPostSummary :jobsList="extJobsList" :path="EXT_API+'/job/'" :isExternal="true"/>
    <JobPostSummary :jobsList="jobsList" path="/jobs-int/" :isExternal="false"/>

    <div class="flex justify-center">
      <button class="bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold py-2 px-4 rounded" @click="loadMore"
        v-if="maxPages && page + 1 < maxPages">Load
        More</button>
    </div>
  </div>
</template>

<script setup lang="ts">
const EXT_API = process.env.WORKZAG_API_URL || 'https://mrge-group-gmbh.jobs.personio.de'
useSeoMeta({
  title: 'Job Board',
  description: 'Job board for the company',
  articleTag: ['job', 'board', 'company', 'workzag', 'jobs', 'openings', 'hiring', 'career', 'opportunities', 'employment', 'work', 'job board', 'job openings'],
})
definePageMeta({
  colorMode: 'dark',
})
import type { GetWorkzagListRes } from '~/utils/zods';
import type { Tables } from "~/utils/supabase";

const cachedWorkzag = await useCachedWorkzag();
const jobsList = ref<Partial<Tables<'jobs'>>[]>([]);
const extJobsList = computed(() => cachedWorkzag.value?.workzag || []);

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

fetchJobs(0);

watch(cachedWorkzag, (newVal) => {
  console.log("useCachedWorkzag", newVal);
})
</script>