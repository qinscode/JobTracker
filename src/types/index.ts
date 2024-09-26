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

interface BackendJob {
  id: string;
  jobTitle: string;
  businessName: string;
  workType: string;
  jobType: string;
  payRange: string;
  suburb: string;
  area: string;
  url: string;
  status: string;
  postedDate: string;
  jobDescription: string;
}

export function adaptJob(backendJob: BackendJob): Job {
  return {
    id: backendJob.id,
    JobTitle: backendJob.jobTitle,
    BusinessName: backendJob.businessName,
    WorkType: backendJob.workType,
    JobType: backendJob.jobType,
    PayRange: backendJob.payRange,
    Suburb: backendJob.suburb || "",
    Area: backendJob.area || "",
    url: backendJob.url || "",
    Status: backendJob.status as Job["Status"],
    PostedDate: backendJob.postedDate,
    JobDescription: backendJob.jobDescription || "",
  };
}

export function adaptJobs(backendJobs: BackendJob[]): Job[] {
  return backendJobs.map(adaptJob);
}
