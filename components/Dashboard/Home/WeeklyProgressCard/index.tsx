import React from "react";
import Image from "next/image";
import ArrowRight from "@/assets/Arrow.svg";

const WeeklyProgressCard = () => {
  const weeklyData = [
    { day: "Mon", progress: 85, completed: true },
    { day: "Tue", progress: 100, completed: true },
    { day: "Wed", progress: 60, completed: false },
    { day: "Thu", progress: 0, completed: false },
    { day: "Fri", progress: 0, completed: false },
    { day: "Sat", progress: 0, completed: false },
    { day: "Sun", progress: 0, completed: false },
  ];

  const completedSessions = weeklyData.filter((day) => day.completed).length;
  const totalSessions = weeklyData.length;
  const progressPercentage = (completedSessions / totalSessions) * 100;

  return (
    <div className="w-full h-full flex flex-col bg-[#ebe7dd] rounded-4xl p-10">
      <div className="flex justify-between w-full">
        <p className="text-2xl font-bold">Your Weekly Progress</p>
        <Image src={ArrowRight} alt="arrow right" width={36} height={36} />
      </div>

      {/* Circular Progress Bar */}
      <div className="flex items-center justify-center flex-1">
        <div className="relative w-48 h-48">
          {/* Background Circle */}
          <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress Circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#AD85D1"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 40}`}
              strokeDashoffset={`${
                2 * Math.PI * 40 * (1 - progressPercentage / 100)
              }`}
              className="transition-all duration-500 ease-out"
            />
          </svg>

          {/* Center Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-center">
              <p className="text-3xl font-bold text-[#AD85D1]">
                {completedSessions}/{totalSessions}
              </p>
              <p className="text-sm font-medium text-gray-600 mt-1">
                Complete sessions
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Details */}
      <div className="flex flex-col text-center gap-2">
        <p className="text-lg font-semibold text-gray-800">
          You&apos;ve trained 4 hours this week ⚡
        </p>
        <p className="text-sm text-gray-600">
          Your form is already 8% sharper than last week — amazing consistency.
        </p>
      </div>
    </div>
  );
};

export default WeeklyProgressCard;
