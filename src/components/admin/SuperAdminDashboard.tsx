//src/components/admin/SuperAdminDashboard.tsx
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
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-abhh-teal-50 to-white">
        <div className="text-center">
          <div className="w-16 h-16 bg-abhh-yellow-500 rounded-xl flex items-center justify-center mb-4 mx-auto shadow-abhh animate-pulse">
            <div className="w-8 h-8 border-2 border-abhh-teal-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
          <p className="text-abhh-teal-600 font-medium">
            Loading ABHH Platform...
          </p>
        </div>
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
            <div className="w-16 h-16 bg-abhh-yellow-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="text-lg font-medium text-abhh-teal-700">
              Analytics Dashboard
            </h3>
            <p className="text-abhh-teal-500 mt-2">
              Advanced analytics and reporting features coming soon...
            </p>
          </div>
        );
      case "settings":
        return (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-abhh-yellow-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
              <span className="text-2xl">⚙️</span>
            </div>
            <h3 className="text-lg font-medium text-abhh-teal-700">
              Platform Settings
            </h3>
            <p className="text-abhh-teal-500 mt-2">
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
    <div className="min-h-screen bg-gradient-to-br from-abhh-teal-50 to-white">
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
