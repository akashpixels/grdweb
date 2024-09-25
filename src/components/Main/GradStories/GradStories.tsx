/* eslint-disable max-len */
import { getStories } from "api/services/home.apis";
import CardReview from "components/Common/Card/CardReview";
import Heading from "components/Common/Heading/Heading";
import { IStory } from "interface/Server/Home";
import React, { useEffect, useState } from "react";
import Slider from "react-slick";

const GradStories = () => {
  const [showFullCard, setShowFullCard] = useState<boolean>(false);
  const [stories, setStories] = useState<IStory[]>();

  useEffect(() => {
    getStories().then((res) => {
      setStories(res);
    });
  }, []);

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: showFullCard ? 1 : 3,
    slidesToScroll: 4,
    initialSlide: 0,
    arrows: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: showFullCard ? 1 : 2,
          slidesToScroll: showFullCard ? 1 : 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 968,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="pb-20 p-5 lg:p-16 bg-custom-orange rounded-xl shadow-2xl text-custom-primary background-image">
      <div className="lg:mx-20">
        <Heading
          textColor="text-custom-primary"
          borderColor="border-custom-primary"
          text="The Grad Stories"
        />
        <p className="text-center my-6 text-xl">
          Real life chronicles students and professionals who&apos;ve authored their own success
          stories in the UK, Be inspires by their journey from the first chapter to the last.
        </p>
        <div className="slider-container grad-story">
          <Slider {...settings}>
            {stories?.map((item, index) => {
              return (
                <div key={index}>
                  <CardReview
                    cardData={item}
                    setShowFullCard={setShowFullCard}
                    showFullCard={showFullCard}
                  />
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default GradStories;
