// File: src/components/candidate/CandidateDashboard.tsx
import React, { useState } from "react";
import { useCandidateData } from "@/hooks/useCandidateDataReal";
import CandidateDashboardHeader from "./CandidateDashboardHeader";
import CandidateDashboardNavigation from "./CandidateDashboardNavigation";
import TestTab from "./TestTab";
import VideoTestTab from "./VideoTestTab";
import InterviewTab from "./InterviewTab";
import CandidateProfile from "./CandidateProfile";
import NotificationsTab from "./NotificationsTab";
import { CandidateTabType, Job, CandidateApplication } from "./types";
import { useAuth } from "@/contexts/AuthContext";
import { userService } from "@/services/userService";

// Job Browse Tab Component
interface JobBrowseTabProps {
  jobs: Job[];
  onApply: (jobId: string) => void;
  hasApplied: (jobId: string) => boolean;
}

function JobBrowseTab({ jobs, onApply, hasApplied }: JobBrowseTabProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Browse Jobs</h2>
      <div className="space-y-4">
        {jobs.map((job: Job) => (
          <div key={job.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-gray-900">{job.title}</h3>
                <p className="text-gray-600">{job.company}</p>
                <p className="text-sm text-gray-500">
                  {job.location} • {job.type}
                </p>
                {job.salary && (
                  <p className="text-sm text-green-600 font-medium">
                    {job.salary}
                  </p>
                )}
              </div>
              {hasApplied(job.id) ? (
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full">
                  Applied
                </span>
              ) : (
                <button
                  onClick={() => onApply(job.id)}
                  className="px-4 py-2 bg-abhh-teal-600 text-white rounded hover:bg-abhh-teal-700"
                >
                  Apply
                </button>
              )}
            </div>
            <p className="text-gray-600 mt-2">{job.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

// Applications Tab Component
interface ApplicationsTabProps {
  applications: CandidateApplication[];
  onStartTest: (applicationId: string) => void;
  onStartVideoTest: (applicationId: string) => void;
  onJoinInterview: (applicationId: string) => void;
}

function ApplicationsTab({
  applications,
  onStartTest,
  onStartVideoTest,
  onJoinInterview,
}: ApplicationsTabProps) {
  const getStageColor = (stage: number, currentStage: number) => {
    if (stage < currentStage) return "bg-green-100 text-green-800";
    if (stage === currentStage) return "bg-blue-100 text-blue-800";
    return "bg-gray-100 text-gray-500";
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        My Applications
      </h2>
      <div className="space-y-4">
        {applications.map((app: CandidateApplication) => (
          <div key={app.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">{app.jobTitle}</h3>
                <p className="text-gray-600">{app.company}</p>
                <p className="text-sm text-gray-500">
                  Applied on {app.appliedAt}
                </p>
              </div>
              <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full">
                Stage {app.currentStage}/4
              </span>
            </div>

            {/* Stage Progress */}
            <div className="grid grid-cols-4 gap-2 mb-4">
              {["Application", "Written Test", "Video Test", "Interview"].map(
                (stage, index) => (
                  <div key={stage} className="text-center">
                    <div
                      className={`text-xs px-2 py-1 rounded ${getStageColor(
                        index + 1,
                        app.currentStage
                      )}`}
                    >
                      {stage}
                    </div>
                  </div>
                )
              )}
            </div>

            {/* Next Action */}
            {app.nextAction && (
              <div className="mt-3 p-3 bg-yellow-50 border border-yellow-200 rounded">
                <p className="text-sm text-yellow-800">{app.nextAction}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="mt-4 flex space-x-3">
              {/* Written Test Button */}
              {app.currentStage === 2 &&
                app.stages.written_test.status === "pending" && (
                  <button
                    onClick={() => onStartTest(app.id)}
                    className="px-4 py-2 bg-abhh-teal-600 text-white rounded hover:bg-abhh-teal-700 text-sm flex items-center space-x-2"
                  >
                    <span>📝</span>
                    <span>Start Written Test</span>
                  </button>
                )}

              {/* Video Test Button */}
              {app.currentStage === 3 &&
                app.stages.video_test.status === "pending" && (
                  <button
                    onClick={() => onStartVideoTest(app.id)}
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm flex items-center space-x-2"
                  >
                    <span>🎥</span>
                    <span>Start Video Test</span>
                  </button>
                )}

              {/* Interview Button */}
              {app.currentStage === 4 &&
                app.stages.interview.status === "scheduled" && (
                  <button
                    onClick={() => onJoinInterview(app.id)}
                    className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm flex items-center space-x-2"
                  >
                    <span>💼</span>
                    <span>View Interview</span>
                  </button>
                )}

              {/* Debug Info - Remove this in production */}
              <div className="text-xs text-gray-400 ml-auto">
                Stage: {app.currentStage}, Status:{" "}
                {app.stages.interview?.status || "N/A"}
              </div>
            </div>
          </div>
        ))}

        {applications.length === 0 && (
          <p className="text-gray-500 text-center py-8">
            No applications yet. Start browsing jobs!
          </p>
        )}
      </div>
    </div>
  );
}

// Main Dashboard Component
export default function CandidateDashboard() {
  const [activeTab, setActiveTab] = useState<CandidateTabType>("applications");
  const [testApplicationId, setTestApplicationId] = useState<string | null>(
    null
  );
  const [videoTestApplicationId, setVideoTestApplicationId] = useState<
    string | null
  >(null);
  const [interviewApplicationId, setInterviewApplicationId] = useState<
    string | null
  >(null);
  const [userProfile, setUserProfile] = useState<any>(null);

  const { user } = useAuth();
  const { jobs, applications, stats, loading, applyToJob, hasApplied } =
    useCandidateData();

  // Load user profile
  React.useEffect(() => {
    if (user?.sub) {
      loadUserProfile();
    }
  }, [user?.sub]);

  const loadUserProfile = async () => {
    try {
      const profile = await userService.getUserBySub(user?.sub || '');
      setUserProfile(profile);
    } catch (error) {
      console.error('Error loading user profile:', error);
    }
  };

  const handleProfileUpdate = async (updates: any) => {
    if (!userProfile) return;
    
    try {
      const updatedProfile = await userService.updateUser({
        id: userProfile.id,
        ...updates
      });
      setUserProfile(updatedProfile);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-abhh-teal-600"></div>
      </div>
    );
  }

  const handleStartTest = (applicationId: string) => {
    console.log("Starting written test for application:", applicationId);
    setTestApplicationId(applicationId);
    setActiveTab("test");
  };

  const handleStartVideoTest = (applicationId: string) => {
    console.log("Starting video test for application:", applicationId);
    setVideoTestApplicationId(applicationId);
    setActiveTab("video");
  };

  const handleJoinInterview = (applicationId: string) => {
    console.log("Joining interview for application:", applicationId);
    setInterviewApplicationId(applicationId);
    setActiveTab("interview");
  };

  const renderActiveTab = () => {
    switch (activeTab) {
      case "browse":
        return (
          <JobBrowseTab
            jobs={jobs}
            onApply={applyToJob}
            hasApplied={hasApplied}
          />
        );
      case "applications":
        return (
          <ApplicationsTab
            applications={applications}
            onStartTest={handleStartTest}
            onStartVideoTest={handleStartVideoTest}
            onJoinInterview={handleJoinInterview}
          />
        );
      case "test":
        return <TestTab applicationId={testApplicationId || undefined} />;
      case "video":
        return (
          <VideoTestTab applicationId={videoTestApplicationId || undefined} />
        );
      case "interview":
        return (
          <InterviewTab applicationId={interviewApplicationId || undefined} />
        );
      case "profile":
        return userProfile ? (
          <CandidateProfile
            profile={userProfile}
            onProfileUpdate={handleProfileUpdate}
          />
        ) : (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="animate-pulse">
              <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-200 rounded w-full"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2"></div>
              </div>
            </div>
          </div>
        );
      case "notifications":
        return <NotificationsTab />;
      default:
        return (
          <ApplicationsTab
            applications={applications}
            onStartTest={handleStartTest}
            onStartVideoTest={handleStartVideoTest}
            onJoinInterview={handleJoinInterview}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CandidateDashboardHeader />
      <CandidateDashboardNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-2xl font-bold text-gray-900">
              {stats.availableJobs}
            </div>
            <div className="text-sm text-gray-600">Available Jobs</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-2xl font-bold text-gray-900">
              {stats.totalApplications}
            </div>
            <div className="text-sm text-gray-600">Applications</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-2xl font-bold text-gray-900">
              {
                applications.filter(
                  (app) =>
                    app.currentStage === 2 &&
                    app.stages.written_test.status === "pending"
                ).length
              }
            </div>
            <div className="text-sm text-gray-600">Tests Available</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-2xl font-bold text-gray-900">
              {
                applications.filter(
                  (app) =>
                    app.currentStage === 3 &&
                    app.stages.video_test.status === "pending"
                ).length
              }
            </div>
            <div className="text-sm text-gray-600">Video Tests</div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="text-2xl font-bold text-gray-900">
              {
                applications.filter(
                  (app) =>
                    app.currentStage === 4 &&
                    app.stages.interview.status === "scheduled"
                ).length
              }
            </div>
            <div className="text-sm text-gray-600">Interviews</div>
          </div>
        </div>

        {renderActiveTab()}
      </div>
    </div>
  );
}
