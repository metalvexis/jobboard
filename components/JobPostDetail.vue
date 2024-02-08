<template>
  <div v-if="jobItem" class="flex flex-col gap-2 p-8 bg-slate-100 text-slate-800 rounded-lg">
    <span class="text-xs text-slate-400 absolute right-14">{{ '#' + jobItem?.id }}</span>
    <p class="font-serif font-semibold text-center text-lg md:text-2xl">{{ jobItem?.name }}</p>

    <div class="flex flex-row gap-2 justify-between py-4">
      <p class="font-sans font-semibold text-base text-left md:text-lg">{{ jobItem?.subcompany || '(Not Declared)' }}</p>
      <p class="font-sans font-semibold text-base text-center md:text-lg">{{ jobItem?.department || '(Not Declared)' }}
      </p>
      <p class="font-sans font-semibold text-base text-right md:text-lg">{{ jobItem?.office || '(Not Declared)' }}</p>
    </div>

    <div v-for="d in jobDescriptions">
      <h4 class="font-semibold">{{ d['name'] }}</h4>
      <p v-html="d['value']">
      </p>
      <br>
    </div>
  </div>
</template>

<script lang="ts" setup>
const jobDescriptions: JobDescription[] = reactive([])
const props = defineProps<{
  jobItem: Partial<Tables<"jobs">> | null,
}>();

const tmpDesc = props.jobItem?.job_descriptions as { jobDescription: JobDescription[] } | undefined;

// TODO: jobDescription is nullable and should be handled
tmpDesc?.jobDescription?.forEach((d) => {
  jobDescriptions.push({
    name: d['name'],
    value: d['value'],
  })
})

console.log('jobItem', props.jobItem)

</script>
