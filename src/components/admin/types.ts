// src/components/admin/types.ts

export interface Company {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  website?: string;
  logo?: string;
  description?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  adminCount: number;
  jobCount: number;
  applicationCount: number;
}

export interface CompanyAdmin {
  id: string;
  cognitoId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  isActive: boolean;
  companyId: string;
  companyName: string;
  createdAt: string;
  lastLoginAt?: string;
}

export interface PlatformStats {
  totalCompanies: number;
  activeCompanies: number;
  totalUsers: number;
  totalApplications: number;
  totalJobs: number;
  recentSignups: number;
}

export interface ActivityLog {
  id: string;
  type:
    | "company_created"
    | "user_created"
    | "company_activated"
    | "company_deactivated"
    | "admin_login";
  description: string;
  userId?: string;
  companyId?: string;
  timestamp: string;
  metadata?: Record<string, any>;
}

export interface PendingUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: "COMPANY_ADMIN" | "CANDIDATE";
  companyName?: string;
  companyEmail?: string;
  companyWebsite?: string;
  registeredAt: string;
  verificationStatus: "PENDING" | "EMAIL_VERIFIED";
  documents?: {
    businessLicense?: string;
    taxId?: string;
    incorporation?: string;
  };
}

export type AdminTabType =
  | "overview"
  | "companies"
  | "users"
  | "pending"
  | "reports"
  | "analytics"
  | "notifications"
  | "settings";
