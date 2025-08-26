"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Brain, Users, Heart } from "lucide-react";

export default function LoginPage() {
  const { signIn, amplifyReady } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signIn(email, password);
    } catch (err: any) {
      console.error("Login error:", err);
      let errorMessage = "Login failed";
      
      if (err.message?.includes("UserNotFoundException")) {
        errorMessage = "User not found. Try using one of the demo accounts shown above.";
      } else if (err.message?.includes("NotAuthorizedException")) {
        errorMessage = "Invalid email or password. For demo purposes, use the accounts listed above.";
      } else if (err.message?.includes("UserAlreadyAuthenticatedException")) {
        errorMessage = "Another user is already signed in. Please try again.";
      } else if (err.message) {
        errorMessage = err.message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-abhh-teal-50 to-white">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-xl shadow-abhh-lg border border-abhh-teal-100">
        {/* Logo and Brand */}
        <div className="text-center">
          <div className="mx-auto w-16 h-16 bg-abhh-yellow-500 rounded-xl flex items-center justify-center mb-4 shadow-abhh">
            <div className="flex items-center space-x-1">
              <Brain className="h-6 w-6 text-abhh-teal-600" />
              <Heart className="h-4 w-4 text-abhh-teal-600" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-abhh-teal-600 mb-2">
            APPLIED BEHAVIORAL
          </h1>
          <h2 className="text-xl font-bold text-abhh-teal-600 mb-4">
            HOLISTIC HEALTH
          </h2>
          <p className="text-abhh-teal-500">Interview Management Platform</p>

          <div className="mt-6 p-4 bg-abhh-yellow-50 border border-abhh-yellow-200 rounded-lg text-sm text-abhh-teal-700">
            <p className="font-semibold flex items-center justify-center">
              <Users className="w-4 h-4 mr-2" />
              Demo Mode Active
            </p>
            <p className="mt-2">Try these accounts:</p>
            <div className="mt-3 text-xs space-y-3 text-left">
              <div>
                <div className="flex justify-between mb-1">
                  <strong>admin@abhh.demo</strong>
                  <span className="text-abhh-teal-500">Super Admin</span>
                </div>
                <div className="text-abhh-teal-600">Password: AdminPass123!</div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <strong>company@techcorp.demo</strong>
                  <span className="text-abhh-teal-500">Company Admin</span>
                </div>
                <div className="text-abhh-teal-600">Password: CompanyPass123!</div>
              </div>
              <div>
                <div className="flex justify-between mb-1">
                  <strong>candidate@demo.com</strong>
                  <span className="text-abhh-teal-500">Candidate</span>
                </div>
                <div className="text-abhh-teal-600">Password: CandidatePass123!</div>
              </div>
            </div>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-abhh-teal-700 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block w-full px-4 py-3 border border-abhh-teal-200 rounded-lg shadow-sm placeholder-abhh-teal-400 text-abhh-teal-700 bg-white focus:outline-none focus:ring-2 focus:ring-abhh-teal-500 focus:border-abhh-teal-500 transition-colors"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-abhh-teal-700 mb-2"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="block w-full px-4 py-3 border border-abhh-teal-200 rounded-lg shadow-sm placeholder-abhh-teal-400 text-abhh-teal-700 bg-white focus:outline-none focus:ring-2 focus:ring-abhh-teal-500 focus:border-abhh-teal-500 transition-colors"
              placeholder="Enter your password"
            />
          </div>

          <Button
            type="submit"
            className="w-full bg-abhh-teal-600 hover:bg-abhh-teal-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out shadow-abhh"
            disabled={loading}
          >
            {loading ? (
              <div className="flex items-center justify-center">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                Signing In...
              </div>
            ) : (
              "Sign In to Platform"
            )}
          </Button>

          <div className="text-center space-y-4">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-abhh-teal-200" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-abhh-teal-500">New to ABHH?</span>
              </div>
            </div>

            <Link
              href="/register"
              className="inline-block font-medium text-abhh-teal-600 hover:text-abhh-teal-800 transition-colors"
            >
              Create an account
            </Link>

            <p className="text-sm text-abhh-teal-600">
              Empowering holistic behavioral health through technology
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
