export interface IJobList {
  jobId: number;
  companyId: number;
  jobTitle: string | null;
  companyName: string;
  jobDescription: string;
  location: string;
  jobAvailability: string;
  jobType: string;
  jobForTime: string | null;
  postedDate: string;
  expiryDate: string;
  salary: string;
  salaryType: string | null;
  industries: string;
  status: string | null;
  companyLogo: string; // Assuming this is a path to the company logo
  isBookMarked: boolean;
  feedback: string;
  linkedInURL: string;
  externalUrl: string;
  redirectedUrl: string;
}
