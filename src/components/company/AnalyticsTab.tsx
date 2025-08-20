// src/components/company/AnalyticsTab.tsx
"use client";

import { Button } from "@/components/ui/button";
import { Download, FileText, Calendar } from "lucide-react";
import { Application } from "./types";

interface AnalyticsTabProps {
  applications: Application[];
}

export default function AnalyticsTab({ applications }: AnalyticsTabProps) {
  const totalApplications = applications.length;
  const writtenTestCompleted = applications.filter((a) =>
    ["written_test", "video_test", "interview", "completed"].includes(a.stage)
  ).length;
  const videoTestCompleted = applications.filter((a) =>
    ["video_test", "interview", "completed"].includes(a.stage)
  ).length;
  const interviewCompleted = applications.filter((a) =>
    ["interview", "completed"].includes(a.stage)
  ).length;
  const hired = applications.filter(
    (a) => a.stage === "completed" && a.status === "approved"
  ).length;

  const funnelData = [
    {
      label: "Applications Received",
      count: totalApplications,
      percentage: 100,
    },
    {
      label: "Written Test Completed",
      count: writtenTestCompleted,
      percentage:
        totalApplications > 0
          ? (writtenTestCompleted / totalApplications) * 100
          : 0,
    },
    {
      label: "Video Test Completed",
      count: videoTestCompleted,
      percentage:
        totalApplications > 0
          ? (videoTestCompleted / totalApplications) * 100
          : 0,
    },
    {
      label: "Interview Completed",
      count: interviewCompleted,
      percentage:
        totalApplications > 0
          ? (interviewCompleted / totalApplications) * 100
          : 0,
    },
    {
      label: "Hired",
      count: hired,
      percentage: totalApplications > 0 ? (hired / totalApplications) * 100 : 0,
    },
  ];

  const metrics = [
    { label: "Average Time to Hire", value: "14 days" },
    {
      label: "Conversion Rate",
      value: `${
        totalApplications > 0
          ? Math.round((hired / totalApplications) * 100)
          : 0
      }%`,
    },
    { label: "Applications This Week", value: "8" },
    {
      label: "Interviews Scheduled",
      value: applications
        .filter((a) => a.stage === "interview")
        .length.toString(),
    },
    { label: "Offers Extended", value: hired.toString() },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900">Analytics & Reports</h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Application Funnel */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Application Funnel
          </h3>
          <div className="space-y-4">
            {funnelData.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-600">{item.label}</span>
                  <span className="text-sm font-medium">{item.count}</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      index === funnelData.length - 1
                        ? "bg-green-600"
                        : "bg-blue-600"
                    }`}
                    style={{ width: `${item.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key Metrics */}
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">
            Key Metrics
          </h3>
          <div className="space-y-4">
            {metrics.map((metric, index) => (
              <div key={index} className="flex justify-between items-center">
                <span className="text-sm text-gray-600">{metric.label}</span>
                <span className="text-sm font-medium">{metric.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white p-6 rounded-lg shadow">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Quick Actions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="justify-start">
            <Download className="mr-2 h-4 w-4" />
            Export Applications Report
          </Button>
          <Button variant="outline" className="justify-start">
            <FileText className="mr-2 h-4 w-4" />
            Generate Hiring Report
          </Button>
          <Button variant="outline" className="justify-start">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule Bulk Interviews
          </Button>
        </div>
      </div>
    </div>
  );
}
