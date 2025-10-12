"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AddBasicDetails from "@/assets/AddBasicDetails.svg";
import GoalsAndPreferencesActive from "@/assets/GoalsAndPreferencesActive.svg";
import MovementAssessmentActive from "@/assets/MovementAssessmentActive.svg";
import AccessibilityAndComfortActive from "@/assets/AccessibilityAndComfortActive.svg";
import Logo from "@/assets/MoveAid.svg";

const Step4 = () => {
  const router = useRouter();
  const [injuries, setInjuries] = useState<string[]>([]);
  const [accessibilitySupport, setAccessibilitySupport] = useState<string[]>(
    []
  );

  const handleInjuryToggle = (injury: string) => {
    setInjuries((prev) =>
      prev.includes(injury)
        ? prev.filter((i) => i !== injury)
        : [...prev, injury]
    );
  };

  const handleAccessibilityToggle = (option: string) => {
    setAccessibilitySupport((prev) =>
      prev.includes(option)
        ? prev.filter((o) => o !== option)
        : [...prev, option]
    );
  };

  const handleSubmit = () => {
    console.log({
      injuries,
      accessibilitySupport,
    });
    router.push("/dashboard");
  };

  const steps = [
    {
      icon: AddBasicDetails,
      title: "Add Basic Details",
      description:
        "Provide your basic information to get started with your personalized fitness journey.",
      active: false,
    },
    {
      icon: GoalsAndPreferencesActive,
      title: "Goals and Preferences",
      description:
        "Set your fitness objectives and preferences for a tailored workout experience.",
      active: false,
    },
    {
      icon: MovementAssessmentActive,
      title: "Movement Assessment",
      description:
        "To guide you safely, we'll begin with a quick movement check. This helps us adapt exercises to your comfort and abilities.",
      active: false,
    },
    {
      icon: AccessibilityAndComfortActive,
      title: "Accessibility and Comfort",
      description:
        "Your body, your pace. Adjust settings so sessions feel comfortable, motivating, and supportive.",
      active: true,
    },
  ];

  const injuryOptions = [
    "Knees",
    "Shoulders",
    "Back",
    "Neck",
    "Hips",
    "Other",
    "None",
  ];

  const accessibilityOptions = [
    "Low-vision mode (larger text, high contrast)",
    "Low-mobility adaptations (seated or simplified moves)",
    "Balance support options (chair-assisted moves)",
  ];

  return (
    <div className="min-h-screen bg-[#f3f0ee] flex">
      {/* Left Sidebar */}
      <div className="w-full lg:w-2/5 bg-gradient-to-b from-[#efe6d9] to-[#e8dfd1] p-8 lg:p-12">
        <div className="max-w-md">
          {/* Logo */}
          <div className="mb-12">
            <Image src={Logo} alt="MoveAid" width={150} height={40} />
          </div>

          {/* Header */}
          <p className="text-gray-600 text-sm mb-8">
            Get started by setting up your Move Aid profile
          </p>

          {/* Steps */}
          <div className="space-y-8">
            {steps.map((step, index) => {
              // Find if there's any active step at or after the next step
              const shouldBeActive = steps
                .slice(index + 1)
                .some((s) => s.active);

              return (
                <div key={index} className="flex gap-4">
                  <div className="flex flex-col items-center">
                    <Image
                      src={step.icon}
                      alt={step.title}
                      width={36}
                      height={36}
                    />

                    {index < steps.length - 1 && (
                      <div
                        className={`w-0.5 h-16 my-2 ${
                          shouldBeActive ? "bg-[#AD85D1]" : "bg-gray-300"
                        }`}
                      ></div>
                    )}
                  </div>

                  <div className="flex-1 pb-8">
                    <h3
                      className={`font-semibold mb-1 ${
                        step.active ? "text-gray-900" : "text-gray-500"
                      }`}
                    >
                      {step.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 p-8 lg:p-16 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          {/* Step Indicator */}
          <div className="text-sm text-gray-500 mb-2">STEP 4 OF 4</div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Accessibility and Comfort
          </h1>
          <p className="text-gray-600 mb-12">
            Adjust settings so sessions feel comfortable, motivating, and
            supportive.
          </p>

          {/* Form */}
          <div className="space-y-10">
            {/* Injuries or Pain Areas */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Do you have any injuries or pain areas we should know about?
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                This helps us keep your movements safe and adapted to your body.
              </p>

              <div className="flex gap-3 flex-wrap">
                {injuryOptions.map((injury) => (
                  <button
                    key={injury}
                    type="button"
                    onClick={() => handleInjuryToggle(injury)}
                    className={`px-6 py-3 rounded-full border-2 font-medium transition-all ${
                      injuries.includes(injury)
                        ? "border-[#AD85D1] bg-purple-50 text-[#AD85D1]"
                        : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                    }`}
                  >
                    {injury}
                  </button>
                ))}
              </div>
            </div>

            {/* Accessibility Support */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Do you need any accessibility support?
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Select what makes sessions more comfortable—you can always
                update later.
              </p>

              <div className="space-y-3">
                {accessibilityOptions.map((option) => (
                  <button
                    key={option}
                    type="button"
                    onClick={() => handleAccessibilityToggle(option)}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      accessibilitySupport.includes(option)
                        ? "border-[#AD85D1] bg-purple-50"
                        : "border-gray-200 bg-white hover:border-gray-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                          accessibilitySupport.includes(option)
                            ? "bg-[#AD85D1] border-[#AD85D1]"
                            : "border-gray-300"
                        }`}
                      >
                        {accessibilitySupport.includes(option) && (
                          <svg
                            className="w-3 h-3 text-white"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="3"
                              d="M5 13l4 4L19 7"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="font-medium text-gray-900">
                        {option}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Info Text */}
            <div className="bg-purple-50 rounded-xl p-4 border border-purple-100">
              <div className="flex items-start gap-3">
                <svg
                  className="w-5 h-5 text-[#AD85D1] flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
                <p className="text-sm text-gray-700">
                  Your information helps us create a safe and tailored workout
                  plan.
                </p>
              </div>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-[#AD85D1] text-white py-4 px-6 rounded-xl font-semibold hover:bg-[#9c72c0] transition-all shadow-lg hover:shadow-xl mt-8"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step4;
