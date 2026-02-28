import { z } from "zod";

export const experienceSchema = z.object({
  company: z.string().default(""),
  role: z.string().default(""),
  startDate: z.string().default(""),
  endDate: z.string().default(""),
  description: z.string().default(""),
});

export const educationSchema = z.object({
  institution: z.string().default(""),
  degree: z.string().default(""),
  field: z.string().default(""),
  startDate: z.string().default(""),
  endDate: z.string().default(""),
});

export const projectSchema = z.object({
  name: z.string().default(""),
  description: z.string().default(""),
  url: z.string().default(""),
  technologies: z.array(z.string()).default([]),
});

export const resumeDataSchema = z.object({
  name: z.string().default(""),
  title: z.string().default(""),
  email: z.string().default(""),
  phone: z.string().default(""),
  location: z.string().default(""),
  website: z.string().default(""),
  linkedin: z.string().default(""),
  github: z.string().default(""),
  summary: z.string().default(""),
  experience: z.array(experienceSchema).default([]),
  education: z.array(educationSchema).default([]),
  skills: z.array(z.string()).default([]),
  projects: z.array(projectSchema).default([]),
});

export type ResumeDataInput = z.input<typeof resumeDataSchema>;
