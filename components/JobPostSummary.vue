<template>
  <ULink v-for="job in jobsList" :key="job.id" :to="path + job.id">
    <div class="flex flex-col gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-lg">
      <span class="text-xs text-slate-400 absolute right-12">#{{ job.id }}</span>
      <p class="font-serif font-semibold text-center text-lg md:text-2xl py-2">{{ job.name }}</p>
      <div class="flex flex-row gap-2 justify-between py-2">
        <p class="font-sans font-semibold text-base text-left md:text-lg">{{ job.subcompany || '(Not Declared)' }}</p>
        <p class="font-sans font-semibold text-base text-center md:text-lg">{{ job.department || '(Not Declared)' }}</p>
        <p class="font-sans font-semibold text-base text-right md:text-lg">{{ job.office || '(Not Declared)' }}</p>
      </div>
    </div>
  </ULink>
</template>

<script lang="ts" setup>
const props = defineProps<{
  jobsList: Partial<Tables<"jobs">>[],
  path: string,
}>();
</script>