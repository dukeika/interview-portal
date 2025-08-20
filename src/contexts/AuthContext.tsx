"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

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
    if (!amplifyReady) {
      setLoading(false);
      return;
    }

    try {
      // Try to get current user with real Amplify
      const amplifyAuth = await import("aws-amplify/auth");
      const currentUser = await amplifyAuth.getCurrentUser();
      setUser(currentUser);

      // Extract user role from custom attributes
      const attributes = await amplifyAuth.fetchUserAttributes();
      const roleAttribute = attributes["custom:role"];
      const role = roleAttribute as
        | "super_admin"
        | "company_admin"
        | "candidate"
        | null;
      setUserRoleState(role);

      // Auto-redirect based on role if on home page
      if (typeof window !== "undefined" && window.location.pathname === "/") {
        redirectByRole(role);
      }
    } catch (error) {
      console.log("No authenticated user found, using mock mode");
      setUser(null);
      setUserRoleState(null);
      // Switch to mock mode if real auth fails
      setAmplifyReady(false);
    } finally {
      setLoading(false);
    }
  };

  const redirectByRole = (
    role: "super_admin" | "company_admin" | "candidate" | null
  ) => {
    switch (role) {
      case "super_admin":
        router.push("/admin/dashboard");
        break;
      case "company_admin":
        router.push("/company/dashboard");
        break;
      case "candidate":
        router.push("/candidate/dashboard");
        break;
      default:
        router.push("/login");
    }
  };

  const handleSignIn = async (email: string, password: string) => {
    // Always use mock mode for now - this avoids Cognito errors
    console.log("Using mock authentication for:", email);

    // Simulate user object
    const mockUser = {
      username: email,
      attributes: {
        email: email,
      },
    };

    setUser(mockUser);

    // Set role based on email
    let role: "super_admin" | "company_admin" | "candidate" = "candidate";
    if (email.includes("admin@")) {
      role = "super_admin";
    } else if (email.includes("company@")) {
      role = "company_admin";
    }

    setUserRoleState(role);
    redirectByRole(role);

    return { isSignedIn: true };

    /* 
    // Real Amplify authentication (commented out until we have real users)
    if (amplifyReady) {
      try {
        const amplifyAuth = await import('aws-amplify/auth');
        const result = await amplifyAuth.signIn({
          username: email,
          password,
        });
        await checkUser(); // Refresh user state after sign in
        return result;
      } catch (error) {
        console.error('Amplify sign in error:', error);
        throw error;
      }
    }
    */
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
