import Image from "next/image";
import React from "react";
import Clock from "@/assets/Clock.svg";
import Muscle from "@/assets/Muscle.svg";
import Mat from "@/assets/Mat.svg";

const StartSessionCard = () => {
  // Sample session data - in real implementation this would come from props or state
  const completedSessions = 4;
  const totalSessions = 10;

  // Error handling for edge cases and data validation
  const safeCompletedSessions = Math.max(0, completedSessions || 0);
  const safeTotalSessions = Math.max(0, totalSessions || 0);
  const clampedCompletedSessions = Math.min(
    safeCompletedSessions,
    safeTotalSessions
  );

  // Calculate progress percentage with error handling
  const progressPercentage =
    safeTotalSessions > 0
      ? (clampedCompletedSessions / safeTotalSessions) * 100
      : 0;

  // SVG circle calculations
  const radius = 40;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progressPercentage / 100);

  return (
    <div className="w-full h-full bg-[#ebe7dd] rounded-4xl p-6 shadow-lg overflow-hidden">
      <div className="w-full h-full flex items-center justify-between">
        <div className="flex flex-col justify-center gap-6">
          <p className="text-xl font-bold text-black text-left">
            Today: Core Stability
          </p>
          <p className="text-lg text-black font-light text-left">
            Build strength one step at a time. Keep it up! 💪
          </p>
          <button className="bg-[#AD85D1] text-white rounded-4xl p-4">
            Start Session
          </button>
          <div className="flex items-center justify-between">
            <button className="flex items-center justify-center bg-[#8b8478] rounded-4xl text-white p-2 gap-2">
              <Image src={Clock} alt="arrow-right" width={12} height={12} />
              <p className="text-xs font-light">12 min</p>
            </button>
            <button className="flex items-center justify-center bg-[#8b8478] rounded-4xl text-white p-2 gap-2">
              <Image src={Muscle} alt="arrow-right" width={12} height={12} />
              <p className="text-xs font-light">Core Focus</p>
            </button>
            <button className="flex items-center justify-center bg-[#8b8478] rounded-4xl text-white p-2 gap-2">
              <Image src={Mat} alt="arrow-right" width={12} height={12} />
              <p className="text-xs font-light">Mat Only</p>
            </button>
          </div>
        </div>
        <div className="flex items-center justify-center relative">
          {/* Circular Progress SVG Container */}
          <svg
            className="w-48 h-48 transform -rotate-90"
            viewBox="0 0 100 100"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#e5e7eb"
              strokeWidth="8"
              fill="none"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#AD85D1"
              strokeWidth="8"
              fill="none"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={strokeDashoffset}
              style={{
                transition: "stroke-dashoffset 500ms ease-out",
              }}
            />
          </svg>
          {/* Centered Progress Text */}
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-3xl font-bold text-[#AD85D1]">
              {clampedCompletedSessions}/{safeTotalSessions}
            </div>
            <div className="text-sm text-gray-500">Complete sessions</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StartSessionCard;
