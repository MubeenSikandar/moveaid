import Image from "next/image";
import React from "react";
import SmarterCoachingBuiltInImage from "@/assets/SmarterCoachingBuiltIn.svg";

const SmarterCoachingBuiltIn = () => {
  return (
    <div className="flex justify-between w-full items-center px-[17%] py-20">
      <div className="flex items-center justify-center w-[50%]">
        <Image
          src={SmarterCoachingBuiltInImage}
          alt="your body your plan"
          width={643}
          height={570}
        />
      </div>
      <div className="flex flex-col gap-3 w-[50%]">
        <div className="flex items-center justify-center bg-[#DDE041] rounded-4xl p-2 w-[80px] h-[41px]">
          <p className="text-sm text-black">Intuitive</p>
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-3xl font-bold text-black">
            Smarter coaching, built-in.
          </p>
          <p className="text-md text-black font-light text-left w-[90%]">
            Our AI-powered assistant analyzes your patterns, tracks how you
            move, and gives real-time coaching to keep you on track — whether
            you’re powering through, easing in, or adjusting on the fly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SmarterCoachingBuiltIn;
