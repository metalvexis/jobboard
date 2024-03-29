import { z } from "zod";
import type { Tables } from "~/utils/supabase";

// Validator for fetched jobs from https://mrge-group-gmbh.jobs.personio.de/xml
export const zWorkzag = z.object({
  id: z.number(),
  subcompany: z.string().optional(),
  office: z.string().optional(),
  additionalOffices: z
    .object({
      office: z.string().optional(),
    })
    .optional(),
  department: z.string().optional(),
  recruitingCategory: z.string().optional(),
  name: z.string().optional(),
  jobDescriptions: z
    .union([
      z.string(),
      z.record(
        z.string(),
        z.array(z.record(z.string(), z.string()).optional())
      ),
    ])
    .optional(),
  employmentType: z.string().optional(),
  seniority: z.string().optional(),
  schedule: z.string().optional(),
  yearsOfExperience: z.string().optional(),
  occupation: z.string().optional(),
  occupationCategory: z.string().optional(),
  createdAt: z.string().optional(),
});

export type Workzag = z.infer<typeof zWorkzag>;

export const zGetWorkzagReq = z.object({
  jobId: z.string(),
});

export type GetWorkzagReq = z.infer<typeof zGetWorkzagReq>;

export const zGetWorkzagListReq = z.object({
  page: z.string().optional(),
  approval_status: z.string().optional(),
});

export type GetWorkzagListReq = z.infer<typeof zGetWorkzagListReq>;

// Copied from supabase.ts to avoid :
// Type instantiation is excessively deep and possibly infinite.
export type JobItem = {
  additional_offices?: Json | null;
  approval_status?: string | null;
  created_at?: string;
  department?: string | null;
  employment_type?: string | null;
  id?: number;
  job_descriptions?: Json | null;
  name?: string | null;
  occupation?: string | null;
  occupation_category?: string | null;
  office?: string | null;
  recruiting_category?: string | null;
  schedule?: string | null;
  seniority?: string | null;
  subcompany?: string | null;
  user_id?: number | null;
  years_of_experience?: string | null;
};

export type GetWorkzagListRes = {
  jobs: Partial<Tables<"jobs">>[];
  totalJobCount: number;
  totalPages: number;
};

export const zCreateWorkzagReq = z.object({
  email: z.string(),
  subcompany: z.string().optional(),
  office: z.string().optional(),
  additional_offices: z
    .object({
      office: z.string().optional(),
    })
    .optional(),
  department: z.string().optional(),
  recruiting_category: z.string().optional(),
  name: z.string().optional(),
  job_descriptions: z
    .record(z.string(), z.array(z.record(z.string(), z.string()).optional()))
    .optional(),
  employment_type: z.string().optional(),
  seniority: z.string().optional(),
  schedule: z.string().optional(),
  years_of_experience: z.string().optional(),
  occupation: z.string().optional(),
  occupation_category: z.string().optional(),
});

export type CreateWorkzagReq = z.infer<typeof zCreateWorkzagReq>;

export const zModsAuthReq = z.object({
  authKey: z.string(),
});

export type ModAuthReq = z.infer<typeof zModsAuthReq>;

export const zAuthKey = z.object({
  jobId: z.union([z.string(), z.number()]),
  modId: z.union([z.string(), z.number()]),
  iat: z.number(),
  exp: z.number(),
});

export type AuthKey = z.infer<typeof zAuthKey>;

export type NotificationReq = {
  receivers: {
    id: number;
    email: string;
  }[];
  job: Partial<Tables<"jobs">>;
  user: string;
};

export type JobDescription = {
  name: string;
  value: string;
};
