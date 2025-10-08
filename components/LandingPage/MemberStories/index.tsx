import React from "react";

const MemberStories = () => {
  return (
    <div className="flex flex-col gap-4 items-center justify-center py-8">
      <div className="flex items-center justify-center bg-[#EFEAE6] rounded-4xl p-4">
        <p className="text-md italic">Member Stories</p>
      </div>
      <p className="text-5xl font-bold text-black text-center">
        From pain to possibility
      </p>
      <p className="text-md text-black font-light text-center w-[60%]">
        Hear from members who’ve reclaimed their lives with MoveAid — reducing
        pain, avoiding surgeries, and getting back to what matters most.
      </p>
    </div>
  );
};

export default MemberStories;
