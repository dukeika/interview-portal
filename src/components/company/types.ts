export interface Job {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  status: "active" | "paused" | "closed";
  applicationsCount: number;
  createdAt: string;
}

export interface Application {
  id: string;
  candidateName: string;
  candidateEmail: string;
  jobTitle: string;
  stage: "applied" | "written_test" | "video_test" | "interview" | "completed";
  status: "pending" | "approved" | "rejected";
  appliedAt: string;
  currentStage: number;
  totalStages: number;
}

export type TabType = "overview" | "jobs" | "applications" | "analytics";
