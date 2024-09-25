/* eslint-disable max-len */
import React from "react";
import { useNavigate } from "react-router-dom";

interface CVTemplateCardProps {
  id: string;
  title: string;
  imageUrl: string;
  // eslint-disable-next-line no-unused-vars
  selectedTemplate: (value: string) => void;
}

const CVTemplateCard: React.FC<CVTemplateCardProps> = ({
  title,
  imageUrl,
  selectedTemplate,
  id,
}) => {
  const navigate = useNavigate();
  const handleSelectResumeTemplate = (value: string) => {
    selectedTemplate(value);
    navigate("/dashboard/cv-builder/your-details");
  };

  return (
    <div className="py-4 px-2 rounded cursor-pointer">
      <div className="relative overflow-hidden rounded-md group">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-auto transform transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-custom-white bg-opacity-0 transition-opacity duration-300 group-hover:bg-opacity-50 group-hover:backdrop-blur-sm flex justify-center items-center">
          <button
            className="px-4 py-2 text-white bg-custom-secondary rounded-md transition duration-300 opacity-0 group-hover:opacity-100"
            onClick={() => handleSelectResumeTemplate(id)}
          >
            Create Resume
          </button>
        </div>
      </div>
      <h3 className="mt-2 text-lg font-semibold mb-2">{title}</h3>
    </div>
  );
};

export default CVTemplateCard;
