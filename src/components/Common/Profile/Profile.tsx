import React, { useState } from "react";
// import { SiTesla } from "react-icons/si";
// import { FaLinkedin } from "react-icons/fa";
// import { IoEarthOutline } from "react-icons/io5";
// import { Link } from "react-router-dom";
import { BASE_URL } from "api/apis";

interface IProfile {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  profileData: any;
}

const Profile = ({ profileData }: IProfile) => {
  const { profileImage, designation, name } = profileData;

  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  const imageStyle: React.CSSProperties = {
    width: "100px", // standard width
    height: "100px", // standard height
    borderRadius: "50%", // crop into a circle
    objectFit: "cover", // cover the container while maintaining aspect ratio
    transition: "transform 0.3s, filter 0.3s",
    transform: isHovered ? "scale(1.2)" : "scale(1)",
    filter: isHovered ? "blur(0px)" : "none",
  };

  return (
    <div className="col-span-6 md:col-span-4 lg:col-span-3">
      <div className="flex justify-center mb-5">
        <img
          src={`${BASE_URL}/${profileImage}`}
          alt="avatar"
          style={imageStyle}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
      </div>
      <div>
        <p className="font-bold text-custom-secondary mb-1">{name}</p>
        <p className="text-[#d97338]">{designation}</p>
        {/* <div className="flex gap-6 justify-center mt-4 cursor-pointer">
          <Link to={socialMediaLink1}>
            <SiTesla />
          </Link>
          <Link to={socialMediaLink2}>
            <FaLinkedin />
          </Link>
          <Link to={socialMediaLink3}>
            <IoEarthOutline />
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default Profile;
