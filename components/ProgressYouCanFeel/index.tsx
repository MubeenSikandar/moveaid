import Image from "next/image";
import React from "react";
import ProgressYouCanFeelImage from "@/assets/ProgressYouCanFeel.svg";

const ProgressYouCanFeel = () => {
  return (
    <div className="flex justify-center gap-16 w-full items-center px-[17%] py-20">
      <div className="flex items-center justify-center flex-1">
        <Image
          src={ProgressYouCanFeelImage}
          alt="your body your plan"
          width={640.98}
          height={619}
        />
      </div>
      <div className="flex flex-col gap-3 flex-1">
        <div className="flex items-center justify-center bg-[#DDE041] rounded-4xl p-2 w-fit text-nowrap">
          <p className="text-sm text-black">Visible Change</p>
        </div>
        <div className="flex flex-col gap-5">
          <p className="text-3xl font-bold text-black">
            Progress you can feel.
          </p>
          <p className="text-md text-black font-light text-left w-[90%]">
            MoveAid tracks subtle improvements in your posture, balance, and
            control — giving you visible feedback that builds confidence.
            Whether it’s a straighter back, deeper stretch, or more consistent
            pace, you’ll get insight that shows how far you’ve come — and what
            to focus on next.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProgressYouCanFeel;
