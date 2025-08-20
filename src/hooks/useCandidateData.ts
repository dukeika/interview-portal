// File: src/hooks/useCandidateData.ts
import { useState, useEffect } from "react";
import {
  Job,
  CandidateApplication,
  CandidateStats,
} from "@/components/candidate/types";

// Mock data for candidate portal
const mockJobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    salary: "$80,000 - $120,000",
    description:
      "We are looking for a skilled Frontend Developer to join our dynamic team and help build the next generation of web applications.",
    requirements: [
      "5+ years of React experience",
      "TypeScript proficiency",
      "Modern CSS frameworks",
      "API integration experience",
    ],
    responsibilities: [
      "Develop user interfaces using React and TypeScript",
      "Collaborate with design team",
      "Optimize applications for performance",
      "Mentor junior developers",
    ],
    benefits: [
      "Health insurance",
      "Remote work",
      "401k matching",
      "Professional development",
    ],
    status: "active",
    createdAt: "2024-08-15",
    closingDate: "2024-09-15",
    companyLogo: "https://via.placeholder.com/40x40",
  },
  {
    id: "2",
    title: "Product Manager",
    company: "InnovateLabs",
    department: "Product",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$100,000 - $140,000",
    description:
      "Join our product team to drive innovation and user experience across our platform.",
    requirements: [
      "3+ years product management experience",
      "Strong analytical skills",
      "Experience with agile methodologies",
      "Excellent communication skills",
    ],
    responsibilities: [
      "Define product roadmap and strategy",
      "Work with engineering and design teams",
      "Conduct user research and analysis",
      "Manage product launches",
    ],
    status: "active",
    createdAt: "2024-08-10",
    closingDate: "2024-09-10",
  },
  {
    id: "3",
    title: "UX Designer",
    company: "DesignStudio",
    department: "Design",
    location: "New York, NY",
    type: "Full-time",
    salary: "$70,000 - $95,000",
    description:
      "Create exceptional user experiences for our digital products and help shape the future of design.",
    requirements: [
      "Portfolio of UX design work",
      "Proficiency in Figma/Sketch",
      "User research experience",
      "Understanding of design systems",
    ],
    responsibilities: [
      "Create wireframes and prototypes",
      "Conduct user research",
      "Collaborate with product team",
      "Design user interfaces",
    ],
    status: "active",
    createdAt: "2024-08-12",
    closingDate: "2024-09-20",
  },
];

const mockApplications: CandidateApplication[] = [
  {
    id: "app1",
    jobId: "1",
    jobTitle: "Senior Frontend Developer",
    company: "TechCorp Inc.",
    appliedAt: "2024-08-18",
    currentStage: 2,
    stageStatus: "pending",
    overallStatus: "active",
    stages: {
      application: { status: "completed", completedAt: "2024-08-18" },
      written_test: { status: "pending" },
      video_test: { status: "not_started" },
      interview: { status: "not_started" },
    },
    nextAction: "Complete written assessment by Aug 25th",
  },
  {
    id: "app2",
    jobId: "2",
    jobTitle: "Product Manager",
    company: "InnovateLabs",
    appliedAt: "2024-08-16",
    currentStage: 3,
    stageStatus: "in_progress",
    overallStatus: "active",
    stages: {
      application: { status: "completed", completedAt: "2024-08-16" },
      written_test: {
        status: "completed",
        completedAt: "2024-08-19",
        score: 85,
      },
      video_test: { status: "pending" },
      interview: { status: "not_started" },
    },
    nextAction: "Record video responses by Aug 23rd",
  },
];

export function useCandidateData() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<CandidateApplication[]>([]);
  const [stats, setStats] = useState<CandidateStats>({
    totalApplications: 0,
    activeApplications: 0,
    completedApplications: 0,
    interviewsScheduled: 0,
    availableJobs: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call
    const loadData = async () => {
      setLoading(true);

      // Simulate delay
      await new Promise((resolve) => setTimeout(resolve, 500));

      setJobs(mockJobs);
      setApplications(mockApplications);

      // Calculate stats
      const activeApps = mockApplications.filter(
        (app) => app.overallStatus === "active"
      ).length;
      const scheduledInterviews = mockApplications.filter(
        (app) => app.stages.interview.status === "scheduled"
      ).length;

      setStats({
        totalApplications: mockApplications.length,
        activeApplications: activeApps,
        completedApplications: mockApplications.length - activeApps,
        interviewsScheduled: scheduledInterviews,
        availableJobs: mockJobs.filter((job) => job.status === "active").length,
      });

      setLoading(false);
    };

    loadData();
  }, []);

  const applyToJob = async (jobId: string) => {
    // Mock application submission
    const job = jobs.find((j) => j.id === jobId);
    if (!job) return;

    const newApplication: CandidateApplication = {
      id: `app${Date.now()}`,
      jobId,
      jobTitle: job.title,
      company: job.company,
      appliedAt: new Date().toISOString().split("T")[0],
      currentStage: 1,
      stageStatus: "completed",
      overallStatus: "active",
      stages: {
        application: {
          status: "completed",
          completedAt: new Date().toISOString().split("T")[0],
        },
        written_test: { status: "not_started" },
        video_test: { status: "not_started" },
        interview: { status: "not_started" },
      },
      nextAction: "Wait for written test invitation",
    };

    setApplications((prev) => [newApplication, ...prev]);

    // Update stats
    setStats((prev) => ({
      ...prev,
      totalApplications: prev.totalApplications + 1,
      activeApplications: prev.activeApplications + 1,
    }));
  };

  const hasApplied = (jobId: string) => {
    return applications.some((app) => app.jobId === jobId);
  };

  return {
    jobs,
    applications,
    stats,
    loading,
    applyToJob,
    hasApplied,
  };
}
