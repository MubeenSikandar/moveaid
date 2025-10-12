"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AddBasicDetails from "@/assets/AddBasicDetails.svg";
import GoalsAndPreferences from "@/assets/GoalsAndPreferences.svg";
import MovementAssessment from "@/assets/MobementAssessment.svg";
import AccessibilityAndComfort from "@/assets/AccessibilityAndComfort.svg";
import Logo from "@/assets/MoveAid.svg";

const Step1 = () => {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [gender, setGender] = useState("");
  const [fitnessGoals, setFitnessGoals] = useState({
    recoverFromInjury: false,
    relievePain: false,
    improvePosture: false,
    buildStrength: false,
    increaseMobility: false,
    boostEnergy: false,
  });

  const handleGoalToggle = (goal: string) => {
    setFitnessGoals((prev) => ({
      ...prev,
      [goal]: !prev[goal as keyof typeof prev],
    }));
  };

  const handleSubmit = () => {
    console.log({ fullName, dateOfBirth, gender, fitnessGoals });
    router.push("/assessment/step2");
  };

  const steps = [
    {
      icon: AddBasicDetails,
      title: "Add Basic Details",
      description:
        "Provide your basic information to get started with your personalized fitness journey.",
      active: true,
    },
    {
      icon: GoalsAndPreferences,
      title: "Goals and Preferences",
      description:
        "Set your fitness objectives and preferences for a tailored workout experience.",
      active: false,
    },
    {
      icon: MovementAssessment,
      title: "Movement Assessment",
      description:
        "To guide you safely, we'll begin with a quick movement check. This helps us adapt exercises to your comfort and abilities.",
      active: false,
    },
    {
      icon: AccessibilityAndComfort,
      title: "Accessibility and Comfort",
      description:
        "Your body, your pace. Adjust settings so sessions feel comfortable, motivating, and supportive.",
      active: false,
    },
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
            {steps.map((step, index) => (
              <div key={index} className="flex gap-4">
                <div className="flex flex-col items-center">
                  <Image
                    src={step.icon}
                    alt={step.title}
                    width={36}
                    height={36}
                  />

                  {index < steps.length - 1 && (
                    <div className="w-0.5 h-16 bg-gray-300 my-2"></div>
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
            ))}
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 p-8 lg:p-16 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          {/* Step Indicator */}
          <div className="text-sm text-gray-500 mb-2">STEP 1 OF 4</div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-12">
            Let&apos;s personalize your fitness journey
          </h1>

          {/* Form */}
          <div className="space-y-8">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AD85D1] focus:border-transparent outline-none transition"
              />
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                placeholder="mm/dd/yyyy"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#AD85D1] focus:border-transparent outline-none transition"
              />
            </div>

            {/* Gender */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Gender
              </label>
              <div className="space-y-3">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    checked={gender === "male"}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-5 h-5 text-[#AD85D1] focus:ring-[#AD85D1]"
                  />
                  <span className="text-gray-700">Male</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    checked={gender === "female"}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-5 h-5 text-[#AD85D1] focus:ring-[#AD85D1]"
                  />
                  <span className="text-gray-700">Female</span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="gender"
                    value="other"
                    checked={gender === "other"}
                    onChange={(e) => setGender(e.target.value)}
                    className="w-5 h-5 text-[#AD85D1] focus:ring-[#AD85D1]"
                  />
                  <span className="text-gray-700">Other</span>
                </label>
              </div>
            </div>

            {/* Fitness Goals */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Tell us about your fitness goals
              </label>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleGoalToggle("recoverFromInjury")}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    fitnessGoals.recoverFromInjury
                      ? "border-[#AD85D1] bg-purple-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        fitnessGoals.recoverFromInjury
                          ? "bg-[#AD85D1] border-[#AD85D1]"
                          : "border-gray-300"
                      }`}
                    >
                      {fitnessGoals.recoverFromInjury && (
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
                      Recover from injury
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleGoalToggle("relievePain")}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    fitnessGoals.relievePain
                      ? "border-[#AD85D1] bg-purple-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        fitnessGoals.relievePain
                          ? "bg-[#AD85D1] border-[#AD85D1]"
                          : "border-gray-300"
                      }`}
                    >
                      {fitnessGoals.relievePain && (
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
                      Relieve pain
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleGoalToggle("improvePosture")}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    fitnessGoals.improvePosture
                      ? "border-[#AD85D1] bg-purple-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        fitnessGoals.improvePosture
                          ? "bg-[#AD85D1] border-[#AD85D1]"
                          : "border-gray-300"
                      }`}
                    >
                      {fitnessGoals.improvePosture && (
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
                      Improve posture
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleGoalToggle("buildStrength")}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    fitnessGoals.buildStrength
                      ? "border-[#AD85D1] bg-purple-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        fitnessGoals.buildStrength
                          ? "bg-[#AD85D1] border-[#AD85D1]"
                          : "border-gray-300"
                      }`}
                    >
                      {fitnessGoals.buildStrength && (
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
                      Build strength
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleGoalToggle("increaseMobility")}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    fitnessGoals.increaseMobility
                      ? "border-[#AD85D1] bg-purple-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        fitnessGoals.increaseMobility
                          ? "bg-[#AD85D1] border-[#AD85D1]"
                          : "border-gray-300"
                      }`}
                    >
                      {fitnessGoals.increaseMobility && (
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
                      Increase mobility
                    </span>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => handleGoalToggle("boostEnergy")}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    fitnessGoals.boostEnergy
                      ? "border-[#AD85D1] bg-purple-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center ${
                        fitnessGoals.boostEnergy
                          ? "bg-[#AD85D1] border-[#AD85D1]"
                          : "border-gray-300"
                      }`}
                    >
                      {fitnessGoals.boostEnergy && (
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
                      Boost energy & stamina
                    </span>
                  </div>
                </button>
              </div>
            </div>

            {/* Info Text */}
            <p className="text-sm text-gray-500 mt-6">
              Your information helps us create a safe and tailored workout plan.
            </p>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              className="w-full bg-[#AD85D1] text-white py-4 px-6 rounded-xl font-semibold hover:bg-[#9c72c0] transition-all shadow-lg hover:shadow-xl mt-8"
            >
              Save and Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1;
