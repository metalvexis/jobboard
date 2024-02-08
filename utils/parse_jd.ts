import type { JobDescription } from "~/utils/zods";
import type { Tables } from "~/utils/supabase";

export const parse_jd = (job: Partial<Tables<'jobs'>>): JobDescription[] => {
  const tmpDesc = job.job_descriptions as { jobDescription: JobDescription[] } | undefined;

  return tmpDesc?.jobDescription || [];
}