import React from "react";
import Image from "next/image";
import SereneDumbbell from "@/assets/Serene Coral Dumbbell Character.svg";
import SmilyFace from "@/assets/SmilyFace.svg";
import SadFace from "@/assets/SadFace.svg";
import SadLightningCharacter from "@/assets/Sad Lightning Bolt Character.svg";
import ArrowRight from "@/assets/Arrow.svg";

interface MoodData {
  name: string;
  value: number;
  icon: string;
  color: string;
}

const MoodInsightsCard: React.FC = () => {
  const moodData: MoodData[] = [
    {
      name: "Focused",
      value: 95,
      icon: SereneDumbbell,
      color: "bg-gradient-to-b from-[#FF9A8B] to-[#FF6A6A]",
    },
    {
      name: "Calm",
      value: 75,
      icon: SmilyFace,
      color: "bg-gradient-to-b from-[#B19AFF] to-[#9A7BFF]",
    },
    {
      name: "Tired",
      value: 85,
      icon: SadFace,
      color: "bg-gradient-to-b from-[#C4C4C4] to-[#A8A8A8]",
    },
    {
      name: "Frustrated",
      value: 55,
      icon: SadLightningCharacter,
      color: "bg-gradient-to-b from-[#FF8B94] to-[#FF6B74]",
    },
  ];

  const maxValue = 100;
  const gridLines = [100, 80, 60, 40, 20, 0];

  return (
    <div className="w-full bg-[#ebe7dd] rounded-4xl p-8 shadow-lg">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-semibold text-gray-800 tracking-tight">
          Mood Insights
        </h2>
        <button className="bg-white rounded-full flex items-center justify-center">
          <Image src={ArrowRight} alt="Expand" width={36} height={36} />
        </button>
      </div>

      {/* Focus Message */}
      <div className="text-center mb-3">
        <p className="text-xl font-medium text-gray-800">
          You were focused <span className="font-semibold">80%</span> of the
          time
        </p>
      </div>

      {/* Productivity Badge */}
      <div className="text-center mb-8">
        <p className="text-base text-gray-500">High productivity detected</p>
      </div>

      {/* Chart Container */}
      <div className="relative h-[280px]">
        {/* Grid Lines */}
        <div className="absolute inset-0">
          {gridLines.map((value, index) => (
            <div
              key={value}
              className="absolute w-full border-b border-dashed border-gray-300"
              style={{ top: `${(index * 100) / (gridLines.length - 1)}%` }}
            >
              <span className="absolute -left-2 -top-2 text-sm text-gray-500">
                {value > 0 && value}
              </span>
            </div>
          ))}
          {/* Bottom solid line */}
          <div className="absolute bottom-0 w-full border-b-2 border-gray-400" />
        </div>

        {/* Bars Container */}
        <div className="absolute bottom-0 left-0 right-0 h-full flex justify-around items-end px-5">
          {moodData.map((mood, index) => (
            <div
              key={mood.name}
              className="flex flex-col items-center w-20 relative"
            >
              {/* Emoji Icon */}
              <div
                className="absolute z-10 animate-bounce-subtle"
                style={{
                  bottom: `${(mood.value / maxValue) * 100}%`,
                  marginBottom: "8px",
                }}
              >
                <Image
                  src={mood.icon}
                  alt={mood.name}
                  width={48}
                  height={48}
                  className="drop-shadow-sm"
                />
              </div>

              {/* Bar */}
              <div
                className={`w-[60px] rounded-t-xl transition-all duration-300 ${mood.color}`}
                style={{
                  height: `${(mood.value / maxValue) * 100}%`,
                  background: getBarGradient(mood.name),
                }}
              />

              {/* Label */}
              <p className="mt-3 text-sm font-medium text-gray-700">
                {mood.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Helper function to get bar gradient colors
const getBarGradient = (moodName: string): string => {
  switch (moodName) {
    case "Focused":
      return "linear-gradient(180deg, #FF9A8B 0%, #FF6A6A 100%)";
    case "Calm":
      return "linear-gradient(180deg, #B19AFF 0%, #9A7BFF 100%)";
    case "Tired":
      return "linear-gradient(180deg, #C4C4C4 0%, #A8A8A8 100%)";
    case "Frustrated":
      return "linear-gradient(180deg, #FF8B94 0%, #FF6B74 100%)";
    default:
      return "linear-gradient(180deg, #E0E0E0 0%, #C0C0C0 100%)";
  }
};

export default MoodInsightsCard;

// Add this to your global CSS or Tailwind config for the subtle bounce animation
// @keyframes bounce-subtle {
//   0%, 100% {
//     transform: translateY(0);
//   }
//   50% {
//     transform: translateY(-5px);
//   }
// }
//
// .animate-bounce-subtle {
//   animation: bounce-subtle 3s ease-in-out infinite;
// }
