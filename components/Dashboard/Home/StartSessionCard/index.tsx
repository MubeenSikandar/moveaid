import React from "react";
import Clock from "@/assets/Clock.svg";
import Muscle from "@/assets/Muscle.svg";
import Mat from "@/assets/Mat.svg";
import DashboardHome from "@/assets/DashBoardHome.svg";
import Image from "next/image";

const StartSessionCard = () => {
  return (
    <div className="w-full h-full flex items-center justify-center bg-[#ebe7dd] rounded-4xl p-10 relative">
      <div className="w-full h-full flex items-center justify-between">
        <div className="flex flex-col justify-center gap-10">
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
        <div className="flex items-center justify-center"></div>
      </div>
      <Image
        src={DashboardHome}
        alt="dashboard-home"
        width={443.9354335579325}
        height={443.9354335579325}
        className="absolute right-[-100px] top-[-90px]"
      />
    </div>
  );
};

export default StartSessionCard;
