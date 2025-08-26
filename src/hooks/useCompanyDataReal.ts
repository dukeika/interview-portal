// File: src/hooks/useCompanyDataReal.ts
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { jobService } from "@/services/jobService";
import { applicationService } from "@/services/applicationService";
import { companyService } from "@/services/companyService";
import { useErrorHandler } from "@/lib/errorHandler";
import { Job, Application, Company } from "@/API";

// Transform types for component compatibility
interface CompanyStats {
  totalJobs: number;
  activeJobs: number;
  totalApplications: number;
  newApplicationsToday: number;
  interviewsScheduled: number;
  applicationsInProgress: number;
}

interface CompanyJob {
  id: string;
  title: string;
  department: string;
  location: string;
  type: string;
  status: string;
  applicationsCount: number;
  createdAt: string;
  closingDate?: string;
}

interface CompanyApplication {
  id: string;
  candidateName: string;
  candidateEmail: string;
  jobTitle: string;
  appliedAt: string;
  currentStage: number;
  stageStatus: string;
  overallStatus: string;
  nextAction: string;
}

export function useCompanyData() {
  const { user } = useAuth();
  const { handleError } = useErrorHandler();
  const [company, setCompany] = useState<Company | null>(null);
  const [jobs, setJobs] = useState<CompanyJob[]>([]);
  const [applications, setApplications] = useState<CompanyApplication[]>([]);
  const [stats, setStats] = useState<CompanyStats>({
    totalJobs: 0,
    activeJobs: 0,
    totalApplications: 0,
    newApplicationsToday: 0,
    interviewsScheduled: 0,
    applicationsInProgress: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Get company ID from user (assuming it's stored in user attributes)
  const getCompanyId = (): string | null => {
    if (!user) return null;
    
    // In real implementation, this should come from user attributes or context
    // For now, we'll use a placeholder approach
    return user.attributes?.companyId || null;
  };

  useEffect(() => {
    const loadCompanyData = async () => {
      const companyId = getCompanyId();
      
      if (!user || !companyId) {
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        // Load company, jobs, and applications in parallel
        const [companyData, jobsData, applicationsData] = await Promise.all([
          companyService.getCompanyById(companyId),
          jobService.getJobsByCompany(companyId),
          applicationService.getApplicationsByCompany(companyId),
        ]);

        if (!companyData) {
          throw new Error("Company not found");
        }

        setCompany(companyData);

        // Transform jobs data
        const transformedJobs: CompanyJob[] = jobsData.map((job) => ({
          id: job.id,
          title: job.title,
          department: job.department,
          location: job.location,
          type: job.type,
          status: job.status,
          applicationsCount: 0, // Will be updated below
          createdAt: job.createdAt,
          closingDate: job.closingDate || undefined,
        }));

        // Transform applications data
        const transformedApplications: CompanyApplication[] = applicationsData.map((app) => ({
          id: app.id,
          candidateName: `${app.candidate?.firstName || ''} ${app.candidate?.lastName || ''}`.trim() || 'Unknown',
          candidateEmail: app.candidate?.email || 'Unknown',
          jobTitle: app.job?.title || 'Unknown Job',
          appliedAt: app.appliedAt,
          currentStage: app.currentStage,
          stageStatus: getStageStatusText(app),
          overallStatus: app.overallStatus,
          nextAction: getNextActionForCompany(app),
        }));

        // Update job application counts
        const jobApplicationCounts = transformedApplications.reduce((acc, app) => {
          const jobId = jobsData.find(job => job.title === app.jobTitle)?.id;
          if (jobId) {
            acc[jobId] = (acc[jobId] || 0) + 1;
          }
          return acc;
        }, {} as Record<string, number>);

        transformedJobs.forEach((job) => {
          job.applicationsCount = jobApplicationCounts[job.id] || 0;
        });

        setJobs(transformedJobs);
        setApplications(transformedApplications);

        // Calculate stats
        const today = new Date().toISOString().split('T')[0];
        const newToday = transformedApplications.filter(
          (app) => app.appliedAt.startsWith(today)
        ).length;

        const inProgress = transformedApplications.filter(
          (app) => app.overallStatus === 'ACTIVE'
        ).length;

        const scheduled = transformedApplications.filter(
          (app) => app.currentStage === 4 && app.stageStatus === 'scheduled'
        ).length;

        setStats({
          totalJobs: transformedJobs.length,
          activeJobs: transformedJobs.filter((job) => job.status === 'ACTIVE').length,
          totalApplications: transformedApplications.length,
          newApplicationsToday: newToday,
          interviewsScheduled: scheduled,
          applicationsInProgress: inProgress,
        });

        console.log("✅ Company data loaded successfully", {
          company: companyData.name,
          jobs: transformedJobs.length,
          applications: transformedApplications.length,
        });

      } catch (error) {
        const appError = handleError(error);
        setError(appError.message);
        console.error("❌ Error loading company data:", appError);
      } finally {
        setLoading(false);
      }
    };

    loadCompanyData();
  }, [user]);

  // Helper functions
  const getStageStatusText = (app: Application): string => {
    switch (app.currentStage) {
      case 1:
        return app.applicationStatus.toLowerCase().replace('_', ' ');
      case 2:
        return app.writtenTestStatus.toLowerCase().replace('_', ' ');
      case 3:
        return app.videoTestStatus.toLowerCase().replace('_', ' ');
      case 4:
        return app.interviewStatus.toLowerCase().replace('_', ' ');
      default:
        return 'unknown';
    }
  };

  const getNextActionForCompany = (app: Application): string => {
    switch (app.currentStage) {
      case 1:
        return "Review application";
      case 2:
        return app.writtenTestStatus === 'COMPLETED' 
          ? "Review test results" 
          : "Send test invitation";
      case 3:
        return app.videoTestStatus === 'COMPLETED' 
          ? "Review video responses" 
          : "Send video test invitation";
      case 4:
        return app.interviewStatus === 'SCHEDULED' 
          ? "Conduct interview" 
          : "Schedule interview";
      default:
        return "Review application";
    }
  };

  // Actions
  const createJob = async (jobData: any) => {
    const companyId = getCompanyId();
    if (!companyId) throw new Error("Company ID not found");

    try {
      const newJob = await jobService.createJob({
        ...jobData,
        companyId,
      });

      // Transform and add to jobs list
      const transformedJob: CompanyJob = {
        id: newJob.id,
        title: newJob.title,
        department: newJob.department,
        location: newJob.location,
        type: newJob.type,
        status: newJob.status,
        applicationsCount: 0,
        createdAt: newJob.createdAt,
        closingDate: newJob.closingDate || undefined,
      };

      setJobs((prev) => [transformedJob, ...prev]);
      setStats((prev) => ({
        ...prev,
        totalJobs: prev.totalJobs + 1,
        activeJobs: newJob.status === 'ACTIVE' ? prev.activeJobs + 1 : prev.activeJobs,
      }));

      return newJob;
    } catch (error) {
      const appError = handleError(error);
      throw new Error(appError.message);
    }
  };

  const updateJob = async (jobId: string, jobData: any) => {
    try {
      const updatedJob = await jobService.updateJob({
        id: jobId,
        ...jobData,
      });

      // Update jobs list
      setJobs((prev) =>
        prev.map((job) =>
          job.id === jobId
            ? {
                ...job,
                title: updatedJob.title,
                department: updatedJob.department,
                location: updatedJob.location,
                type: updatedJob.type,
                status: updatedJob.status,
              }
            : job
        )
      );

      return updatedJob;
    } catch (error) {
      const appError = handleError(error);
      throw new Error(appError.message);
    }
  };

  const deleteJob = async (jobId: string) => {
    try {
      await jobService.deleteJob(jobId);

      // Remove from jobs list
      setJobs((prev) => prev.filter((job) => job.id !== jobId));
      setStats((prev) => ({ ...prev, totalJobs: prev.totalJobs - 1 }));
    } catch (error) {
      const appError = handleError(error);
      throw new Error(appError.message);
    }
  };

  const updateApplicationStage = async (applicationId: string, newStage: number) => {
    try {
      await applicationService.progressToNextStage(applicationId, newStage - 1);

      // Update applications list
      setApplications((prev) =>
        prev.map((app) =>
          app.id === applicationId
            ? { ...app, currentStage: newStage, stageStatus: 'pending' }
            : app
        )
      );
    } catch (error) {
      const appError = handleError(error);
      throw new Error(appError.message);
    }
  };

  return {
    company,
    jobs,
    applications,
    stats,
    loading,
    error,
    createJob,
    updateJob,
    deleteJob,
    updateApplicationStage,
  };
}