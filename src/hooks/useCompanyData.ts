// src/hooks/useCompanyData.ts
import { useState, useEffect } from "react";
import { Job, Application } from "@/components/company/types";

export function useCompanyData() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API call with timeout
    const loadData = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      setJobs([
        {
          id: "1",
          title: "Senior Frontend Developer",
          department: "Engineering",
          location: "Remote",
          type: "Full-time",
          status: "active",
          applicationsCount: 23,
          createdAt: "2024-08-15",
        },
        {
          id: "2",
          title: "Product Manager",
          department: "Product",
          location: "San Francisco, CA",
          type: "Full-time",
          status: "active",
          applicationsCount: 15,
          createdAt: "2024-08-10",
        },
        {
          id: "3",
          title: "UX Designer",
          department: "Design",
          location: "New York, NY",
          type: "Contract",
          status: "paused",
          applicationsCount: 8,
          createdAt: "2024-08-05",
        },
        {
          id: "4",
          title: "Backend Developer",
          department: "Engineering",
          location: "Austin, TX",
          type: "Full-time",
          status: "active",
          applicationsCount: 19,
          createdAt: "2024-08-12",
        },
        {
          id: "5",
          title: "Data Scientist",
          department: "Analytics",
          location: "Remote",
          type: "Full-time",
          status: "closed",
          applicationsCount: 31,
          createdAt: "2024-07-28",
        },
      ]);

      setApplications([
        {
          id: "1",
          candidateName: "John Smith",
          candidateEmail: "john.smith@email.com",
          jobTitle: "Senior Frontend Developer",
          stage: "written_test",
          status: "pending",
          appliedAt: "2024-08-18",
          currentStage: 2,
          totalStages: 4,
        },
        {
          id: "2",
          candidateName: "Sarah Johnson",
          candidateEmail: "sarah.j@email.com",
          jobTitle: "Product Manager",
          stage: "interview",
          status: "approved",
          appliedAt: "2024-08-17",
          currentStage: 4,
          totalStages: 4,
        },
        {
          id: "3",
          candidateName: "Mike Davis",
          candidateEmail: "mike.davis@email.com",
          jobTitle: "Senior Frontend Developer",
          stage: "video_test",
          status: "pending",
          appliedAt: "2024-08-16",
          currentStage: 3,
          totalStages: 4,
        },
        {
          id: "4",
          candidateName: "Emily Chen",
          candidateEmail: "emily.chen@email.com",
          jobTitle: "UX Designer",
          stage: "applied",
          status: "pending",
          appliedAt: "2024-08-15",
          currentStage: 1,
          totalStages: 4,
        },
        {
          id: "5",
          candidateName: "David Wilson",
          candidateEmail: "david.wilson@email.com",
          jobTitle: "Product Manager",
          stage: "completed",
          status: "approved",
          appliedAt: "2024-08-12",
          currentStage: 4,
          totalStages: 4,
        },
        {
          id: "6",
          candidateName: "Lisa Rodriguez",
          candidateEmail: "lisa.r@email.com",
          jobTitle: "Backend Developer",
          stage: "written_test",
          status: "pending",
          appliedAt: "2024-08-14",
          currentStage: 2,
          totalStages: 4,
        },
        {
          id: "7",
          candidateName: "Alex Kim",
          candidateEmail: "alex.kim@email.com",
          jobTitle: "Data Scientist",
          stage: "video_test",
          status: "rejected",
          appliedAt: "2024-08-13",
          currentStage: 3,
          totalStages: 4,
        },
        {
          id: "8",
          candidateName: "James Brown",
          candidateEmail: "james.brown@email.com",
          jobTitle: "Senior Frontend Developer",
          stage: "interview",
          status: "pending",
          appliedAt: "2024-08-11",
          currentStage: 4,
          totalStages: 4,
        },
      ]);

      setLoading(false);
    };

    loadData();
  }, []);

  return { jobs, applications, loading };
}
