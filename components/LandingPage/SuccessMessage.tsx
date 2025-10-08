"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

interface SuccessMessageProps {
  onClose: () => void;
  assessmentType: string;
}

const SuccessMessage: React.FC<SuccessMessageProps> = ({
  onClose,
  assessmentType,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // Animate in
    const timer = setTimeout(() => setIsVisible(true), 100);

    // Progress animation
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressTimer);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => {
      clearTimeout(timer);
      clearInterval(progressTimer);
    };
  }, []);

  const handleContinue = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
      router.push("/dashboard");
    }, 300);
  };

  const getAssessmentTitle = (type: string) => {
    const titles: { [key: string]: string } = {
      "recover-from-injury": "Recover From Injury",
      "fix-posture": "Fix Posture",
      "build-movement-habit": "Build Movement Habit",
      "improve-workout-form": "Improve Workout Form",
      "stay-active-at-desk": "Stay Active At Desk",
      "less-stiff-more-mobile": "Less Stiff, More Mobile",
    };
    return titles[type] || "Assessment";
  };

  const getAssessmentIcon = (type: string) => {
    const icons: { [key: string]: string } = {
      "recover-from-injury": "🩹",
      "fix-posture": "🧍",
      "build-movement-habit": "🏃",
      "improve-workout-form": "💪",
      "stay-active-at-desk": "🪑",
      "less-stiff-more-mobile": "🤸",
    };
    return icons[type] || "✨";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div
        className={`transform transition-all duration-500 ease-out ${
          isVisible
            ? "scale-100 opacity-100 translate-y-0"
            : "scale-95 opacity-0 translate-y-4"
        }`}
      >
        <div className="relative bg-white rounded-3xl shadow-2xl p-8 max-w-md mx-4 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full -translate-x-16 -translate-y-16"></div>
            <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full translate-x-12 translate-y-12"></div>
            <div className="absolute top-1/2 left-1/2 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full -translate-x-8 -translate-y-8"></div>
          </div>

          {/* Success Animation */}
          <div className="relative z-10 text-center">
            {/* Animated Checkmark */}
            <div className="relative mx-auto w-20 h-20 mb-6">
              <div className="absolute inset-0 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
              <div className="absolute inset-2 bg-white rounded-full flex items-center justify-center">
                <svg
                  className="w-10 h-10 text-green-500 animate-bounce"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={3}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>

            {/* Assessment Icon */}
            <div className="text-6xl mb-4 animate-bounce">
              {getAssessmentIcon(assessmentType)}
            </div>

            {/* Title */}
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Assessment Complete!
            </h2>

            {/* Subtitle */}
            <p className="text-gray-600 mb-6">
              Your{" "}
              <span className="font-semibold text-purple-600">
                {getAssessmentTitle(assessmentType)}
              </span>{" "}
              assessment has been successfully submitted.
            </p>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Processing your data...</span>
                <span>{progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300 ease-out"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
            </div>

            {/* Success Message */}
            <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-xl p-4 mb-6 border border-green-200">
              <div className="flex items-center justify-center space-x-2 text-green-700">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">Personalized plan ready!</span>
              </div>
            </div>

            {/* Next Steps */}
            <div className="text-left mb-6">
              <h3 className="font-semibold text-gray-900 mb-3">
                What&apos;s next?
              </h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  <span>Review your personalized recommendations</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <span>Access your custom exercise plan</span>
                </li>
                <li className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span>Track your progress over time</span>
                </li>
              </ul>
            </div>

            {/* Action Button */}
            <button
              onClick={handleContinue}
              disabled={progress < 100}
              className={`w-full py-3 px-6 rounded-xl font-semibold text-white transition-all duration-300 ${
                progress >= 100
                  ? "bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 transform hover:scale-105 shadow-lg"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {progress >= 100 ? (
                <span className="flex items-center justify-center space-x-2">
                  <span>Go to Dashboard</span>
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </span>
              ) : (
                "Processing..."
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessMessage;
