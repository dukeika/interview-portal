// src/hooks/useAdminData.ts
import { useState, useEffect } from "react";
import {
  Company,
  CompanyAdmin,
  PlatformStats,
  ActivityLog,
} from "@/components/admin/types";

export function useAdminData() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [companyAdmins, setCompanyAdmins] = useState<CompanyAdmin[]>([]);
  const [platformStats, setPlatformStats] = useState<PlatformStats>({
    totalCompanies: 0,
    activeCompanies: 0,
    totalUsers: 0,
    totalApplications: 0,
    totalJobs: 0,
    recentSignups: 0,
  });
  const [recentActivity, setRecentActivity] = useState<ActivityLog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAdminData = async () => {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const mockCompanies: Company[] = [
        {
          id: "1",
          name: "TechCorp Inc.",
          email: "admin@techcorp.com",
          phone: "+1 (555) 123-4567",
          address: "123 Tech Street, San Francisco, CA 94105",
          website: "https://techcorp.com",
          description: "Leading technology solutions provider",
          isActive: true,
          createdAt: "2024-01-15T10:00:00Z",
          updatedAt: "2024-08-01T14:30:00Z",
          adminCount: 3,
          jobCount: 8,
          applicationCount: 156,
        },
        {
          id: "2",
          name: "StartupXYZ",
          email: "hr@startupxyz.com",
          phone: "+1 (555) 987-6543",
          address: "456 Innovation Ave, Austin, TX 78701",
          website: "https://startupxyz.com",
          description: "Innovative startup disrupting the market",
          isActive: true,
          createdAt: "2024-02-20T09:15:00Z",
          updatedAt: "2024-07-28T16:45:00Z",
          adminCount: 2,
          jobCount: 5,
          applicationCount: 89,
        },
        {
          id: "3",
          name: "MegaCorp Solutions",
          email: "contact@megacorp.com",
          phone: "+1 (555) 456-7890",
          address: "789 Business Blvd, New York, NY 10001",
          website: "https://megacorp.com",
          description: "Global enterprise solutions company",
          isActive: true,
          createdAt: "2024-03-10T11:30:00Z",
          updatedAt: "2024-08-15T10:20:00Z",
          adminCount: 5,
          jobCount: 12,
          applicationCount: 234,
        },
        {
          id: "4",
          name: "InnovateLab",
          email: "team@innovatelab.com",
          phone: "+1 (555) 321-0987",
          address: "321 Creative St, Seattle, WA 98101",
          website: "https://innovatelab.com",
          description: "R&D focused innovation laboratory",
          isActive: false,
          createdAt: "2024-04-05T13:45:00Z",
          updatedAt: "2024-07-15T09:10:00Z",
          adminCount: 1,
          jobCount: 2,
          applicationCount: 23,
        },
        {
          id: "5",
          name: "FinanceFirst",
          email: "hr@financefirst.com",
          phone: "+1 (555) 654-3210",
          address: "654 Money Lane, Chicago, IL 60601",
          website: "https://financefirst.com",
          description: "Premier financial services provider",
          isActive: true,
          createdAt: "2024-05-12T08:20:00Z",
          updatedAt: "2024-08-10T15:55:00Z",
          adminCount: 4,
          jobCount: 7,
          applicationCount: 167,
        },
      ];

      const mockCompanyAdmins: CompanyAdmin[] = [
        {
          id: "1",
          cognitoId: "user-1",
          email: "john.doe@techcorp.com",
          firstName: "John",
          lastName: "Doe",
          phone: "+1 (555) 123-4567",
          isActive: true,
          companyId: "1",
          companyName: "TechCorp Inc.",
          createdAt: "2024-01-15T10:00:00Z",
          lastLoginAt: "2024-08-20T09:30:00Z",
        },
        {
          id: "2",
          cognitoId: "user-2",
          email: "sarah.smith@techcorp.com",
          firstName: "Sarah",
          lastName: "Smith",
          phone: "+1 (555) 123-4568",
          isActive: true,
          companyId: "1",
          companyName: "TechCorp Inc.",
          createdAt: "2024-02-01T14:20:00Z",
          lastLoginAt: "2024-08-19T16:45:00Z",
        },
        {
          id: "3",
          cognitoId: "user-3",
          email: "mike.johnson@startupxyz.com",
          firstName: "Mike",
          lastName: "Johnson",
          phone: "+1 (555) 987-6543",
          isActive: true,
          companyId: "2",
          companyName: "StartupXYZ",
          createdAt: "2024-02-20T09:15:00Z",
          lastLoginAt: "2024-08-18T11:20:00Z",
        },
        {
          id: "4",
          cognitoId: "user-4",
          email: "lisa.wilson@megacorp.com",
          firstName: "Lisa",
          lastName: "Wilson",
          phone: "+1 (555) 456-7891",
          isActive: true,
          companyId: "3",
          companyName: "MegaCorp Solutions",
          createdAt: "2024-03-10T11:30:00Z",
          lastLoginAt: "2024-08-20T08:15:00Z",
        },
        {
          id: "5",
          cognitoId: "user-5",
          email: "david.brown@financefirst.com",
          firstName: "David",
          lastName: "Brown",
          phone: "+1 (555) 654-3211",
          isActive: true,
          companyId: "5",
          companyName: "FinanceFirst",
          createdAt: "2024-05-12T08:20:00Z",
          lastLoginAt: "2024-08-17T13:40:00Z",
        },
      ];

      const mockActivity: ActivityLog[] = [
        {
          id: "1",
          type: "company_created",
          description: 'New company "DataTech Solutions" registered',
          companyId: "6",
          timestamp: "2024-08-20T10:30:00Z",
          metadata: { companyName: "DataTech Solutions" },
        },
        {
          id: "2",
          type: "user_created",
          description: "Company admin created for TechCorp Inc.",
          userId: "6",
          companyId: "1",
          timestamp: "2024-08-20T09:15:00Z",
          metadata: { adminEmail: "new.admin@techcorp.com" },
        },
        {
          id: "3",
          type: "company_activated",
          description: "InnovateLab company status changed to active",
          companyId: "4",
          timestamp: "2024-08-19T16:45:00Z",
        },
        {
          id: "4",
          type: "admin_login",
          description: "Super admin logged into platform",
          userId: "super-1",
          timestamp: "2024-08-19T14:20:00Z",
        },
        {
          id: "5",
          type: "company_created",
          description: 'New company "GreenTech Energy" registered',
          companyId: "7",
          timestamp: "2024-08-19T11:10:00Z",
          metadata: { companyName: "GreenTech Energy" },
        },
        {
          id: "6",
          type: "user_created",
          description: "Company admin created for StartupXYZ",
          userId: "7",
          companyId: "2",
          timestamp: "2024-08-18T15:30:00Z",
          metadata: { adminEmail: "lead@startupxyz.com" },
        },
        {
          id: "7",
          type: "company_deactivated",
          description: "TempCorp company status changed to inactive",
          companyId: "8",
          timestamp: "2024-08-18T13:25:00Z",
        },
        {
          id: "8",
          type: "admin_login",
          description: "Super admin accessed analytics dashboard",
          userId: "super-1",
          timestamp: "2024-08-18T10:45:00Z",
        },
      ];

      const stats: PlatformStats = {
        totalCompanies: mockCompanies.length,
        activeCompanies: mockCompanies.filter((c) => c.isActive).length,
        totalUsers: mockCompanyAdmins.length + 156, // Company admins + candidates
        totalApplications: mockCompanies.reduce(
          (sum, c) => sum + c.applicationCount,
          0
        ),
        totalJobs: mockCompanies.reduce((sum, c) => sum + c.jobCount, 0),
        recentSignups: 24,
      };

      setCompanies(mockCompanies);
      setCompanyAdmins(mockCompanyAdmins);
      setPlatformStats(stats);
      setRecentActivity(mockActivity);
      setLoading(false);
    };

    loadAdminData();
  }, []);

  return {
    companies,
    companyAdmins,
    platformStats,
    recentActivity,
    loading,
  };
}
