import Image from "next/image";
import React from "react";
import TrackWhatMattersMostImage from "@/assets/TrackWhatMattersMost.svg";

const TrackWhatMattersMost = () => {
  return (
    <div className="flex justify-between w-full items-center px-[18%] py-20">
      <div className="flex flex-col gap-3 w-[50%]">
        <div className="flex items-center justify-center bg-[#DDE041] rounded-4xl p-2 w-[80px] h-[41px]">
          <p className="text-sm text-black">Measure</p>
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-3xl font-bold text-black">
            Track What Matters Most
          </p>
          <p className="text-md text-black font-light text-left w-[90%]">
            See how your posture, mobility, and consistency improve over time.
            MoveAid helps you stay accountable with gentle insights, encouraging
            progress — not pressure.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center w-[50%]">
        <Image
          src={TrackWhatMattersMostImage}
          alt="your body your plan"
          width={751.4}
          height={612}
        />
      </div>
    </div>
  );
};

export default TrackWhatMattersMost;
