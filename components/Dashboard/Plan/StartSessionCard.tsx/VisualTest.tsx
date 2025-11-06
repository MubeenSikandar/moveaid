import React, { useState, useEffect } from "react";
import Image from "next/image";
import Clock from "@/assets/Clock.svg";
import Muscle from "@/assets/Muscle.svg";
import Mat from "@/assets/Mat.svg";

interface CircularProgressProps {
  completedSessions: number;
  totalSessions: number;
  title?: string;
}

const CircularProgressComponent: React.FC<CircularProgressProps> = ({
  completedSessions,
  totalSessions,
  title = "Test Progress",
}) => {
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
    <div className="flex flex-col items-center justify-center gap-4 w-full h-full">
      <div className="w-full bg-[#ebe7dd] rounded-4xl p-8 shadow-lg">
        <div className="w-full h-full flex items-center justify-between">
          <div className="flex flex-col justify-center gap-10">
            <p className="text-xl font-bold text-black text-left">{title}</p>
            <p className="text-lg text-black font-light text-left">
              Progress: {progressPercentage.toFixed(1)}%
            </p>
            <button className="bg-[#AD85D1] text-white rounded-4xl p-4">
              Test Button
            </button>
            <div className="flex items-center justify-between">
              <button className="flex items-center justify-center bg-[#8b8478] rounded-4xl text-white p-2 gap-2">
                <Image src={Clock} alt="clock" width={12} height={12} />
                <p className="text-xs font-light">12 min</p>
              </button>
              <button className="flex items-center justify-center bg-[#8b8478] rounded-4xl text-white p-2 gap-2">
                <Image src={Muscle} alt="muscle" width={12} height={12} />
                <p className="text-xs font-light">Core Focus</p>
              </button>
              <button className="flex items-center justify-center bg-[#8b8478] rounded-4xl text-white p-2 gap-2">
                <Image src={Mat} alt="mat" width={12} height={12} />
                <p className="text-xs font-light">Mat Only</p>
              </button>
            </div>
          </div>
          <div className="flex items-center justify-center relative">
            <svg
              className="w-48 h-48 transform -rotate-90"
              viewBox="0 0 100 100"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="50"
                cy="50"
                r="40"
                stroke="#e5e7eb"
                strokeWidth="8"
                fill="none"
              />
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
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="text-3xl font-bold text-[#AD85D1]">
                {clampedCompletedSessions}/{safeTotalSessions}
              </div>
              <div className="text-sm text-gray-500">Complete sessions</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const VisualTestPage: React.FC = () => {
  const [animatedProgress, setAnimatedProgress] = useState(0);

  // Test different progress scenarios
  const testCases = [
    { completed: 0, total: 10, title: "0% Progress (0/10)" },
    { completed: 2, total: 10, title: "20% Progress (2/10)" },
    { completed: 5, total: 10, title: "50% Progress (5/10)" },
    { completed: 7, total: 10, title: "70% Progress (7/10)" },
    { completed: 10, total: 10, title: "100% Progress (10/10)" },
    { completed: 0, total: 0, title: "Edge Case: 0/0" },
    { completed: 15, total: 10, title: "Edge Case: Overflow (15/10)" },
  ];

  // Animation test - cycles through different progress values
  useEffect(() => {
    const interval = setInterval(() => {
      setAnimatedProgress((prev) => (prev >= 10 ? 0 : prev + 1));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">
          Circular Progress Component Visual Tests
        </h1>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Static Progress Tests</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {testCases.map((testCase, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow">
                <CircularProgressComponent
                  completedSessions={testCase.completed}
                  totalSessions={testCase.total}
                  title={testCase.title}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Animation Test</h2>
          <div className="bg-white p-4 rounded-lg shadow">
            <CircularProgressComponent
              completedSessions={animatedProgress}
              totalSessions={10}
              title={`Animated Progress (${animatedProgress}/10)`}
            />
          </div>
          <p className="text-center mt-4 text-gray-600">
            This component automatically cycles through progress values to test
            animation smoothness
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">
            Text Centering & Alignment Tests
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-4 rounded-lg shadow">
              <CircularProgressComponent
                completedSessions={1}
                totalSessions={9}
                title="Single Digit (1/9)"
              />
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <CircularProgressComponent
                completedSessions={99}
                totalSessions={100}
                title="Double Digits (99/100)"
              />
            </div>
            <div className="bg-white p-4 rounded-lg shadow">
              <CircularProgressComponent
                completedSessions={999}
                totalSessions={1000}
                title="Triple Digits (999/1000)"
              />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-2xl font-semibold mb-4">
            Visual Verification Checklist
          </h2>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="circle-size" />
              <label htmlFor="circle-size">
                Circle has correct 192px (w-48 h-48) diameter
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="background-color" />
              <label htmlFor="background-color">
                Background circle uses gray color (#e5e7eb)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="progress-color" />
              <label htmlFor="progress-color">
                Progress arc uses brand color (#AD85D1)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="stroke-width" />
              <label htmlFor="stroke-width">
                Both circles have 8px stroke width
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="rounded-caps" />
              <label htmlFor="rounded-caps">
                Progress arc has rounded line caps
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="text-centered" />
              <label htmlFor="text-centered">
                Progress text is perfectly centered
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="font-sizes" />
              <label htmlFor="font-sizes">
                Fraction uses 3xl font, label uses sm font
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="animation-smooth" />
              <label htmlFor="animation-smooth">
                Animation transitions are smooth (500ms ease-out)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="progress-starts-top" />
              <label htmlFor="progress-starts-top">
                Progress arc starts from top (12 o&apos;clock position)
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="edge-cases" />
              <label htmlFor="edge-cases">
                Edge cases handled properly (0/0, overflow, etc.)
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisualTestPage;
