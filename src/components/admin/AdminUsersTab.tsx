// src/components/admin/AdminUsersTab.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Edit,
  Eye,
  Shield,
  CheckCircle,
  XCircle,
  Clock,
  Mail,
  Phone,
} from "lucide-react";
import { CompanyAdmin } from "./types";

interface AdminUsersTabProps {
  companyAdmins: CompanyAdmin[];
  companies: any[];
}

export default function AdminUsersTab({
  companyAdmins,
  companies,
}: AdminUsersTabProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | "active" | "inactive"
  >("all");
  const [companyFilter, setCompanyFilter] = useState<string>("all");

  const filteredAdmins = companyAdmins.filter((admin) => {
    const matchesSearch =
      admin.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      admin.companyName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" ||
      (statusFilter === "active" && admin.isActive) ||
      (statusFilter === "inactive" && !admin.isActive);
    const matchesCompany =
      companyFilter === "all" || admin.companyId === companyFilter;
    return matchesSearch && matchesStatus && matchesCompany;
  });

  const getStatusBadge = (isActive: boolean) => {
    if (isActive) {
      return (
        <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          Active
        </span>
      );
    } else {
      return (
        <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
          <XCircle className="w-3 h-3 mr-1" />
          Inactive
        </span>
      );
    }
  };

  const getLastLoginDisplay = (lastLoginAt?: string) => {
    if (!lastLoginAt) {
      return (
        <span className="inline-flex items-center text-xs text-gray-500">
          <Clock className="w-3 h-3 mr-1" />
          Never
        </span>
      );
    }

    const lastLogin = new Date(lastLoginAt);
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - lastLogin.getTime()) / (1000 * 60 * 60)
    );

    let timeAgo;
    if (diffInHours < 1) timeAgo = "Just now";
    else if (diffInHours < 24) timeAgo = `${diffInHours}h ago`;
    else if (diffInHours < 48) timeAgo = "Yesterday";
    else timeAgo = lastLogin.toLocaleDateString();

    return (
      <span className="inline-flex items-center text-xs text-gray-500">
        <Clock className="w-3 h-3 mr-1" />
        {timeAgo}
      </span>
    );
  };

  const handleToggleStatus = (adminId: string, currentStatus: boolean) => {
    // TODO: Implement status toggle
    console.log(
      `Toggle admin ${adminId} from ${currentStatus} to ${!currentStatus}`
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Users Management</h2>
          <p className="text-gray-600">
            Manage company administrators and their permissions
          </p>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create Admin
        </Button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow border p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <select
              value={companyFilter}
              onChange={(e) => setCompanyFilter(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Companies</option>
              {companies.map((company) => (
                <option key={company.id} value={company.id}>
                  {company.name}
                </option>
              ))}
            </select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Last Login
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAdmins.map((admin) => (
                <tr key={admin.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <Shield className="h-5 w-5 text-gray-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {admin.firstName} {admin.lastName}
                        </div>
                        <div className="text-sm text-gray-500">
                          {admin.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {admin.companyName}
                    </div>
                    <div className="text-sm text-gray-500">Company Admin</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex flex-col space-y-1">
                      <div className="flex items-center text-sm text-gray-500">
                        <Mail className="h-3 w-3 mr-1" />
                        {admin.email}
                      </div>
                      {admin.phone && (
                        <div className="flex items-center text-sm text-gray-500">
                          <Phone className="h-3 w-3 mr-1" />
                          {admin.phone}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getStatusBadge(admin.isActive)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getLastLoginDisplay(admin.lastLoginAt)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(admin.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center space-x-2">
                      <Button variant="ghost" size="sm" title="View Details">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" title="Edit User">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() =>
                          handleToggleStatus(admin.id, admin.isActive)
                        }
                        title={admin.isActive ? "Deactivate" : "Activate"}
                      >
                        {admin.isActive ? (
                          <XCircle className="h-4 w-4 text-red-600" />
                        ) : (
                          <CheckCircle className="h-4 w-4 text-green-600" />
                        )}
                      </Button>
                      <Button variant="ghost" size="sm">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredAdmins.length === 0 && (
          <div className="text-center py-12">
            <Shield className="mx-auto h-12 w-12 text-gray-400" />
            <h3 className="mt-2 text-sm font-medium text-gray-900">
              No users found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {searchTerm || statusFilter !== "all" || companyFilter !== "all"
                ? "Try adjusting your search or filter criteria."
                : "Get started by creating your first company admin."}
            </p>
            {!searchTerm &&
              statusFilter === "all" &&
              companyFilter === "all" && (
                <div className="mt-6">
                  <Button>
                    <Plus className="mr-2 h-4 w-4" />
                    Create Admin
                  </Button>
                </div>
              )}
          </div>
        )}
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow border p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Shield className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Admins</p>
              <p className="text-2xl font-bold text-gray-900">
                {companyAdmins.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow border p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Active Admins</p>
              <p className="text-2xl font-bold text-gray-900">
                {companyAdmins.filter((a) => a.isActive).length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow border p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Recent Logins</p>
              <p className="text-2xl font-bold text-gray-900">
                {
                  companyAdmins.filter(
                    (a) =>
                      a.lastLoginAt &&
                      new Date(a.lastLoginAt) >
                        new Date(Date.now() - 24 * 60 * 60 * 1000)
                  ).length
                }
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow border p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Plus className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">
                New This Month
              </p>
              <p className="text-2xl font-bold text-gray-900">
                {
                  companyAdmins.filter(
                    (a) =>
                      new Date(a.createdAt) >
                      new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                  ).length
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
