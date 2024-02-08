import type { Tables } from "#imports";
import { XMLParser } from "fast-xml-parser";
import { useStorage } from "@vueuse/core";

const CACHE_KEY = "JOBBOARD_WORKZAG";
const store = useStorage(CACHE_KEY, {} as CachedWorkzag);

type CachedWorkzag = {
  workzag: Partial<Tables<"jobs">>[];
  timestamp: number;
};
const fetchWorkzag = async () => {
  // Fetch data from https://mrge-group-gmbh.jobs.personio.de/xml
  const XMLdata = await useAsyncData("workzag", () =>
    $fetch<string>("https://mrge-group-gmbh.jobs.personio.de/xml")
  );
  const parser = new XMLParser();
  let json = parser.parse(XMLdata.data.value || "");

  console.log("json", json);
  const positions = json["workzag-jobs"]["position"];
  const validPositions: Partial<Tables<"jobs">>[] = positions.map(
    (position: any) => {
      const p = validateWorkzag(position);

      if (!p.success) {
        console.error("Error validating Workzag data: ", p.error);
        return null;
      }

      const newJob = toSnakeCase(p.data) as Partial<Tables<"jobs">>;
      return newJob;
    }
  );
  console.log("validPositions", validPositions);

  return validPositions;
};

export const useCachedWorkzag = async () => {
  // const parsed: CachedWorkzag = cached ? JSON.parse(cached) : null;
  console.log("store.value", store.value);
  const isStale = Date.now() - store.value.timestamp > 1000 * 60 * 60;
  if (!store.value.workzag || isStale) {
    const newWorkzag = (await fetchWorkzag()) || [];
    console.log("Workzag data refreshed, updating cache:", newWorkzag);
    const newCache: CachedWorkzag = {
      workzag: newWorkzag,
      timestamp: Date.now(),
    };
    store.value = newCache;
  }

  return store;
};
