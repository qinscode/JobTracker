// src/types/job.ts
export interface Job {
  id: string;
  JobTitle: string;
  BusinessName: string;
  WorkType: string;
  JobType: string;
  PayRange: string;
  Suburb: string;
  Area: string;
  url: string;
  Status:
    | "New"
    | "Pending"
    | "Archived"
    | "Reviewed"
    | "Ghosting"
    | "Applied"
    | "Interviewing"
    | "TechnicalAssessment"
    | "Offered"
    | "Rejected";
  PostedDate: string;
  JobDescription: string;
}
