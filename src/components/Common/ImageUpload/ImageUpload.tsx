/* eslint-disable max-len */
import { BASE_URL } from "api/apis";
import React, { useEffect, useState } from "react";

interface ImageUploadProps {
  // eslint-disable-next-line no-unused-vars
  onImageChange: (file: File) => void;
  srcImage?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageChange, srcImage }) => {
  const [image, setImage] = useState<string | ArrayBuffer | null>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        onImageChange(file);
      };
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    srcImage && setImage(`${BASE_URL}/${srcImage}`);
  }, [srcImage]);

  return (
    <div className="relative w-24 h-24 border-4 rounded-full border-gray-300">
      <div className="w-full h-full rounded-full overflow-hidden shadow-md">
        {image ? (
          <img src={image as string} alt="Profile" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
            No Image
          </div>
        )}
      </div>
      <label
        htmlFor="imageUpload"
        className="absolute bottom-0 right-0 w-8 h-8 bg-yellow-500 text-white flex items-center justify-center rounded-full cursor-pointer shadow-md"
      >
        <span className="text-lg font-bold">+</span>
        <input
          type="file"
          id="imageUpload"
          accept="image/*"
          className="hidden"
          onChange={handleImageChange}
        />
      </label>
    </div>
  );
};

export default ImageUpload;
