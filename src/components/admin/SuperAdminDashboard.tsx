//src/components/admin/SuperAdminDashboard.tsx
"use client";

import { useState } from "react";
import { useAdminDataReal } from "@/hooks/useAdminDataReal";
import { usePendingUsers } from "@/hooks/usePendingUsers";
import AdminDashboardHeader from "@/components/admin/AdminDashboardHeader";
import AdminDashboardNavigation from "@/components/admin/AdminDashboardNavigation";
import AdminOverviewTab from "@/components/admin/AdminOverviewTab";
import AdminCompaniesTab from "@/components/admin/AdminCompaniesTab";
import AdminUsersTab from "@/components/admin/AdminUsersTab";
import PendingUsersTab from "@/components/admin/PendingUsersTab";
import PlatformReportsTab from "@/components/admin/PlatformReportsTab";
import AnalyticsTab from "@/components/admin/AnalyticsTab";
import NotificationsSettingsTab from "@/components/admin/NotificationsSettingsTab";
import SettingsTab from "@/components/admin/SettingsTab";
import { AdminTabType } from "@/components/admin/types";

export default function SuperAdminDashboard() {
  const [activeTab, setActiveTab] = useState<AdminTabType>("overview");
  
  const handleTabChange = (tab: AdminTabType) => {
    console.log(`🔄 handleTabChange called - Switching from ${activeTab} to ${tab}`);
    setActiveTab(tab);
    console.log(`✅ Tab state updated to: ${tab}`);
  };
  const { companies, companyAdmins, platformStats, recentActivity, loading, refreshData } =
    useAdminDataReal();
  
  const { 
    pendingUsers, 
    loading: pendingUsersLoading, 
    error: pendingUsersError,
    approvalStats,
    refreshPendingUsers,
    approveUser,
    rejectUser,
    bulkApproveUsers
  } = usePendingUsers();

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
            onNavigateToTab={setActiveTab}
          />
        );
      case "companies":
        return <AdminCompaniesTab companies={companies} onRefresh={refreshData} />;
      case "users":
        return (
          <AdminUsersTab 
            companyAdmins={companyAdmins} 
            companies={companies}
            onRefresh={refreshData}
          />
        );
      case "pending":
        return (
          <PendingUsersTab 
            pendingUsers={pendingUsers.map(user => ({
              id: user.id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              phone: user.phone,
              role: user.role,
              companyName: user.companyName,
              companyEmail: user.companyEmail,
              companyWebsite: user.companyWebsite,
              registeredAt: user.registeredAt,
              verificationStatus: user.verificationStatus,
              documents: user.documents
            }))}
            onRefresh={refreshPendingUsers}
            loading={pendingUsersLoading}
            onApproveUser={approveUser}
            onRejectUser={rejectUser}
          />
        );
      case "reports":
        return <PlatformReportsTab />;
      case "analytics":
        return <AnalyticsTab />;
      case "notifications":
        return <NotificationsSettingsTab />;
      case "settings":
        return <SettingsTab />;
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
      <AdminDashboardHeader onNavigateToTab={handleTabChange} />
      <AdminDashboardNavigation
        activeTab={activeTab}
        setActiveTab={handleTabChange}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderActiveTab()}
      </div>
    </div>
  );
}
