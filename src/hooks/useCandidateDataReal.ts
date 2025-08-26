// File: src/hooks/useCandidateDataReal.ts
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { jobService } from "@/services/jobService";
import { applicationService } from "@/services/applicationService";
import { Job, Application } from "@/API";

// Type transformations from GraphQL types to component types
interface TransformedJob {
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

interface TransformedApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  company: string;
  appliedAt: string;
  currentStage: 1 | 2 | 3 | 4;
  stageStatus: "pending" | "in_progress" | "completed" | "failed";
  overallStatus: "active" | "rejected" | "hired" | "withdrawn";
  stages: {
    application: { status: string; completedAt?: string };
    written_test: { status: string; completedAt?: string; score?: number };
    video_test: { status: string; completedAt?: string; score?: number };
    interview: { status: string; scheduledAt?: string };
  };
  nextAction?: string;
  feedback?: string;
}

interface CandidateStats {
  totalApplications: number;
  activeApplications: number;
  completedApplications: number;
  interviewsScheduled: number;
  availableJobs: number;
}

// Transform GraphQL Job to component Job
const transformJob = (job: Job): TransformedJob => ({
  id: job.id,
  title: job.title,
  company: job.company?.name || "Unknown Company",
  department: job.department,
  location: job.location,
  type: job.type.toLowerCase().replace('_', '-') as "Full-time" | "Part-time" | "Contract" | "Internship",
  salary: job.salary || undefined,
  description: job.description,
  requirements: job.requirements || [],
  responsibilities: job.responsibilities || [],
  benefits: job.benefits || undefined,
  status: job.status.toLowerCase() as "active" | "closed",
  createdAt: job.createdAt,
  closingDate: job.closingDate || undefined,
  companyLogo: job.company?.logo || undefined,
});

// Transform GraphQL Application to component Application
const transformApplication = (app: Application): TransformedApplication => ({
  id: app.id,
  jobId: app.jobId,
  jobTitle: app.job?.title || "Unknown Job",
  company: app.job?.company?.name || "Unknown Company",
  appliedAt: app.appliedAt,
  currentStage: app.currentStage as 1 | 2 | 3 | 4,
  stageStatus: getStageStatus(app),
  overallStatus: app.overallStatus.toLowerCase() as "active" | "rejected" | "hired" | "withdrawn",
  stages: {
    application: { 
      status: app.applicationStatus.toLowerCase().replace('_', '_'),
      completedAt: app.appliedAt 
    },
    written_test: { 
      status: app.writtenTestStatus.toLowerCase().replace('_', '_'),
      // TODO: Add score from test attempts
    },
    video_test: { 
      status: app.videoTestStatus.toLowerCase().replace('_', '_'),
      // TODO: Add score from video test attempts
    },
    interview: { 
      status: app.interviewStatus.toLowerCase().replace('_', '_'),
      // TODO: Add scheduled time from interviews
    }
  },
  nextAction: getNextAction(app),
  feedback: app.feedback || undefined,
});

// Helper function to determine stage status
const getStageStatus = (app: Application): "pending" | "in_progress" | "completed" | "failed" => {
  const stage = app.currentStage;
  
  switch (stage) {
    case 1:
      return app.applicationStatus === 'COMPLETED' ? 'completed' : 'pending';
    case 2:
      return app.writtenTestStatus === 'COMPLETED' ? 'completed' : 
             app.writtenTestStatus === 'IN_PROGRESS' ? 'in_progress' : 'pending';
    case 3:
      return app.videoTestStatus === 'COMPLETED' ? 'completed' : 
             app.videoTestStatus === 'IN_PROGRESS' ? 'in_progress' : 'pending';
    case 4:
      return app.interviewStatus === 'COMPLETED' ? 'completed' : 
             app.interviewStatus === 'IN_PROGRESS' ? 'in_progress' : 'pending';
    default:
      return 'pending';
  }
};

// Helper function to determine next action
const getNextAction = (app: Application): string => {
  switch (app.currentStage) {
    case 1:
      return "Wait for application review";
    case 2:
      return app.writtenTestStatus === 'PENDING' 
        ? "Complete written assessment" 
        : "Wait for test results";
    case 3:
      return app.videoTestStatus === 'PENDING' 
        ? "Record video responses" 
        : "Wait for video review";
    case 4:
      return app.interviewStatus === 'SCHEDULED' 
        ? "Attend interview" 
        : "Wait for interview scheduling";
    default:
      return "Application in progress";
  }
};

export function useCandidateData() {
  const { user } = useAuth();
  const [jobs, setJobs] = useState<TransformedJob[]>([]);
  const [applications, setApplications] = useState<TransformedApplication[]>([]);
  const [stats, setStats] = useState<CandidateStats>({
    totalApplications: 0,
    activeApplications: 0,
    completedApplications: 0,
    interviewsScheduled: 0,
    availableJobs: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      if (!user) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Load jobs and applications in parallel
        const [jobsData, applicationsData] = await Promise.all([
          jobService.getActiveJobs(),
          applicationService.getApplicationsByCandidate(user.userId || user.username),
        ]);

        // Transform the data
        const transformedJobs = jobsData.map(transformJob);
        const transformedApplications = applicationsData.map(transformApplication);

        setJobs(transformedJobs);
        setApplications(transformedApplications);

        // Calculate stats
        const activeApps = transformedApplications.filter(
          (app) => app.overallStatus === "active"
        ).length;

        const scheduledInterviews = transformedApplications.filter(
          (app) => app.stages.interview.status === "scheduled"
        ).length;

        setStats({
          totalApplications: transformedApplications.length,
          activeApplications: activeApps,
          completedApplications: transformedApplications.length - activeApps,
          interviewsScheduled: scheduledInterviews,
          availableJobs: transformedJobs.length,
        });

        console.log("✅ Candidate data loaded successfully", {
          jobs: transformedJobs.length,
          applications: transformedApplications.length,
        });
      } catch (error) {
        console.error("❌ Error loading candidate data:", error);
        setError(error instanceof Error ? error.message : "Failed to load data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [user]);

  const applyToJob = async (jobId: string) => {
    if (!user) {
      throw new Error("User not authenticated");
    }

    try {
      const newApplication = await applicationService.applyToJob(
        user.userId || user.username,
        jobId
      );

      // Transform and add to applications
      const transformedApp = transformApplication(newApplication);
      setApplications((prev) => [transformedApp, ...prev]);

      // Update stats
      setStats((prev) => ({
        ...prev,
        totalApplications: prev.totalApplications + 1,
        activeApplications: prev.activeApplications + 1,
      }));

      console.log("✅ Applied to job successfully:", jobId);
      return newApplication;
    } catch (error) {
      console.error("❌ Error applying to job:", error);
      throw error;
    }
  };

  const hasApplied = (jobId: string) => {
    return applications.some((app) => app.jobId === jobId);
  };

  return {
    jobs,
    applications,
    stats,
    loading,
    error,
    applyToJob,
    hasApplied,
  };
}