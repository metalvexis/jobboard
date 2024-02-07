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
import { XMLParser } from "fast-xml-parser";
import type { Workzag } from "~/utils/zods";

const route = useRoute();

const jobItem = ref<Partial<Tables<'jobs'> | null>>(null);

if (route.params.group === 'ext' && route.params.id) {
  // Fetch data from https://mrge-group-gmbh.jobs.personio.de/xml
  const XMLdata = await useAsyncData('workzag', () => $fetch<string>('https://mrge-group-gmbh.jobs.personio.de/xml'));
  // const XMLdata = await extData.text();

  const parser = new XMLParser();
  let json = parser.parse(XMLdata.data.value || '');

  console.log('json', json)
  const positions = json["workzag-jobs"]["position"];

  console.log('positions', positions)
  const validPositions = positions
    .map((position: any) => {
      try {
        const p = validateWorkzag(position);

        if (!p.success) {
          console.error("Error validating Workzag data: ", p.error);
          return null;
        }

        const newJob = toSnakeCase(p.data) as Workzag;
        return newJob;
      } catch (err: any) {
        console.error("Error validating Workzag data: ", err.error);
      }
    })
    .filter((p: any) => p.id == route.params.id);
  console.log('validPositions', validPositions)
  jobItem.value = validPositions[0];
}

if (route.params.group === 'int' && route.params.id) {
  // Fetch data from supabase

}

</script>