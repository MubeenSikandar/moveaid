"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useSignIn, useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

import Google from "@/assets/Google.svg";
import Apple from "@/assets/Apple.svg";
import Microsoft from "@/assets/Microsoft.svg";
import RegisterImage from "@/assets/RegisterImage.svg";
import BackgroundImage from "@/assets/ImageBackground.svg";
import Logo from "@/assets/MoveAid.svg";

const Auth = () => {
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const router = useRouter();

  const [isSignUp, setIsSignUp] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordStrength, setPasswordStrength] = useState("");
  const [error, setError] = useState("");

  const validatePassword = (pwd: string) => {
    const hasNumber = /\d/.test(pwd);
    const hasSymbol = /[!@#$%^&*(),.?":{}|<>]/.test(pwd);
    const hasEmail =
      email && pwd.toLowerCase().includes(email.split("@")[0].toLowerCase());

    if (pwd.length < 8) return "weak";
    if (hasEmail) return "weak";
    if (hasNumber && hasSymbol && pwd.length >= 8) return "strong";
    return "medium";
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwd = e.target.value;
    setPassword(pwd);
    if (isSignUp && pwd.length > 0) {
      setPasswordStrength(validatePassword(pwd));
    }
  };

  const handleSubmit = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setError("");

    try {
      if (isSignUp) {
        // Sign up flow
        const result = await signUp?.create({
          emailAddress: email,
          password,
        });

        if (result?.status === "complete") {
          router.push("/dashboard");
        }
      } else {
        // Sign in flow
        const result = await signIn?.create({
          identifier: email,
          password,
        });

        if (result?.status === "complete") {
          router.push("/dashboard");
        }
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : (err as { errors?: Array<{ message: string }> })?.errors?.[0]
              ?.message || "Authentication failed";
      setError(errorMessage);
      console.error("Auth error:", err);
    }
  };

  const handleOAuthSignIn = async (
    provider: "oauth_google" | "oauth_apple" | "oauth_microsoft"
  ) => {
    try {
      if (isSignUp) {
        await signUp?.authenticateWithRedirect({
          strategy: provider,
          redirectUrl: `${window.location.origin}/sso-callback`,
          redirectUrlComplete: `${window.location.origin}/dashboard`,
        });
      } else {
        await signIn?.authenticateWithRedirect({
          strategy: provider,
          redirectUrl: `${window.location.origin}/sso-callback`,
          redirectUrlComplete: `${window.location.origin}/dashboard`,
        });
      }
    } catch (err) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : (err as { errors?: Array<{ message: string }> })?.errors?.[0]
              ?.message || "OAuth authentication failed";
      setError(errorMessage);
      console.error("OAuth error:", err);
    }
  };

  const passwordRequirements = [
    { text: "Password Strength - Weak", met: passwordStrength !== "" },
    {
      text: "Cannot contain your name or email address",
      met:
        email &&
        password &&
        !password.toLowerCase().includes(email.split("@")[0].toLowerCase()),
    },
    { text: "At least 8 characters", met: password.length >= 8 },
    {
      text: "Contains a number or symbol",
      met: /\d/.test(password) || /[!@#$%^&*(),.?":{}|<>]/.test(password),
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 p-4">
      <div className="w-full max-w-6xl bg-[#f5f2f0] rounded-3xl shadow-2xl overflow-hidden flex flex-col lg:flex-row">
        <div className="lg:w-1/2 relative bg-gradient-to-br from-purple-100 via-orange-50 to-purple-200 p-8 lg:p-12 flex flex-col justify-center items-center">
          <div className="absolute inset-0 opacity-20">
            <Image
              src={BackgroundImage}
              alt="Background"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative z-10 text-center mb-8">
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-800 mb-4">
              Welcome to MoveAid
            </h1>
            <p className="text-gray-700 text-lg">
              Feel Better in Your Body. Move with Mindful Precision.
            </p>
          </div>

          <div className="relative z-10 w-full max-w-md">
            <Image
              src={RegisterImage}
              alt="Person exercising with motion tracking"
              width={500}
              height={500}
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="lg:w-1/2 p-8 lg:p-12 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <div className="flex items-center mb-8">
              <Image src={Logo} alt="MoveAid" width={100} height={100} />
            </div>

            <div className="flex gap-4 mb-8">
              <button
                onClick={() => setIsSignUp(true)}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                  isSignUp
                    ? "bg-[#AD85D1] text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Sign Up
              </button>
              <button
                onClick={() => setIsSignUp(false)}
                className={`flex-1 py-3 px-6 rounded-xl font-semibold transition-all ${
                  !isSignUp
                    ? "bg-[#AD85D1] text-white shadow-lg"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                Sign In
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter Email Address"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#AD85D1] focus:border-transparent outline-none transition"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="Enter Password"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-[#AD85D1] focus:border-transparent outline-none transition"
                />

                {isSignUp && (
                  <div className="mt-3 space-y-2">
                    {passwordRequirements.map((req, index) => (
                      <div
                        key={index}
                        className="flex items-start gap-2 text-xs text-gray-600"
                      >
                        <span
                          className={`mt-0.5 ${
                            req.met ? "text-green-500" : "text-gray-400"
                          }`}
                        >
                          {req.met ? "✓" : "○"}
                        </span>
                        <span>{req.text}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <button
                onClick={handleSubmit}
                className="w-full bg-[#AD85D1] text-white py-3 px-6 rounded-xl font-semibold hover:bg-[#9B6FC4] transition-all shadow-lg hover:shadow-xl"
              >
                {isSignUp ? "Create Account" : "Sign In"}
              </button>

              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
                  {error}
                </div>
              )}

              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-[#f5f2f0] text-gray-500">OR</span>
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => handleOAuthSignIn("oauth_google")}
                  className="flex-1 flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
                >
                  <Image src={Google} alt="Google" width={24} height={24} />
                </button>
                <button
                  type="button"
                  onClick={() => handleOAuthSignIn("oauth_apple")}
                  className="flex-1 flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
                >
                  <Image src={Apple} alt="Apple" width={24} height={24} />
                </button>
                <button
                  type="button"
                  onClick={() => handleOAuthSignIn("oauth_microsoft")}
                  className="flex-1 flex items-center justify-center py-3 px-4 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
                >
                  <Image
                    src={Microsoft}
                    alt="Microsoft"
                    width={24}
                    height={24}
                  />
                </button>
              </div>
            </div>

            {isSignUp && (
              <p className="text-xs text-center text-gray-500 mt-6">
                By signing up to create an account I accept Company&apos;s{" "}
                <a href="#" className="text-[#AD85D1] hover:underline">
                  Terms of use
                </a>{" "}
                &{" "}
                <a href="#" className="text-[#AD85D1] hover:underline">
                  Privacy Policy
                </a>
                .
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
