import type { Tables } from "#imports";
import { XMLParser } from "fast-xml-parser";
import { isClient, useStorage } from "@vueuse/core";

const CACHE_KEY = "JOBBOARD_WORKZAG";
const CACHE_EXPIRY = 1000 * 60 * 15; // 15 minutes
const EXT_API = process.env.WORKZAG_API_URL || 'https://mrge-group-gmbh.jobs.personio.de'

type CachedWorkzag = {
  workzag: Partial<Tables<"jobs">>[];
  timestamp: number;
};

const fetchWorkzag = async () => {
  // Fetch data from https://mrge-group-gmbh.jobs.personio.de/xml
  const extApiReq = await fetch(EXT_API+"/xml");
  const XMLdata = await extApiReq.text();
  console.log('XMLdata', XMLdata)
  const parser = new XMLParser();

  let json = parser.parse(XMLdata || "");

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

  return validPositions;
};

export const useCachedWorkzag = async () => {
  const store = useStorage(CACHE_KEY, {} as CachedWorkzag, undefined, { mergeDefaults: true });
  
  // Don't run on server
  if (!isClient) return store;

  // Wait for store to be ready
  setTimeout(async () => {
    const isStale = !store.value.workzag || Date.now() - store.value.timestamp > CACHE_EXPIRY;
    console.log('Checking if Workzag data is stale: ', isStale)
    if (isStale) {
      const newWorkzag = (await fetchWorkzag()) || [];
      console.log("Workzag data refreshed, updating cache with these items:", newWorkzag.length);
      const newCache: CachedWorkzag = {
        workzag: newWorkzag,
        timestamp: Date.now(),
      };
      store.value = newCache;
    }
  }, 1000);

  return store;
};
