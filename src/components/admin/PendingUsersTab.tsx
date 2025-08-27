// src/components/admin/PendingUsersTab.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import UserApprovalModal from "./UserApprovalModal";
import {
  Search,
  Filter,
  Eye,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  User,
  Building,
  Mail,
  Calendar,
  RefreshCw,
} from "lucide-react";
import { PendingUser } from "./types";

interface PendingUsersTabProps {
  pendingUsers: PendingUser[];
  onRefresh: () => void;
  loading: boolean;
  onApproveUser?: (userId: string, notes?: string) => Promise<void>;
  onRejectUser?: (userId: string, reason: string) => Promise<void>;
}

export default function PendingUsersTab({
  pendingUsers,
  onRefresh,
  loading,
  onApproveUser,
  onRejectUser,
}: PendingUsersTabProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<"all" | "COMPANY_ADMIN" | "CANDIDATE">("all");
  const [verificationFilter, setVerificationFilter] = useState<"all" | "PENDING" | "EMAIL_VERIFIED">("all");
  const [selectedUser, setSelectedUser] = useState<PendingUser | null>(null);
  const [showApprovalModal, setShowApprovalModal] = useState(false);

  const filteredUsers = pendingUsers.filter((user) => {
    const matchesSearch =
      user.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false);
    
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesVerification = verificationFilter === "all" || user.verificationStatus === verificationFilter;
    
    return matchesSearch && matchesRole && matchesVerification;
  });

  const handleUserClick = (user: PendingUser) => {
    setSelectedUser(user);
    setShowApprovalModal(true);
  };

  const handleApproveUser = async (userId: string, notes?: string) => {
    try {
      if (onApproveUser) {
        await onApproveUser(userId, notes);
      } else {
        console.log("Approving user:", userId, "Notes:", notes);
        onRefresh();
      }
    } catch (error) {
      console.error("Error approving user:", error);
    }
  };

  const handleRejectUser = async (userId: string, reason: string) => {
    try {
      if (onRejectUser) {
        await onRejectUser(userId, reason);
      } else {
        console.log("Rejecting user:", userId, "Reason:", reason);
        onRefresh();
      }
    } catch (error) {
      console.error("Error rejecting user:", error);
    }
  };

  const getVerificationBadge = (status: string) => {
    if (status === "EMAIL_VERIFIED") {
      return (
        <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          Verified
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
        <Clock className="w-3 h-3 mr-1" />
        Pending
      </span>
    );
  };

  const getRoleBadge = (role: string) => {
    if (role === "COMPANY_ADMIN") {
      return (
        <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
          <Building className="w-3 h-3 mr-1" />
          Company Admin
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-purple-100 text-purple-800">
        <User className="w-3 h-3 mr-1" />
        Candidate
      </span>
    );
  };

  const getTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h ago`;
    if (diffInHours < 48) return "Yesterday";
    return date.toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Pending User Approvals</h2>
          <p className="text-gray-600">
            Review and approve new user registrations
          </p>
        </div>
        <Button onClick={onRefresh} disabled={loading}>
          <RefreshCw className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow border p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-orange-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Total Pending</p>
              <p className="text-2xl font-bold text-gray-900">
                {pendingUsers.length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow border p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Building className="h-8 w-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Company Admins</p>
              <p className="text-2xl font-bold text-gray-900">
                {pendingUsers.filter(u => u.role === "COMPANY_ADMIN").length}
              </p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow border p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <User className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-gray-500">Candidates</p>
              <p className="text-2xl font-bold text-gray-900">
                {pendingUsers.filter(u => u.role === "CANDIDATE").length}
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
              <p className="text-sm font-medium text-gray-500">Email Verified</p>
              <p className="text-2xl font-bold text-gray-900">
                {pendingUsers.filter(u => u.verificationStatus === "EMAIL_VERIFIED").length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg shadow border p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search pending users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Roles</option>
              <option value="COMPANY_ADMIN">Company Admins</option>
              <option value="CANDIDATE">Candidates</option>
            </select>
            <select
              value={verificationFilter}
              onChange={(e) => setVerificationFilter(e.target.value as any)}
              className="px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="all">All Verification</option>
              <option value="EMAIL_VERIFIED">Email Verified</option>
              <option value="PENDING">Email Pending</option>
            </select>
            <Button variant="outline">
              <Filter className="mr-2 h-4 w-4" />
              More Filters
            </Button>
          </div>
        </div>
      </div>

      {/* Pending Users Table */}
      <div className="bg-white rounded-lg shadow border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Role
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Verification
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Registered
                </th>
                <th className="relative px-6 py-3">
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredUsers.map((user) => (
                <tr 
                  key={user.id} 
                  className="hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleUserClick(user)}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-600" />
                        </div>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.firstName} {user.lastName}
                        </div>
                        <div className="text-sm text-gray-500 flex items-center">
                          <Mail className="h-3 w-3 mr-1" />
                          {user.email}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {user.companyName || "—"}
                    </div>
                    {user.companyEmail && (
                      <div className="text-sm text-gray-500">{user.companyEmail}</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {getVerificationBadge(user.verificationStatus)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-3 w-3 mr-1" />
                      {getTimeAgo(user.registeredAt)}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      title="Review Application"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleUserClick(user);
                      }}
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center py-12">
            {loading ? (
              <div className="flex flex-col items-center">
                <RefreshCw className="mx-auto h-12 w-12 text-gray-400 animate-spin" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  Loading pending users...
                </h3>
              </div>
            ) : (
              <>
                <Clock className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">
                  No pending users found
                </h3>
                <p className="mt-1 text-sm text-gray-500">
                  {searchTerm || roleFilter !== "all" || verificationFilter !== "all"
                    ? "Try adjusting your search or filter criteria."
                    : "All user registrations have been processed."}
                </p>
              </>
            )}
          </div>
        )}
      </div>

      {/* User Approval Modal */}
      {selectedUser && (
        <UserApprovalModal
          user={selectedUser}
          isOpen={showApprovalModal}
          onClose={() => {
            setShowApprovalModal(false);
            setSelectedUser(null);
          }}
          onApprove={handleApproveUser}
          onReject={handleRejectUser}
        />
      )}
    </div>
  );
}