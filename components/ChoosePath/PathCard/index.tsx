import Image from "next/image";
import React from "react";
import NextIcon from "@/assets/NextIcon.svg";

interface PathCardProps {
  imagePath: string;
  text: string;
  width: number;
  height: number;
  className: string;
  onClick?: () => void;
}

const PathCard = ({
  text,
  imagePath,
  width,
  height,
  className,
  onClick,
}: PathCardProps) => {
  return (
    <div
      className="flex flex-col gap-4 items-center justify-center py-8 border-2 border-transparent rounded-2xl hover:border-gray-300 transition-all duration-300 cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-center bg-white rounded-4xl p-4">
        <p className="text-md italic">{text}</p>
      </div>
      <div className="flex items-center justify-center gap-2">
        <Image
          src={imagePath}
          alt="path"
          width={width}
          height={height}
          className={className}
        />
        <Image src={NextIcon} alt="path" width={24} height={24} />
      </div>
    </div>
  );
};

export default PathCard;
