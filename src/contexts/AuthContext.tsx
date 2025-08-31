"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { userService } from "@/services/userService";
import { UserRole, ApprovalStatus } from "@/API";

interface AuthContextType {
  user: any | null;
  userRole: "super_admin" | "company_admin" | "candidate" | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<any>;
  signUp: (email: string, password: string, attributes?: any) => Promise<any>;
  signOut: () => Promise<void>;
  confirmSignUp: (email: string, code: string) => Promise<any>;
  resendConfirmation: (email: string) => Promise<any>;
  setUserRole: (
    role: "super_admin" | "company_admin" | "candidate"
  ) => Promise<void>;
  amplifyReady: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<any | null>(null);
  const [userRole, setUserRoleState] = useState<
    "super_admin" | "company_admin" | "candidate" | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [amplifyReady, setAmplifyReady] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        // Initialize real Amplify authentication
        const amplifyConfig = await import("@/lib/amplify-config");
        const isRealAmplify = amplifyConfig.configureAmplify();
        setAmplifyReady(isRealAmplify);

        if (isRealAmplify) {
          await checkUser();
        } else {
          console.warn("Amplify configuration failed - check AWS configuration");
          setLoading(false);
        }
      } catch (error) {
        console.error("Failed to initialize authentication:", error);
        setAmplifyReady(false);
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  const checkUser = async () => {
    try {
      // Try to get current user with real Amplify
      const amplifyAuth = await import("aws-amplify/auth");
      const currentUser = await amplifyAuth.getCurrentUser();
      setUser(currentUser);

      console.log("✅ Current user found:", currentUser);

      // Try to get user role from Cognito groups first, then attributes, then database, then email pattern
      let role: "super_admin" | "company_admin" | "candidate" | null = null;
      let attributes: any = {};
      
      try {
        attributes = await amplifyAuth.fetchUserAttributes();
        console.log("📋 User attributes:", attributes);
        
        // Check Cognito groups first (most reliable)
        try {
          const session = await amplifyAuth.fetchAuthSession();
          const groups = (session as any)?.tokens?.accessToken?.payload?.["cognito:groups"] || [];
          console.log("🔍 User groups from JWT:", groups);
          
          if (groups.includes('SuperAdmins')) {
            role = 'super_admin';
          } else if (groups.includes('CompanyAdmins')) {
            role = 'company_admin';
          } else if (groups.includes('Candidates')) {
            role = 'candidate';
          }
        } catch (groupError) {
          console.log("ℹ️ Could not get groups from JWT, continuing with other methods");
        }
        
        // If no role from groups, check custom role attribute
        if (!role) {
          const roleAttribute = attributes["custom:role"];
          if (roleAttribute) {
            role = roleAttribute as "super_admin" | "company_admin" | "candidate";
          }
        }

        // If still no role, check database record
        if (!role) {
          try {
            const { userService } = await import('@/services/userService');
            const userRecord = await userService.getUserBySub(currentUser.userId || currentUser.username);
            
            if (userRecord?.role) {
              console.log("🔍 Role from database:", userRecord.role);
              switch (userRecord.role) {
                case 'SUPER_ADMIN':
                  role = 'super_admin';
                  break;
                case 'COMPANY_ADMIN':
                  role = 'company_admin';
                  break;
                case 'CANDIDATE':
                  role = 'candidate';
                  break;
              }
            }
          } catch (dbError) {
            console.log("ℹ️ Could not get role from database, continuing with email pattern");
          }
        }

        
      } catch (attrError) {
        console.log("⚠️ Could not fetch user attributes:", attrError);
      }

      // If no role from attributes, determine from email pattern
      if (!role && currentUser?.username) {
        // First try to get email from attributes, fallback to username
        const email = attributes.email || currentUser.username;
        
        if (email.includes("admin") && !email.includes("company")) {
          role = "super_admin";
        } else if (email.includes("company")) {
          role = "company_admin";
        } else {
          role = "candidate";
        }
        console.log(`🔍 Determined role from email pattern (${email}): ${role}`);
      }

      setUserRoleState(role);
      console.log(`👤 User role set to: ${role}`);

      // Ensure user record exists in our database
      await ensureUserRecord(currentUser, role);

      // Auto-redirect based on role if on home page or login page
      if (typeof window !== "undefined") {
        const currentPath = window.location.pathname;
        console.log(`🛣️ Current path: ${currentPath}, Role: ${role}`);
        
        if (currentPath === "/" || currentPath === "/login") {
          console.log(`🎯 Redirecting user with role ${role}`);
          await redirectByRole(role);
        }
      }
    } catch (error) {
      console.log("❌ No authenticated user found:", error);
      setUser(null);
      setUserRoleState(null);
    } finally {
      setLoading(false);
    }
  };

  const ensureUserRecord = async (cognitoUser: any, role: "super_admin" | "company_admin" | "candidate" | null) => {
    if (!cognitoUser?.userId || !role) return;

    try {
      // Check if user already exists in our database
      const existingUser = await userService.getUserBySub(cognitoUser.userId);
      
      if (!existingUser) {
        console.log("🔄 Creating user record in database...");
        
        // Get additional user details
        const amplifyAuth = await import("aws-amplify/auth");
        let attributes: any = {};
        try {
          attributes = await amplifyAuth.fetchUserAttributes();
        } catch (error) {
          console.warn("Could not fetch user attributes:", error);
        }

        // Create user record
        const newUser = await userService.createUser({
          sub: cognitoUser.userId,
          email: attributes.email || cognitoUser.username || '',
          firstName: attributes.given_name || 'User',
          lastName: attributes.family_name || 'Name',
          phone: attributes.phone_number,
          role: role === 'super_admin' ? UserRole.SUPER_ADMIN :
                role === 'company_admin' ? UserRole.COMPANY_ADMIN :
                UserRole.CANDIDATE,
          isActive: true,
          approvalStatus: ApprovalStatus.APPROVED // All users are now auto-approved
        });

        console.log("✅ User record created:", newUser);
      } else {
        console.log("✅ User record already exists in database");
      }
    } catch (error) {
      console.error("❌ Error ensuring user record:", error);
      // Don't throw - authentication can continue even if user record creation fails
    }
  };

  const redirectByRole = async (
    role: "super_admin" | "company_admin" | "candidate" | null
  ) => {
    console.log(`🚀 Redirecting based on role: ${role}`);
    
    switch (role) {
      case "super_admin":
        console.log("📍 Redirecting to admin dashboard");
        router.push("/admin/dashboard");
        break;
      case "company_admin":
        // Check if this is a first-time login (needs setup)
        try {
          const userRecord = await userService.getUserBySub(user.userId);
          const isFirstLogin = !userRecord?.lastLoginAt || userRecord.lastLoginAt === null;
          
          if (isFirstLogin) {
            console.log("📍 First-time company admin login - redirecting to setup");
            router.push("/company/setup");
          } else {
            console.log("📍 Redirecting to company dashboard");
            router.push("/company/dashboard");
          }
        } catch (error) {
          console.error("Error checking first login status:", error);
          // Fallback to dashboard
          console.log("📍 Redirecting to company dashboard (fallback)");
          router.push("/company/dashboard");
        }
        break;
      case "candidate":
        console.log("📍 Redirecting to candidate dashboard");
        router.push("/candidate/dashboard");
        break;
      default:
        console.log("📍 Redirecting to login");
        router.push("/login");
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    console.log("🔐 Attempting authentication for:", email);

    if (!amplifyReady) {
      throw new Error("Authentication service not available - check AWS configuration");
    }

    try {
      console.log("☁️ Attempting Cognito authentication");
      const amplifyAuth = await import('aws-amplify/auth');
      
      // Check if there's already a signed-in user and sign them out first
      try {
        const currentUser = await amplifyAuth.getCurrentUser();
        if (currentUser) {
          console.log("🔄 Signing out existing user before new authentication");
          await amplifyAuth.signOut();
        }
      } catch (err) {
        // No current user or already signed out, continue
        console.log("ℹ️ No existing user session found");
      }
      
      const result = await amplifyAuth.signIn({
        username: email,
        password,
      });

      console.log("✅ Cognito sign in successful:", result);
      
      // Refresh user state after sign in
      await checkUser();
      return result;
      
    } catch (error) {
      console.error('❌ Amplify sign in error:', error);
      throw error;
    }
  };

  const handleSignUp = async (
    email: string,
    password: string,
    attributes = {}
  ) => {
    console.log("🔐 Attempting user registration for:", email);
    
    if (!amplifyReady) {
      throw new Error("Authentication service not available - check AWS configuration");
    }

    try {
      const amplifyAuth = await import("aws-amplify/auth");
      const result = await amplifyAuth.signUp({
        username: email,
        password,
        options: {
          userAttributes: {
            email,
            "custom:role": "candidate",
            ...attributes,
          },
        },
      });
      return result;
    } catch (error) {
      console.error("Amplify sign up error:", error);
      throw error;
    }
  };

  const handleSignOut = async () => {
    if (amplifyReady) {
      try {
        const amplifyAuth = await import("aws-amplify/auth");
        await amplifyAuth.signOut();
      } catch (error) {
        console.error("Amplify sign out error:", error);
      }
    }

    setUser(null);
    setUserRoleState(null);
    router.push("/login");
  };

  const handleConfirmSignUp = async (email: string, code: string) => {
    if (!amplifyReady) {
      throw new Error("Authentication service not available - check AWS configuration");
    }

    try {
      const amplifyAuth = await import("aws-amplify/auth");
      const result = await amplifyAuth.confirmSignUp({
        username: email,
        confirmationCode: code,
      });
      return result;
    } catch (error) {
      console.error("Amplify confirm sign up error:", error);
      throw error;
    }
  };

  const handleResendConfirmation = async (email: string) => {
    if (!amplifyReady) {
      throw new Error("Authentication service not available - check AWS configuration");
    }

    try {
      const amplifyAuth = await import("aws-amplify/auth");
      const result = await amplifyAuth.resendSignUpCode({
        username: email,
      });
      return result;
    } catch (error) {
      console.error("Amplify resend confirmation error:", error);
      throw error;
    }
  };

  const setUserRole = async (
    role: "super_admin" | "company_admin" | "candidate"
  ) => {
    if (!amplifyReady) {
      throw new Error("Authentication service not available - check AWS configuration");
    }

    try {
      const amplifyAuth = await import("aws-amplify/auth");
      await amplifyAuth.updateUserAttributes({
        userAttributes: {
          "custom:role": role,
        },
      });
      setUserRoleState(role);
    } catch (error) {
      console.error("Amplify update user attributes error:", error);
      throw error;
    }
  };

  const value: AuthContextType = {
    user,
    userRole,
    loading,
    signIn: handleSignIn,
    signUp: handleSignUp,
    signOut: handleSignOut,
    confirmSignUp: handleConfirmSignUp,
    resendConfirmation: handleResendConfirmation,
    setUserRole,
    amplifyReady,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
