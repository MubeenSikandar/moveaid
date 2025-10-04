"use client";

import React from "react";
import { SignedIn, SignedOut, SignInButton, SignUpButton } from "@clerk/nextjs";

interface ProtectedRouteProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  fallback,
}) => {
  return (
    <>
      <SignedIn>{children}</SignedIn>
      <SignedOut>
        {fallback || (
          <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center">
            <div className="max-w-md mx-auto text-center p-8">
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">
                  Sign In Required
                </h1>
                <p className="text-gray-600 mb-8">
                  Please sign in to access the assessment and get your
                  personalized movement plan.
                </p>
                <div className="space-y-4">
                  <SignInButton>
                    <button className="w-full bg-[#AD85D1] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#9A73C7] transition-colors">
                      Sign In
                    </button>
                  </SignInButton>
                  <SignUpButton>
                    <button className="w-full bg-[#6c47ff] text-white px-6 py-3 rounded-lg font-medium hover:bg-[#5a3ae6] transition-colors">
                      Create Account
                    </button>
                  </SignUpButton>
                </div>
              </div>
            </div>
          </div>
        )}
      </SignedOut>
    </>
  );
};

export default ProtectedRoute;
