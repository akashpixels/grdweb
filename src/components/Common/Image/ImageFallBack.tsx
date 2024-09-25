import React, { useState } from "react";
import cvbuilder from "assets/plane (1).png";

const ImageWithFallback = ({
  src,
  alt,
  classValue,
}: {
  src: string;
  alt: string;
  classValue: string;
}) => {
  const [imgSrc, setImgSrc] = useState(false);

  return (
    <>
      <img
        src={!imgSrc ? src : cvbuilder}
        alt={alt}
        onError={() => setImgSrc(true)}
        className={classValue}
      />
    </>
  );
};

export default ImageWithFallback;
