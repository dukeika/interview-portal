// File: src/components/candidate/types.ts
export interface Job {
  id: string;
  title: string;
  company: string;
  department: string;
  location: string;
  type: "Full-time" | "Part-time" | "Contract" | "Internship";
  salary?: string;
  description: string;
  requirements: string[];
  responsibilities: string[];
  benefits?: string[];
  status: "active" | "closed";
  createdAt: string;
  closingDate?: string;
  companyLogo?: string;
}

export interface StageBase {
  status: string;
  completedAt?: string;
  score?: number;
  scheduledAt?: string;
}

export interface ApplicationStage extends StageBase {
  status: "completed" | "pending";
}

export interface TestStage extends StageBase {
  status: "completed" | "pending" | "not_started";
  score?: number;
}

export interface InterviewStage extends StageBase {
  status: "completed" | "pending" | "not_started" | "scheduled";
  scheduledAt?: string;
}

export interface CandidateApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  appliedAt: string;
  currentStage: 1 | 2 | 3 | 4;
  stageStatus: "pending" | "in_progress" | "completed" | "failed";
  overallStatus: "active" | "rejected" | "hired" | "withdrawn";
  stages: {
    application: ApplicationStage;
    written_test: TestStage;
    video_test: TestStage;
    interview: InterviewStage;
  };
  nextAction?: string;
  feedback?: string;
}

export interface CandidateStats {
  totalApplications: number;
  activeApplications: number;
  completedApplications: number;
  interviewsScheduled: number;
  availableJobs: number;
}
export interface TestQuestion {
  id: string;
  question: string;
  type: "multiple_choice" | "text" | "coding";
  options?: string[]; // For multiple choice
  correctAnswer?: string | number; // For scoring
  points: number;
  timeLimit?: number; // Seconds for this question
  category: string;
  difficulty: "easy" | "medium" | "hard";
}

export interface Test {
  id: string;
  jobId: string;
  title: string;
  description: string;
  instructions: string;
  timeLimit: number; // Total time in minutes
  totalPoints: number;
  passingScore: number; // Percentage needed to pass
  questions: TestQuestion[];
  createdAt: string;
  isActive: boolean;
}

export interface TestAttempt {
  id: string;
  testId: string;
  candidateId: string;
  applicationId: string;
  startedAt: string;
  completedAt?: string;
  timeRemaining: number;
  status: "in_progress" | "completed" | "abandoned" | "expired";
  answers: Record<string, any>; // questionId -> answer
  score?: number;
  percentage?: number;
  passed?: boolean;
}

// Add to existing CandidateTabType
export type CandidateTabType =
  | "browse"
  | "applications"
  | "profile"
  | "notifications"
  | "test";
