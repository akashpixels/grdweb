/* eslint-disable @typescript-eslint/no-explicit-any */
import { BASE_URL } from "api/apis";
import React from "react";
import Slider from "react-slick";

interface IBrandProps {
  partnerList: any;
}

const Brands = ({ partnerList }: IBrandProps) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <>
      <p className="font-bold">Companies featured on our platform</p>
      <div>
        <div className="my-4 slider-container">
          <Slider {...settings}>
            {partnerList?.map((item: any, index: number) => (
              <div className="flex justify-center items-center w-full main-slider" key={index}>
                <img src={`${BASE_URL}/${item.logo}`} alt="auti" width={100} />
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  );
};

export default Brands;
