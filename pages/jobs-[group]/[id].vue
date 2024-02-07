<template>
  <div class="flex flex-col gap-8 py-6 relative justify-center">
    Jobs Page here
  </div>
</template>

<script setup lang="ts">
import { XMLParser } from "fast-xml-parser";

const route = useRoute();

// (async () => {
//   if (route.params.group === 'ext' && route.params.id) {
//     // Fetch data from https://mrge-group-gmbh.jobs.personio.de/xml

//     const extData = await fetch('https://mrge-group-gmbh.jobs.personio.de/xml');
//     const XMLdata = await extData.text();
//     const parser = new XMLParser();
//     let json = parser.parse(XMLdata);
//     const positions = json["workzag-jobs"]["position"];

//     const validPositions = positions
//       .map((position: any) => {
//         try {
//           const p = validateWorkzag(position);

//           if (!p.success) {
//             console.error("Error validating Workzag data: ", p.error);
//             return null;
//           }

//           const newJob = toSnakeCase(p.data);
//           return newJob;
//         } catch (err: any) {
//           console.error("Error validating Workzag data: ", err.error);
//         }
//       })
//       .filter((p: any) => p);

//   }

//   if (route.params.group === 'int' && route.params.id) {
//     // Fetch data from supabase

//   }
// })();
</script>