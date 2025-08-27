// src/hooks/useAdminDataReal.ts
import { useState, useEffect } from "react";
import { generateClient } from "aws-amplify/api";
import { useAuth } from "@/contexts/AuthContext";
import { listCompanies, listUsers, listJobs, listApplications } from "@/graphql/queries";
import { UserRole, ApprovalStatus } from "@/API";
import {
  Company,
  CompanyAdmin,
  PlatformStats,
  ActivityLog,
} from "@/components/admin/types";

const client = generateClient();

export function useAdminDataReal() {
  const { user, userRole } = useAuth();
  const handleError = (message: string, error: any) => {
    console.error(message, error);
    // You can implement more sophisticated error handling here
  };
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

  const fetchCompanies = async () => {
    try {
      const response = await client.graphql({
        query: listCompanies,
        variables: {
          limit: 1000,
        },
      });

      const companiesData = response.data.listCompanies.items;
      
      // Transform GraphQL data to component format
      const transformedCompanies: Company[] = companiesData.map((company: any) => ({
        id: company.id,
        name: company.name,
        email: company.email,
        phone: company.phone || '',
        address: company.address || '',
        website: company.website || '',
        logo: company.logo || '',
        description: company.description || '',
        isActive: company.isActive,
        createdAt: company.createdAt,
        updatedAt: company.updatedAt,
        adminCount: company.admins?.items?.length || 0,
        jobCount: company.jobs?.items?.length || 0,
        applicationCount: 0, // Will be calculated separately
      }));

      setCompanies(transformedCompanies);
      return transformedCompanies;
    } catch (error) {
      handleError('Failed to fetch companies', error);
      return [];
    }
  };

  const fetchCompanyAdmins = async () => {
    try {
      const response = await client.graphql({
        query: listUsers,
        variables: {
          filter: {
            role: { eq: UserRole.COMPANY_ADMIN },
            approvalStatus: { eq: ApprovalStatus.APPROVED },
          },
          limit: 1000,
        },
      });

      const adminsData = response.data.listUsers.items;
      
      // Transform GraphQL data to component format
      const transformedAdmins: CompanyAdmin[] = adminsData.map((admin: any) => ({
        id: admin.id,
        cognitoId: admin.sub,
        email: admin.email,
        firstName: admin.firstName,
        lastName: admin.lastName,
        phone: admin.phone || '',
        isActive: admin.isActive,
        companyId: admin.companyId || '',
        companyName: admin.company?.name || '',
        createdAt: admin.createdAt,
        lastLoginAt: admin.lastLoginAt || null,
      }));

      setCompanyAdmins(transformedAdmins);
      return transformedAdmins;
    } catch (error) {
      handleError('Failed to fetch company admins', error);
      return [];
    }
  };

  const fetchPlatformStats = async (companiesData: Company[], adminsData: CompanyAdmin[]) => {
    try {
      // Get job counts
      const jobsResponse = await client.graphql({
        query: listJobs,
        variables: { limit: 1000 },
      });
      const totalJobs = jobsResponse.data.listJobs.items.length;

      // Get application counts
      const applicationsResponse = await client.graphql({
        query: listApplications,
        variables: { limit: 1000 },
      });
      const totalApplications = applicationsResponse.data.listApplications.items.length;

      // Get all users for total count
      const allUsersResponse = await client.graphql({
        query: listUsers,
        variables: { limit: 1000 },
      });
      const totalUsers = allUsersResponse.data.listUsers.items.length;

      // Calculate recent signups (last 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      const recentSignups = allUsersResponse.data.listUsers.items.filter((user: any) => 
        new Date(user.createdAt) >= thirtyDaysAgo
      ).length;

      const stats: PlatformStats = {
        totalCompanies: companiesData.length,
        activeCompanies: companiesData.filter(c => c.isActive).length,
        totalUsers,
        totalApplications,
        totalJobs,
        recentSignups,
      };

      setPlatformStats(stats);
    } catch (error) {
      handleError('Failed to fetch platform statistics', error);
    }
  };

  const generateRecentActivity = (companiesData: Company[], adminsData: CompanyAdmin[]): ActivityLog[] => {
    const activities: ActivityLog[] = [];

    // Recent company creations
    companiesData
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 3)
      .forEach((company, index) => {
        activities.push({
          id: `company_${company.id}`,
          type: "company_created",
          description: `New company "${company.name}" registered`,
          companyId: company.id,
          timestamp: company.createdAt,
          metadata: { companyName: company.name },
        });
      });

    // Recent admin creations
    adminsData
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 2)
      .forEach((admin) => {
        activities.push({
          id: `admin_${admin.id}`,
          type: "user_created",
          description: `Company admin created for ${admin.companyName}`,
          userId: admin.id,
          companyId: admin.companyId,
          timestamp: admin.createdAt,
          metadata: { adminEmail: admin.email },
        });
      });

    // Sort by timestamp (most recent first)
    return activities
      .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
      .slice(0, 8);
  };

  const loadAdminData = async () => {
    if (userRole !== 'super_admin') {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // Fetch all data in parallel
      const [companiesData, adminsData] = await Promise.all([
        fetchCompanies(),
        fetchCompanyAdmins(),
      ]);

      // Calculate stats based on fetched data
      await fetchPlatformStats(companiesData, adminsData);

      // Generate activity log from real data
      const activityData = generateRecentActivity(companiesData, adminsData);
      setRecentActivity(activityData);

    } catch (error) {
      handleError('Failed to load admin data', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (user && userRole === 'super_admin') {
      loadAdminData();
    }
  }, [user, userRole]);

  // Public refresh function
  const refreshData = () => {
    loadAdminData();
  };

  return {
    companies,
    companyAdmins,
    platformStats,
    recentActivity,
    loading,
    refreshData,
  };
}