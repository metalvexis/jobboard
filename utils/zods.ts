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

export const zCreateWorkzag = z.object({
  email: z.string(),
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
});
