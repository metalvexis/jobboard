<template>
  <div class="flex flex-col gap-8 py-6 px-8 relative justify-center">
    <JobPostDetail :jobItem="jobItem" />
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

useSeoMeta({
  title: jobItem.value?.name || 'Job Posting',
  articleTag: ['job', 'board', 'company', 'workzag', 'jobs', 'openings', 'hiring', 'career', 'opportunities', 'employment', 'work', 'job board', 'job openings'],
})
</script>