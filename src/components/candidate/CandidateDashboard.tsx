// Updated: src/components/candidate/CandidateDashboard.tsx
import { useState } from "react";
import { useCandidateData } from "@/hooks/useCandidateData";
import CandidateDashboardHeader from "./CandidateDashboardHeader";
import CandidateDashboardNavigation from "./CandidateDashboardNavigation";
import TestTab from "./TestTab"; // Now import the real TestTab
import { CandidateTabType } from "./types";

// Simplified components for now
function JobBrowseTab({ jobs, onApply, hasApplied }: any) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Browse Jobs</h2>
      <div className="space-y-4">
        {jobs.map((job: any) => (
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

function ApplicationsTab({ applications, onStartTest }: any) {
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
        {applications.map((app: any) => (
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
              {app.currentStage === 2 &&
                app.stages.written_test.status === "pending" && (
                  <button
                    onClick={() => onStartTest(app.id)}
                    className="px-4 py-2 bg-abhh-teal-600 text-white rounded hover:bg-abhh-teal-700 text-sm"
                  >
                    Start Written Test
                  </button>
                )}

              {app.currentStage === 3 &&
                app.stages.video_test.status === "pending" && (
                  <button className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 text-sm">
                    Record Video Test
                  </button>
                )}

              {app.stages.interview.status === "scheduled" && (
                <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 text-sm">
                  Join Interview
                </button>
              )}
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

export default function CandidateDashboard() {
  const [activeTab, setActiveTab] = useState<CandidateTabType>("browse");
  const [testApplicationId, setTestApplicationId] = useState<string | null>(
    null
  );
  const { jobs, applications, stats, loading, applyToJob, hasApplied } =
    useCandidateData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-abhh-teal-600"></div>
      </div>
    );
  }

  const handleStartTest = (applicationId: string) => {
    setTestApplicationId(applicationId);
    setActiveTab("test");
  };

  const handleCloseTest = () => {
    setTestApplicationId(null);
    setActiveTab("applications");
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
          />
        );
      case "test":
        return <TestTab applicationId={testApplicationId || undefined} />;
      case "profile":
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Profile Management
            </h2>
            <p className="text-gray-600">
              Profile settings and resume management coming soon...
            </p>
          </div>
        );
      case "notifications":
        return (
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Notifications
            </h2>
            <p className="text-gray-600">Notification center coming soon...</p>
          </div>
        );
      default:
        return (
          <JobBrowseTab
            jobs={jobs}
            onApply={applyToJob}
            hasApplied={hasApplied}
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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
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
              {stats.activeApplications}
            </div>
            <div className="text-sm text-gray-600">In Progress</div>
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
        </div>

        {renderActiveTab()}
      </div>
    </div>
  );
}
