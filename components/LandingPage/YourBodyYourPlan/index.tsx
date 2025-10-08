import Image from "next/image";
import React from "react";
import YourBodyYourPlanImage from "@/assets/YourBodyYourPlanImage.svg";

const YourBodyYourPlan = () => {
  return (
    <div className="flex justify-between w-full items-center px-[20%] py-20">
      <div className="flex flex-col gap-3 w-[50%]">
        <div className="flex items-center justify-center bg-[#DDE041] rounded-4xl p-2 w-[80px] h-[41px]">
          <p className="text-sm text-black">Adaptive</p>
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-3xl font-bold text-black">Your Body, Your Plan</p>
          <p className="text-md text-black font-light text-left w-[90%]">
            No two bodies move the same — that’s why MoveAid tailors each
            session to your goals, mobility, and pace. Whether you&apos;re
            easing back from injury or building a daily habit, we’ll guide you
            step by step with support that adapts as you grow.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center w-[50%]">
        <Image
          src={YourBodyYourPlanImage}
          alt="your body your plan"
          width={751.4}
          height={612}
        />
      </div>
    </div>
  );
};

export default YourBodyYourPlan;
