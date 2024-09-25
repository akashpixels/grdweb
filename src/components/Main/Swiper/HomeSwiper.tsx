/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import { BASE_URL } from "api/apis";
import { IBanner } from "interface/Server/Home";
import { FaSpinner } from "react-icons/fa";

interface IHomeSwipeProps {
  bannerData: IBanner[];
}

const HomeSwiper = ({ bannerData }: IHomeSwipeProps) => {
  const [isMobile, setIsMobile] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth < 768);
  };

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: !isMobile,
  };

  return (
    <div className="relative slider-container">
      {bannerData.length ? (
        <Slider {...settings}>
          {bannerData?.map((slide, index: number) => {
            const { title, description, bannerImage, screenName } = slide;
            return (
              <div
                className="flex items-center text-start main-slider flex-col md:flex-row"
                key={index}
              >
                <div className=" p-4">
                  <h2 className="text-4xl font-bold mb-5">{title}</h2>
                  <p className="text-xl">{description}</p>
                </div>
                <div className=" md:mr-2 flex justify-end items-center p-2 md-p-0">
                  <img src={`${BASE_URL}/${bannerImage}`} alt={screenName} />
                </div>
              </div>
            );
          })}
        </Slider>
      ) : (
        <div className="flex justify-center items-center">
          <FaSpinner className="animate-spin text-2xl" />{" "}
        </div>
      )}
    </div>
  );
};

export default HomeSwiper;
