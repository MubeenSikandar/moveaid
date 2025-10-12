"use client";
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import AddBasicDetails from "@/assets/AddBasicDetails.svg";
import GoalsAndPreferencesActive from "@/assets/GoalsAndPreferencesActive.svg";
import MovementAssessment from "@/assets/MobementAssessment.svg";
import AccessibilityAndComfort from "@/assets/AccessibilityAndComfort.svg";
import Logo from "@/assets/MoveAid.svg";

const Step2 = () => {
  const router = useRouter();
  const [activityLevel, setActivityLevel] = useState("");
  const [sessionLength, setSessionLength] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);
  const [selectedTimes, setSelectedTimes] = useState<string[]>([]);
  const [equipment, setEquipment] = useState<string[]>([]);

  const handleDayToggle = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    );
  };

  const handleTimeToggle = (time: string) => {
    setSelectedTimes((prev) =>
      prev.includes(time) ? prev.filter((t) => t !== time) : [...prev, time]
    );
  };

  const handleEquipmentToggle = (item: string) => {
    setEquipment((prev) =>
      prev.includes(item) ? prev.filter((e) => e !== item) : [...prev, item]
    );
  };

  const handleSubmit = () => {
    console.log({
      activityLevel,
      sessionLength,
      selectedDays,
      selectedTimes,
      equipment,
    });
    router.push("/assessment/step3");
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
      active: true,
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

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

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
                    <div
                      className={`w-0.5 h-16 my-2 ${
                        steps[index + 1]?.active
                          ? "bg-[#AD85D1]"
                          : "bg-gray-300"
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
            ))}
          </div>
        </div>
      </div>

      {/* Right Content */}
      <div className="flex-1 p-8 lg:p-16 overflow-y-auto">
        <div className="max-w-2xl mx-auto">
          {/* Step Indicator */}
          <div className="text-sm text-gray-500 mb-2">STEP 2 OF 4</div>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            What matters most to you?
          </h1>
          <p className="text-gray-600 mb-12">
            Tell us your goals so we can shape sessions that truly fit your
            priorities.
          </p>

          {/* Form */}
          <div className="space-y-10">
            {/* Activity Level */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Activity Level
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Choose the one that best matches your lifestyle.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setActivityLevel("sedentary")}
                  className={`p-5 rounded-xl border-2 text-center transition-all ${
                    activityLevel === "sedentary"
                      ? "border-[#AD85D1] bg-purple-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-[#AD85D1] flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        Sedentary
                      </div>
                      <div className="text-sm text-gray-500">
                        Minimal activity
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setActivityLevel("light")}
                  className={`p-5 rounded-xl border-2 text-center transition-all ${
                    activityLevel === "light"
                      ? "border-[#AD85D1] bg-purple-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-[#AD85D1] flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Light</div>
                      <div className="text-sm text-gray-500">Some walking</div>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setActivityLevel("moderate")}
                  className={`p-5 rounded-xl border-2 text-center transition-all ${
                    activityLevel === "moderate"
                      ? "border-[#AD85D1] bg-purple-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-[#AD85D1] flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M13.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM9.8 8.9L7 23h2.1l1.8-8 2.1 2v6h2v-7.5l-2.1-2 .6-3C14.8 12 16.8 13 19 13v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.56-.89-1.68-1.25-2.65-.84L6 8.3V13h2V9.6l1.8-.7z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">
                        Moderate
                      </div>
                      <div className="text-sm text-gray-500">
                        Regular exercise
                      </div>
                    </div>
                  </div>
                </button>

                <button
                  type="button"
                  onClick={() => setActivityLevel("active")}
                  className={`p-5 rounded-xl border-2 text-center transition-all ${
                    activityLevel === "active"
                      ? "border-[#AD85D1] bg-purple-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                >
                  <div className="flex flex-col items-center gap-2">
                    <div className="w-12 h-12 rounded-full bg-[#AD85D1] flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-white"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M15.5 5.5c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM5 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5zm5.8-10l2.4-2.4.8.8c1.3 1.3 3 2.1 5.1 2.1V9c-1.5 0-2.7-.6-3.6-1.5l-1.9-1.9c-.5-.4-1-.6-1.6-.6s-1.1.2-1.4.6L7.8 8.4c-.4.4-.6.9-.6 1.4 0 .6.2 1.1.6 1.4L11 14v5h2v-6.2l-2.2-2.3zM19 12c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8.5c-1.9 0-3.5-1.6-3.5-3.5s1.6-3.5 3.5-3.5 3.5 1.6 3.5 3.5-1.6 3.5-3.5 3.5z" />
                      </svg>
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900">Active</div>
                      <div className="text-sm text-gray-500">Very active</div>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            {/* Preferred Session Length */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Preferred Session Length
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Even 10 minutes counts.
              </p>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setSessionLength("10")}
                  className={`flex-1 py-3 px-6 rounded-xl border-2 font-semibold transition-all ${
                    sessionLength === "10"
                      ? "border-[#AD85D1] bg-purple-50 text-[#AD85D1]"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
                >
                  10 min
                </button>
                <button
                  type="button"
                  onClick={() => setSessionLength("20")}
                  className={`flex-1 py-3 px-6 rounded-xl border-2 font-semibold transition-all ${
                    sessionLength === "20"
                      ? "border-[#AD85D1] bg-purple-50 text-[#AD85D1]"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
                >
                  20 min
                </button>
                <button
                  type="button"
                  onClick={() => setSessionLength("30+")}
                  className={`flex-1 py-3 px-6 rounded-xl border-2 font-semibold transition-all ${
                    sessionLength === "30+"
                      ? "border-[#AD85D1] bg-purple-50 text-[#AD85D1]"
                      : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                  }`}
                >
                  30+ min
                </button>
              </div>
            </div>

            {/* Preferred Days and Times */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Preferred Days and Times
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Consistency beats intensity.
              </p>

              {/* Days */}
              <div className="mb-6">
                <h3 className="text-sm font-medium text-gray-700 mb-3">Days</h3>
                <div className="flex gap-2 flex-wrap">
                  {days.map((day) => (
                    <button
                      key={day}
                      type="button"
                      onClick={() => handleDayToggle(day)}
                      className={`px-6 py-2 rounded-full border-2 font-medium transition-all ${
                        selectedDays.includes(day)
                          ? "border-[#AD85D1] bg-purple-50 text-[#AD85D1]"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {day}
                    </button>
                  ))}
                </div>
              </div>

              {/* Times */}
              <div>
                <h3 className="text-sm font-medium text-gray-700 mb-3">
                  Times
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["Morning", "Afternoon", "Evening", "Anytime"].map(
                    (time) => (
                      <button
                        key={time}
                        type="button"
                        onClick={() => handleTimeToggle(time)}
                        className={`p-4 rounded-xl border-2 text-center transition-all ${
                          selectedTimes.includes(time)
                            ? "border-[#AD85D1] bg-purple-50"
                            : "border-gray-200 bg-white hover:border-gray-300"
                        }`}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              selectedTimes.includes(time)
                                ? "bg-[#AD85D1]"
                                : "bg-gray-200"
                            }`}
                          >
                            <svg
                              className={`w-5 h-5 ${
                                selectedTimes.includes(time)
                                  ? "text-white"
                                  : "text-gray-500"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z" />
                            </svg>
                          </div>
                          <div className="font-medium text-gray-900 text-sm">
                            {time}
                          </div>
                        </div>
                      </button>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Equipment Available */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-2">
                Equipment Available
              </h2>
              <p className="text-sm text-gray-600 mb-4">
                Select all that apply.
              </p>

              <div className="flex gap-3 flex-wrap">
                {["None", "Dumbbells", "Resistance Bands", "Others"].map(
                  (item) => (
                    <button
                      key={item}
                      type="button"
                      onClick={() => handleEquipmentToggle(item)}
                      className={`px-6 py-3 rounded-full border-2 font-medium transition-all ${
                        equipment.includes(item)
                          ? "border-[#AD85D1] bg-purple-50 text-[#AD85D1]"
                          : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"
                      }`}
                    >
                      {item}
                    </button>
                  )
                )}
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

export default Step2;
