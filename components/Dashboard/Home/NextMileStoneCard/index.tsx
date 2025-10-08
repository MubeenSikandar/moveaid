import React from "react";
import Image from "next/image";
import GoldBadge from "@/assets/BadgeGold.svg";
import CoreStability from "@/assets/CoreStabilityBoost.svg";
import Strengthen from "@/assets/LowerBackRelief.svg";
import ShoulderMobility from "@/assets/ShoulderMobility.svg";
import FullBodyReset from "@/assets/FullBodyReset.svg";
import ArrowRight from "@/assets/Arrow.svg";

interface Activity {
  id: string;
  name: string;
  date: string;
  time: string;
  duration: string;
  icon: string;
  completed?: boolean;
}

const NextMilestoneCard: React.FC = () => {
  const currentDay = 15;
  const totalDays = 20;
  const progressPercentage = (currentDay / totalDays) * 100;

  const activities: Activity[] = [
    {
      id: "1",
      name: "Core Stability Boost",
      date: "Today",
      time: "8:15 AM",
      duration: "12 MINS",
      icon: CoreStability,
      completed: true,
    },
    {
      id: "2",
      name: "Lower Back Relief",
      date: "Yesterday",
      time: "8:15 AM",
      duration: "12 MINS",
      icon: Strengthen,
      completed: true,
    },
    {
      id: "3",
      name: "Shoulder Mobility",
      date: "16th Mar",
      time: "8:15 AM",
      duration: "12 MINS",
      icon: ShoulderMobility,
      completed: true,
    },
    {
      id: "4",
      name: "Full Body Reset",
      date: "16 Mar",
      time: "8:15 AM",
      duration: "30 MINS",
      icon: FullBodyReset,
      completed: true,
    },
  ];

  return (
    <div className="w-full bg-[#ebe7dd] rounded-4xl p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 tracking-tight">
          Next Milestone
        </h2>
        <button className="bg-white rounded-full flex items-center justify-center">
          <Image src={ArrowRight} alt="Expand" width={36} height={36} />
        </button>
      </div>

      {/* Badge Section */}
      <div className="flex flex-col items-center mb-8">
        <div className="relative mb-4">
          {/* Gold Shield Badge */}
          <div className="relative">
            <div className="w-32 h-32 bg-gradient-to-b from-[#FFD700] to-[#FFA500] rounded-2xl rotate-3 flex items-center justify-center shadow-xl">
              <div className="absolute inset-0 flex items-center justify-center">
                {/* Gold Badge Icon */}
                <Image
                  src={GoldBadge}
                  alt="Gold Badge"
                  width={60}
                  height={60}
                  className="drop-shadow-md"
                />
              </div>
              {/* Stars */}
              <div className="absolute top-4 left-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFA500">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
              <div className="absolute top-4 right-4">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="#FFA500">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                </svg>
              </div>
            </div>
            {/* Purple Ribbon */}
            <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-[#9B7BFF] to-[#B19AFF] text-white px-8 py-2 rounded-full shadow-lg">
              <span className="font-semibold text-sm tracking-wider">GOLD</span>
            </div>
          </div>
        </div>

        {/* Day Counter */}
        <div className="mt-8 mb-2">
          <span className="bg-gradient-to-r from-[#9B7BFF] to-[#B19AFF] text-white px-4 py-2 rounded-full text-sm font-semibold">
            Day {currentDay}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full max-w-[320px] mb-4">
          <div className="relative h-3 bg-gray-300 rounded-full overflow-hidden">
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#4ADE80] to-[#22C55E] rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            />
            <div
              className="absolute top-1/2 transform -translate-y-1/2 w-5 h-5 bg-white border-4 border-[#22C55E] rounded-full shadow-md"
              style={{ left: `calc(${progressPercentage}% - 10px)` }}
            />
          </div>
        </div>

        {/* Milestone Text */}
        <p className="text-gray-700 text-center mb-8">
          Earn your 20 day championship badge
        </p>
      </div>

      {/* Recent Activity Section */}
      <div className="border-t border-gray-300 pt-8">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">
          Recent Activity
        </h3>

        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0"
            >
              <div className="flex items-center space-x-4">
                {/* Activity Icon */}
                <div className="w-14 h-14 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                  <Image
                    src={activity.icon}
                    alt={activity.name}
                    width={56}
                    height={56}
                    className="object-cover"
                  />
                </div>

                {/* Activity Details */}
                <div>
                  <h4 className="font-medium text-gray-800 text-lg">
                    {activity.name}
                  </h4>
                  <p className="text-sm text-gray-500">
                    {activity.date} • {activity.time} • {activity.duration}
                  </p>
                </div>
              </div>

              {/* Completion Check */}
              {activity.completed && (
                <div className="w-8 h-8 bg-[#22C55E] rounded-full flex items-center justify-center">
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NextMilestoneCard;
