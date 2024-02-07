import { z } from "zod";

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
  jobDescriptions: z.union([
    z.string().optional(),
    z
      .object({
        jobDescription: z.array(
          z.object({
            name: z.string(),
            value: z.string(),
          })
        ),
      })
      .optional(),
  ]),
  employmentType: z.string().optional(),
  seniority: z.string().optional(),
  schedule: z.string().optional(),
  yearsOfExperience: z.string().optional(),
  occupation: z.string().optional(),
  occupationCategory: z.string().optional(),
  createdAt: z.string().optional(),
});

export const zGetWorkzag = z.object({
  page: z.string(),
});

export type GetWorkzag = z.infer<typeof zGetWorkzag>;

export const zCreateWorkzag = z.object({
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
  job_descriptions: z.union([
    z.string().optional(),
    z
      .object({
        job_description: z.array(
          z.object({
            name: z.string(),
            value: z.string(),
          })
        ),
      })
      .optional(),
  ]),
  employment_type: z.string().optional(),
  seniority: z.string().optional(),
  schedule: z.string().optional(),
  years_of_experience: z.string().optional(),
  occupation: z.string().optional(),
  occupation_category: z.string().optional(),
});
