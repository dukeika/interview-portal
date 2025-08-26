// src/services/userApprovalService.ts
import { GraphQLResult } from "@aws-amplify/api-graphql";
import { generateClient } from "aws-amplify/api";
import { updateUser, createUser } from "@/graphql/mutations";
import { listUsers } from "@/graphql/queries";
import { User, UserRole } from "@/API";

const client = generateClient();

export interface PendingUserApproval {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  role: UserRole;
  companyId?: string;
  companyName?: string;
  companyEmail?: string;
  companyWebsite?: string;
  registeredAt: string;
  verificationStatus: "PENDING" | "EMAIL_VERIFIED";
  approvalStatus: "PENDING" | "APPROVED" | "REJECTED";
  rejectionReason?: string;
  approvalNotes?: string;
  documents?: {
    businessLicense?: string;
    taxId?: string;
    incorporation?: string;
  };
}

export const userApprovalService = {
  /**
   * Get all pending user approvals
   */
  async getPendingUsers(): Promise<PendingUserApproval[]> {
    try {
      // In a real implementation, this would query a specific table or status field
      // For now, we'll simulate pending users
      const result = await client.graphql({
        query: listUsers,
        variables: {
          filter: {
            // This would filter for users with pending approval status
            // approvalStatus: { eq: "PENDING" }
          }
        }
      }) as GraphQLResult<{ listUsers: { items: User[] } }>;

      if (result.errors) {
        throw new Error(`GraphQL errors: ${result.errors.map(e => e.message).join(', ')}`);
      }

      // Transform User objects to PendingUserApproval format
      return result.data?.listUsers.items.map(user => ({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phone: user.phone || undefined,
        role: user.role,
        companyId: user.companyId || undefined,
        registeredAt: user.createdAt,
        verificationStatus: user.isActive ? "EMAIL_VERIFIED" : "PENDING",
        approvalStatus: "PENDING",
        // These would come from extended user profile data
        companyName: undefined,
        companyEmail: undefined,
        companyWebsite: undefined,
        documents: undefined
      })) || [];
    } catch (error) {
      console.error("Error fetching pending users:", error);
      throw error;
    }
  },

  /**
   * Approve a user registration
   */
  async approveUser(userId: string, notes?: string): Promise<void> {
    try {
      const result = await client.graphql({
        query: updateUser,
        variables: {
          input: {
            id: userId,
            isActive: true,
            // In a real implementation, you'd also update approval fields
            // approvalStatus: "APPROVED",
            // approvalNotes: notes,
            // approvedAt: new Date().toISOString(),
            // approvedBy: currentAdminId
          }
        }
      }) as GraphQLResult<{ updateUser: User }>;

      if (result.errors) {
        throw new Error(`Failed to approve user: ${result.errors.map(e => e.message).join(', ')}`);
      }

      // Send approval notification email (would integrate with SES)
      await this.sendApprovalNotification(userId, "approved", notes);
      
      console.log(`User ${userId} approved successfully${notes ? ` with notes: ${notes}` : ''}`);
    } catch (error) {
      console.error("Error approving user:", error);
      throw error;
    }
  },

  /**
   * Reject a user registration
   */
  async rejectUser(userId: string, reason: string): Promise<void> {
    try {
      const result = await client.graphql({
        query: updateUser,
        variables: {
          input: {
            id: userId,
            isActive: false,
            // In a real implementation, you'd update rejection fields
            // approvalStatus: "REJECTED",
            // rejectionReason: reason,
            // rejectedAt: new Date().toISOString(),
            // rejectedBy: currentAdminId
          }
        }
      }) as GraphQLResult<{ updateUser: User }>;

      if (result.errors) {
        throw new Error(`Failed to reject user: ${result.errors.map(e => e.message).join(', ')}`);
      }

      // Send rejection notification email
      await this.sendApprovalNotification(userId, "rejected", undefined, reason);
      
      console.log(`User ${userId} rejected with reason: ${reason}`);
    } catch (error) {
      console.error("Error rejecting user:", error);
      throw error;
    }
  },

  /**
   * Send notification email to user about approval/rejection
   */
  async sendApprovalNotification(
    userId: string, 
    status: "approved" | "rejected", 
    notes?: string, 
    rejectionReason?: string
  ): Promise<void> {
    try {
      // This would integrate with AWS SES or another email service
      // For now, we'll just log the notification
      
      if (status === "approved") {
        console.log(`Sending approval notification to user ${userId}`);
        // Email template would include:
        // - Welcome to the platform
        // - Next steps for setting up their account
        // - Contact information for support
        if (notes) {
          console.log(`Approval notes: ${notes}`);
        }
      } else {
        console.log(`Sending rejection notification to user ${userId}`);
        console.log(`Rejection reason: ${rejectionReason}`);
        // Email template would include:
        // - Polite explanation of rejection
        // - Specific reasons for rejection
        // - Instructions for addressing issues and reapplying
        // - Contact information for support
      }
    } catch (error) {
      console.error("Error sending approval notification:", error);
      // Don't throw here as the approval/rejection was successful
      // Just log the email failure
    }
  },

  /**
   * Bulk approve multiple users
   */
  async bulkApproveUsers(userIds: string[], notes?: string): Promise<{ successful: string[], failed: string[] }> {
    const successful: string[] = [];
    const failed: string[] = [];

    for (const userId of userIds) {
      try {
        await this.approveUser(userId, notes);
        successful.push(userId);
      } catch (error) {
        console.error(`Failed to approve user ${userId}:`, error);
        failed.push(userId);
      }
    }

    return { successful, failed };
  },

  /**
   * Get user approval statistics
   */
  async getApprovalStats(): Promise<{
    totalPending: number;
    totalApproved: number;
    totalRejected: number;
    pendingCompanyAdmins: number;
    pendingCandidates: number;
    emailVerified: number;
    emailPending: number;
  }> {
    try {
      const pendingUsers = await this.getPendingUsers();
      
      return {
        totalPending: pendingUsers.length,
        totalApproved: 0, // Would query from approved users
        totalRejected: 0, // Would query from rejected users
        pendingCompanyAdmins: pendingUsers.filter(u => u.role === UserRole.COMPANY_ADMIN).length,
        pendingCandidates: pendingUsers.filter(u => u.role === UserRole.CANDIDATE).length,
        emailVerified: pendingUsers.filter(u => u.verificationStatus === "EMAIL_VERIFIED").length,
        emailPending: pendingUsers.filter(u => u.verificationStatus === "PENDING").length
      };
    } catch (error) {
      console.error("Error fetching approval stats:", error);
      throw error;
    }
  }
};