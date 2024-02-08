import type { Tables } from "#imports";
import { XMLParser } from "fast-xml-parser";
import { useLocalStorage } from "@vueuse/core";

const CACHE_KEY = "JOBBOARD_WORKZAG";
const CACHE_EXPIRY = 1000 * 60 * 15; // 15 minutes
const EXT_API = process.env.WORKZAG_API_URL || 'https://mrge-group-gmbh.jobs.personio.de'

type CachedWorkzag = {
  workzag: Partial<Tables<"jobs">>[];
  timestamp: number;
};

const fetchWorkzag = async () => {
  // Fetch data from https://mrge-group-gmbh.jobs.personio.de/xml
  const XMLdata = await useAsyncData("workzag", () =>
    $fetch<string>(EXT_API+"/xml")
  );
  const parser = new XMLParser();
  console.log(XMLdata.data.value)
  let json = parser.parse(XMLdata.data.value || "");

  const positions = json["workzag-jobs"]["position"];
  console.log("positions", positions);
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
  const store = useLocalStorage(CACHE_KEY, {} as CachedWorkzag, { mergeDefaults: true });

  const isStale = Date.now() - store.value.timestamp > CACHE_EXPIRY;
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
