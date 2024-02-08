<template>
  <div class="flex flex-col gap-8 py-6 px-8 relative justify-center">
    <JobPostDetail :jobItem="jobItem" />
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

useSeoMeta({
  title: jobItem.value?.name || 'Job Posting',
  articleTag: ['job', 'board', 'company', 'workzag', 'jobs', 'openings', 'hiring', 'career', 'opportunities', 'employment', 'work', 'job board', 'job openings'],
})
</script>