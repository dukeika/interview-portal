// src/components/admin/UserApprovalModal.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  XCircle,
  User,
  Building,
  Mail,
  Phone,
  Calendar,
  AlertCircle,
  FileText,
  X,
} from "lucide-react";
import { PendingUser } from "./types";

interface UserApprovalModalProps {
  user: PendingUser;
  isOpen: boolean;
  onClose: () => void;
  onApprove: (userId: string, notes?: string) => void;
  onReject: (userId: string, reason: string) => void;
}

export default function UserApprovalModal({
  user,
  isOpen,
  onClose,
  onApprove,
  onReject,
}: UserApprovalModalProps) {
  const [action, setAction] = useState<"approve" | "reject" | null>(null);
  const [notes, setNotes] = useState("");
  const [rejectionReason, setRejectionReason] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleApprove = async () => {
    setLoading(true);
    try {
      await onApprove(user.id, notes || undefined);
      onClose();
    } catch (error) {
      console.error("Error approving user:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      alert("Please provide a rejection reason");
      return;
    }
    setLoading(true);
    try {
      await onReject(user.id, rejectionReason);
      onClose();
    } catch (error) {
      console.error("Error rejecting user:", error);
    } finally {
      setLoading(false);
    }
  };

  const getVerificationBadge = () => {
    if (user.verificationStatus === "EMAIL_VERIFIED") {
      return (
        <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          Email Verified
        </span>
      );
    }
    return (
      <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">
        <AlertCircle className="w-3 h-3 mr-1" />
        Email Pending
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
          onClick={onClose}
        />
        
        {/* Modal */}
        <div className="relative bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">
              User Approval Required
            </h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">
            {/* User Information */}
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                <User className="w-5 h-5 mr-2" />
                User Details
              </h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-700">Name:</span>
                  <p className="text-gray-900">{user.firstName} {user.lastName}</p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Role:</span>
                  <p className="text-gray-900">
                    {user.role === "COMPANY_ADMIN" ? "Company Administrator" : "Candidate"}
                  </p>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Email:</span>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">{user.email}</p>
                  </div>
                </div>
                {user.phone && (
                  <div>
                    <span className="font-medium text-gray-700">Phone:</span>
                    <div className="flex items-center space-x-2">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <p className="text-gray-900">{user.phone}</p>
                    </div>
                  </div>
                )}
                <div>
                  <span className="font-medium text-gray-700">Registered:</span>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <p className="text-gray-900">
                      {new Date(user.registeredAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div>
                  <span className="font-medium text-gray-700">Verification:</span>
                  <div className="mt-1">
                    {getVerificationBadge()}
                  </div>
                </div>
              </div>
            </div>

            {/* Company Information (if company admin) */}
            {user.role === "COMPANY_ADMIN" && (
              <div className="bg-blue-50 rounded-lg p-4">
                <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                  <Building className="w-5 h-5 mr-2" />
                  Company Details
                </h4>
                <div className="grid grid-cols-1 gap-3 text-sm">
                  {user.companyName && (
                    <div>
                      <span className="font-medium text-gray-700">Company Name:</span>
                      <p className="text-gray-900">{user.companyName}</p>
                    </div>
                  )}
                  {user.companyEmail && (
                    <div>
                      <span className="font-medium text-gray-700">Company Email:</span>
                      <p className="text-gray-900">{user.companyEmail}</p>
                    </div>
                  )}
                  {user.companyWebsite && (
                    <div>
                      <span className="font-medium text-gray-700">Website:</span>
                      <p className="text-gray-900">{user.companyWebsite}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Documents (if available) */}
            {user.documents && Object.keys(user.documents).length > 0 && (
              <div className="bg-purple-50 rounded-lg p-4">
                <h4 className="text-md font-medium text-gray-900 mb-3 flex items-center">
                  <FileText className="w-5 h-5 mr-2" />
                  Supporting Documents
                </h4>
                <div className="space-y-2 text-sm">
                  {user.documents.businessLicense && (
                    <div className="flex items-center justify-between">
                      <span>Business License</span>
                      <Button variant="outline" size="sm">
                        View Document
                      </Button>
                    </div>
                  )}
                  {user.documents.taxId && (
                    <div className="flex items-center justify-between">
                      <span>Tax ID</span>
                      <Button variant="outline" size="sm">
                        View Document
                      </Button>
                    </div>
                  )}
                  {user.documents.incorporation && (
                    <div className="flex items-center justify-between">
                      <span>Certificate of Incorporation</span>
                      <Button variant="outline" size="sm">
                        View Document
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Action Selection */}
            {!action && (
              <div className="flex space-x-4">
                <Button
                  onClick={() => setAction("approve")}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Approve User
                </Button>
                <Button
                  onClick={() => setAction("reject")}
                  variant="outline"
                  className="flex-1 border-red-300 text-red-700 hover:bg-red-50"
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  Reject User
                </Button>
              </div>
            )}

            {/* Approval Form */}
            {action === "approve" && (
              <div className="bg-green-50 rounded-lg p-4 space-y-4">
                <h4 className="text-md font-medium text-green-900">
                  Approve User Registration
                </h4>
                <div>
                  <label className="block text-sm font-medium text-green-700 mb-2">
                    Approval Notes (Optional)
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Add any notes about this approval..."
                    className="w-full px-3 py-2 border border-green-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                    rows={3}
                  />
                </div>
                <div className="flex space-x-3">
                  <Button
                    onClick={handleApprove}
                    disabled={loading}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    {loading ? "Processing..." : "Confirm Approval"}
                  </Button>
                  <Button
                    onClick={() => setAction(null)}
                    variant="outline"
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}

            {/* Rejection Form */}
            {action === "reject" && (
              <div className="bg-red-50 rounded-lg p-4 space-y-4">
                <h4 className="text-md font-medium text-red-900">
                  Reject User Registration
                </h4>
                <div>
                  <label className="block text-sm font-medium text-red-700 mb-2">
                    Rejection Reason *
                  </label>
                  <textarea
                    value={rejectionReason}
                    onChange={(e) => setRejectionReason(e.target.value)}
                    placeholder="Please provide a clear reason for rejection..."
                    className="w-full px-3 py-2 border border-red-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                    rows={3}
                    required
                  />
                </div>
                <div className="flex space-x-3">
                  <Button
                    onClick={handleReject}
                    disabled={loading || !rejectionReason.trim()}
                    variant="destructive"
                  >
                    {loading ? "Processing..." : "Confirm Rejection"}
                  </Button>
                  <Button
                    onClick={() => setAction(null)}
                    variant="outline"
                    disabled={loading}
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}