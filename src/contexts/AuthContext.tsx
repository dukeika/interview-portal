"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { userService } from "@/services/userService";
import { UserRole } from "@/API";
import { setMockMode, clearMockMode } from "@/lib/mockServices";

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
        // Check if we have a demo user in localStorage first
        if (typeof window !== 'undefined') {
          const demoUser = localStorage.getItem('demo_user');
          if (demoUser) {
            console.log("🎭 Found demo user in localStorage, restoring session");
            const mockUser = JSON.parse(demoUser);
            setUser(mockUser);
            
            // Set role based on demo email pattern
            let role: "super_admin" | "company_admin" | "candidate" = "candidate";
            if (mockUser.username === 'admin@abhh.demo') {
              role = "super_admin";
            } else if (mockUser.username === 'company@techcorp.demo') {
              role = "company_admin";
            } else if (mockUser.username === 'candidate@demo.com') {
              role = "candidate";
            }
            
            setUserRoleState(role);
            setLoading(false);
            return;
          }
        }

        // Try to initialize real Amplify
        const amplifyConfig = await import("@/lib/amplify-config");
        const isRealAmplify = amplifyConfig.configureAmplify();
        setAmplifyReady(isRealAmplify);

        if (isRealAmplify) {
          await checkUser();
        } else {
          // Use mock mode
          console.log("Running in mock authentication mode");
          setLoading(false);
        }
      } catch (error) {
        console.warn("Failed to initialize auth, using mock mode:", error);
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

      // Try to get user role from attributes first, then fall back to email pattern
      let role: "super_admin" | "company_admin" | "candidate" | null = null;
      let attributes: any = {};
      
      try {
        attributes = await amplifyAuth.fetchUserAttributes();
        console.log("📋 User attributes:", attributes);
        
        // Check for custom role attribute
        const roleAttribute = attributes["custom:role"];
        if (roleAttribute) {
          role = roleAttribute as "super_admin" | "company_admin" | "candidate";
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

      // Ensure user record exists in our database (skip for demo mode)
      if (!currentUser?.userId?.startsWith('demo-')) {
        await ensureUserRecord(currentUser, role);
      }

      // Auto-redirect based on role if on home page or login page
      if (typeof window !== "undefined") {
        const currentPath = window.location.pathname;
        console.log(`🛣️ Current path: ${currentPath}, Role: ${role}`);
        
        if (currentPath === "/" || currentPath === "/login") {
          console.log(`🎯 Redirecting user with role ${role}`);
          redirectByRole(role);
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
          isActive: true
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

  const redirectByRole = (
    role: "super_admin" | "company_admin" | "candidate" | null
  ) => {
    console.log(`🚀 Redirecting based on role: ${role}`);
    
    switch (role) {
      case "super_admin":
        console.log("📍 Redirecting to admin dashboard");
        router.push("/admin/dashboard");
        break;
      case "company_admin":
        console.log("📍 Redirecting to company dashboard");
        router.push("/company/dashboard");
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

    // Check if this is a demo account first
    const isDemoAccount = [
      'admin@abhh.demo',
      'company@techcorp.demo', 
      'candidate@demo.com'
    ].includes(email);

    if (isDemoAccount) {
      console.log("🎭 Demo account detected, using mock authentication");
      
      // Simulate authentication delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Create mock user object
      const mockUser = {
        username: email,
        userId: `demo-${Date.now()}`,
        attributes: {
          email: email,
          given_name: email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1),
          family_name: 'Demo'
        },
      };

      setUser(mockUser);

      // Set role based on demo email pattern
      let role: "super_admin" | "company_admin" | "candidate" = "candidate";
      if (email === 'admin@abhh.demo') {
        role = "super_admin";
      } else if (email === 'company@techcorp.demo') {
        role = "company_admin";
      } else if (email === 'candidate@demo.com') {
        role = "candidate";
      }

      console.log(`👤 Demo user role assigned: ${role}`);
      setUserRoleState(role);
      
      // Set mock mode in localStorage for services to detect
      setMockMode(mockUser);
      
      redirectByRole(role);

      return { isSignedIn: true, user: mockUser };
    }

    // For non-demo accounts, try real Cognito authentication
    try {
      console.log("☁️ Attempting real Cognito authentication");
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
      throw error; // Don't fall back for non-demo accounts
    }
  };

  const handleSignUp = async (
    email: string,
    password: string,
    attributes = {}
  ) => {
    if (amplifyReady) {
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
    } else {
      // Mock sign up
      console.log("Mock sign up:", email);
      return { isSignUpComplete: false, userId: "mock-user-id" };
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
    clearMockMode(); // Clear mock mode on sign out
    router.push("/login");
  };

  const handleConfirmSignUp = async (email: string, code: string) => {
    if (amplifyReady) {
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
    } else {
      console.log("Mock confirm sign up:", email, code);
      return { isSignUpComplete: true };
    }
  };

  const handleResendConfirmation = async (email: string) => {
    if (amplifyReady) {
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
    } else {
      console.log("Mock resend confirmation:", email);
      return { deliveryMedium: "EMAIL" };
    }
  };

  const setUserRole = async (
    role: "super_admin" | "company_admin" | "candidate"
  ) => {
    if (amplifyReady) {
      try {
        const amplifyAuth = await import("aws-amplify/auth");
        await amplifyAuth.updateUserAttributes({
          userAttributes: {
            "custom:role": role,
          },
        });
      } catch (error) {
        console.error("Amplify update user attributes error:", error);
        throw error;
      }
    }

    setUserRoleState(role);
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
