import React from "react";

interface QuestionCardProps {
  question: string;
  children: React.ReactNode;
  required?: boolean;
  description?: string;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
  question,
  children,
  required = false,
  description,
}) => {
  return (
    <div className="mb-8">
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          {question}
          {required && <span className="text-red-500 ml-1">*</span>}
        </h3>
        {description && <p className="text-gray-600 text-sm">{description}</p>}
      </div>
      <div className="space-y-3">{children}</div>
    </div>
  );
};

export default QuestionCard;
