import React from "react";

interface SliderInputProps {
  value: number;
  onChange: (value: number) => void;
  min: number;
  max: number;
  step?: number;
  labels?: string[];
  color?: string;
}

const SliderInput: React.FC<SliderInputProps> = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  labels = [],
  color = "blue",
}) => {
  const getColorClasses = () => {
    switch (color) {
      case "red":
        return "from-red-400 to-red-600";
      case "green":
        return "from-green-400 to-green-600";
      case "yellow":
        return "from-yellow-400 to-yellow-600";
      default:
        return "from-blue-400 to-blue-600";
    }
  };

  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${percentage}%, #e5e7eb ${percentage}%, #e5e7eb 100%)`,
          }}
        />
        <div className="flex justify-between mt-2">
          {labels.length > 0 ? (
            labels.map((label, index) => (
              <span
                key={index}
                className="text-sm text-gray-600"
                style={{
                  left: `${(index / (labels.length - 1)) * 100}%`,
                }}
              >
                {label}
              </span>
            ))
          ) : (
            <>
              <span className="text-sm text-gray-600">{min}</span>
              <span className="text-sm text-gray-600">{max}</span>
            </>
          )}
        </div>
      </div>
      <div className="text-center">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
      </div>
    </div>
  );
};

export default SliderInput;
