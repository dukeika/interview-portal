// Updated: src/components/candidate/CandidateDashboardNavigation.tsx
import { CandidateTabType } from "./types";
import { Search, FileText, User, Bell, PenTool } from "lucide-react";

interface CandidateDashboardNavigationProps {
  activeTab: CandidateTabType;
  setActiveTab: (tab: CandidateTabType) => void;
}

export default function CandidateDashboardNavigation({
  activeTab,
  setActiveTab,
}: CandidateDashboardNavigationProps) {
  const tabs = [
    { id: "browse" as CandidateTabType, label: "Browse Jobs", icon: Search },
    {
      id: "applications" as CandidateTabType,
      label: "My Applications",
      icon: FileText,
    },
    { id: "test" as CandidateTabType, label: "Tests", icon: PenTool },
    { id: "profile" as CandidateTabType, label: "Profile", icon: User },
    {
      id: "notifications" as CandidateTabType,
      label: "Notifications",
      icon: Bell,
    },
  ];

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex space-x-8">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                  activeTab === tab.id
                    ? "border-abhh-teal-600 text-abhh-teal-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
