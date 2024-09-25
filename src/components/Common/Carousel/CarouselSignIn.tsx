import React from "react";
import Slider from "react-slick";
import Star from "../../../assets/Star.png";
import LeftArrow from "../../../assets/LeftArrow.png";
import RightArrow from "../../../assets/RightArrow.png";

const CarouselSignIn = () => {
  
  const caouseldata = [
    {
      heading: "Untitled has saved us thousands of hours of work. thousands of hours",
      subheading: "250k",
      name: "Lula Meyers",
      location: "Product Manager, Hourglass",
      business: "Web Design Agency",
    },
    {
      heading: "Untitled has saved us thousands of hours of work. ",
      subheading: "250k",
      name: "Lula Meyers1",
      location: "Product Manager, Hourglass",
      business: "Web Design Agency",
    },
    {
      heading: "Untitled has saved us thousands of hours of work. ",
      subheading: "250k",
      name: "Lula Meyers2",
      location: "Product Manager, Hourglass",
      business: "Web Design Agency",
    },
    {
      heading: "Untitled has saved us thousands of hours of work. ",
      subheading: "250k",
      name: "Lula Meyers3",
      location: "Product Manager, Hourglass",
      business: "Web Design Agency",
    },
  ];
  const settings = {
    infinite: true,
    speed: 500,
    arrows: false,
  };
  return (
    <Slider {...settings} className="absolute inset-x-0 bottom-0 h-80 bg-white 
    bg-opacity-30 z-0 text-white blurry-background backdrop-blur-sm">
      {caouseldata.map((item, index) => (
        <div key={index}>
          <div className="" >
            <h1 className="font-bold text-left p-6 text-4xl" >“{item.heading}”</h1>
            <div className="grid grid-cols-12 p-10">
              <div className=" md:col-span-6 text-left">
                <h1 className="font-bold text-3xl">{item.name}</h1>
                <p className="font-bold ">{item.location}</p>
                <p className="text-base	">{item.business}</p>
              </div>
              <div className="md:col-span-6 ">
                <div className="flex justify-end gap-2">
                  <img src={Star} alt="Star" />
                  <img src={Star} alt="Star" />
                  <img src={Star} alt="Star" />
                  <img src={Star} alt="Star" />
                  <img src={Star} alt="Star" />
                </div>
                <div className="flex justify-end gap-6 pt-4">
                  <img src={LeftArrow} alt="Previous" />
                  <img src={RightArrow} alt="Next" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default CarouselSignIn;