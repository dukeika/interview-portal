"use client";

import { useState } from "react";
import { useAdminData } from "@/hooks/useAdminData";
import AdminDashboardHeader from "@/components/admin/AdminDashboardHeader";
import AdminDashboardNavigation from "@/components/admin/AdminDashboardNavigation";
import AdminOverviewTab from "@/components/admin/AdminOverviewTab";
import AdminCompaniesTab from "@/components/admin/AdminCompaniesTab";
import AdminUsersTab from "@/components/admin/AdminUsersTab";
import { AdminTabType } from "@/components/admin/types";

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTabType>("overview");
  const { companies, companyAdmins, platformStats, recentActivity, loading } =
    useAdminData();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const renderActiveTab = () => {
    switch (activeTab) {
      case "overview":
        return (
          <AdminOverviewTab
            stats={platformStats}
            recentActivity={recentActivity}
          />
        );
      case "companies":
        return <AdminCompaniesTab companies={companies} />;
      case "users":
        return (
          <AdminUsersTab companyAdmins={companyAdmins} companies={companies} />
        );
      case "analytics":
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">
              Analytics Dashboard
            </h3>
            <p className="text-gray-600 mt-2">
              Advanced analytics and reporting features coming soon...
            </p>
          </div>
        );
      case "settings":
        return (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">
              Platform Settings
            </h3>
            <p className="text-gray-600 mt-2">
              System configuration and settings panel coming soon...
            </p>
          </div>
        );
      default:
        return (
          <AdminOverviewTab
            stats={platformStats}
            recentActivity={recentActivity}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminDashboardHeader />
      <AdminDashboardNavigation
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActiveTab()}
      </div>
    </div>
  );
}
