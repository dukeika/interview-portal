// src/hooks/usePendingUsers.ts
import { useState, useEffect } from "react";
import { userApprovalService, PendingUserApproval } from "@/services/userApprovalService";

interface UsePendingUsersReturn {
  pendingUsers: PendingUserApproval[];
  loading: boolean;
  error: string | null;
  approvalStats: {
    totalPending: number;
    totalApproved: number;
    totalRejected: number;
    pendingCompanyAdmins: number;
    pendingCandidates: number;
    emailVerified: number;
    emailPending: number;
  };
  refreshPendingUsers: () => Promise<void>;
  approveUser: (userId: string, notes?: string) => Promise<void>;
  rejectUser: (userId: string, reason: string) => Promise<void>;
  bulkApproveUsers: (userIds: string[], notes?: string) => Promise<{ successful: string[], failed: string[] }>;
}

export function usePendingUsers(): UsePendingUsersReturn {
  const [pendingUsers, setPendingUsers] = useState<PendingUserApproval[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [approvalStats, setApprovalStats] = useState({
    totalPending: 0,
    totalApproved: 0,
    totalRejected: 0,
    pendingCompanyAdmins: 0,
    pendingCandidates: 0,
    emailVerified: 0,
    emailPending: 0
  });

  const fetchPendingUsers = async () => {
    try {
      setError(null);
      const users = await userApprovalService.getPendingUsers();
      setPendingUsers(users);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to fetch pending users";
      setError(errorMessage);
      console.error("Error fetching pending users:", err);
    }
  };

  const fetchApprovalStats = async () => {
    try {
      const stats = await userApprovalService.getApprovalStats();
      setApprovalStats(stats);
    } catch (err) {
      console.error("Error fetching approval stats:", err);
    }
  };

  const refreshPendingUsers = async () => {
    setLoading(true);
    await Promise.all([fetchPendingUsers(), fetchApprovalStats()]);
    setLoading(false);
  };

  const approveUser = async (userId: string, notes?: string) => {
    try {
      await userApprovalService.approveUser(userId, notes);
      // Remove the approved user from the pending list
      setPendingUsers(prev => prev.filter(user => user.id !== userId));
      // Update stats
      await fetchApprovalStats();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to approve user";
      setError(errorMessage);
      throw err;
    }
  };

  const rejectUser = async (userId: string, reason: string) => {
    try {
      await userApprovalService.rejectUser(userId, reason);
      // Remove the rejected user from the pending list
      setPendingUsers(prev => prev.filter(user => user.id !== userId));
      // Update stats
      await fetchApprovalStats();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to reject user";
      setError(errorMessage);
      throw err;
    }
  };

  const bulkApproveUsers = async (userIds: string[], notes?: string) => {
    try {
      const result = await userApprovalService.bulkApproveUsers(userIds, notes);
      
      // Remove successfully approved users from the pending list
      if (result.successful.length > 0) {
        setPendingUsers(prev => prev.filter(user => !result.successful.includes(user.id)));
        await fetchApprovalStats();
      }
      
      if (result.failed.length > 0) {
        setError(`Failed to approve ${result.failed.length} users`);
      }
      
      return result;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to bulk approve users";
      setError(errorMessage);
      throw err;
    }
  };

  // Initial load
  useEffect(() => {
    refreshPendingUsers();
  }, []);

  return {
    pendingUsers,
    loading,
    error,
    approvalStats,
    refreshPendingUsers,
    approveUser,
    rejectUser,
    bulkApproveUsers
  };
}