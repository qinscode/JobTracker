import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const jobSchema = z.object({
  id: z.string(),
  JobTitle: z.string(),
  BusinessName: z.string(),
  WorkType: z.string(),
  JobType: z.string(),
  PayRange: z.string(),
  Suburb: z.string(),
  Area: z.string(),
  Url: z.string(),
  Status: z.enum([
    "New",
    "Pending",
    "Applied",
    "Archived",
    "Reviewed",
    "Interviewing",
    "TechnicalAssessment",
    "Offered",
    "Ghosting",
    "Pass",
    "Rejected",
  ]),
  PostedDate: z.string(),
  JobDescription: z.string(),
});

export type Job = z.infer<typeof jobSchema>;
