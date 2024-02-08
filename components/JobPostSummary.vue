<template>

  <div v-for="job in jobsList" :key="job.id">
    <div class="flex flex-col gap-2 bg-slate-100 hover:bg-slate-200 text-slate-800 px-4 py-2 rounded-lg">
      <span class="text-xs text-slate-400 absolute right-12">#{{ job.id }}</span>
      <p class="font-serif font-semibold text-left text-lg md:text-2xl py-2">{{ job.name }}</p>
      <div class="flex flex-row gap-2 py-2">
        <p class="font-sans font-semibold text-base text-left md:text-lg">{{ job.subcompany || '(Not Declared)' }} | </p>
        <p class="font-sans font-semibold text-base text-left md:text-lg capitalize">{{ job.schedule }} {{ job.employment_type }} |</p>
        <p class="font-sans font-semibold text-base text-left md:text-lg capitalize">{{ job.office || '(Not Declared)' }}</p>
      </div>

      <div class="max-h-36 text-ellipsis overflow-hidden">
        <div v-for="d in parse_jd(job)">
          <h4 class="font-semibold">{{ d['name'] }}</h4>
          <p v-html="d['value']"></p>
        </div>
      </div>
    
      <p v-if="isExternal">Find out more here:  <a :href="path + job.id" class="text-blue-500">External Link</a></p>
      <a v-if="!isExternal" :href="path + job.id" class="text-blue-500">Find out more about this job</a>
      
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps<{
  jobsList: Partial<Tables<"jobs">>[],
  path: string,
  isExternal: boolean,
}>();
</script>