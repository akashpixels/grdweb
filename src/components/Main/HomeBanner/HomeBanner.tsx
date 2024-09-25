/* eslint-disable max-len */
import React, { useEffect, useState } from "react";
import Brands from "components/Main/Brands/Brands";
import Button from "components/Common/Button/Button";
import HomeSwiper from "components/Main/Swiper/HomeSwiper";
import { motion } from "framer-motion";
import { fadeIn } from "utils/variant";
import { getBannerDetails, getPartnerDetails } from "../../../api/services/home.apis";
import { useDispatch } from "react-redux";
import { getBannerData, getPartnerData } from "store/Slices/api.slice";
import { useAppSelector } from "hooks/reduxHooks";
const HomeBanner = () => {
  const dispatch = useDispatch();

  const bannerData = useAppSelector((state) => state.api.homeBannerData);
  const partnerList = useAppSelector((state) => state.api.partnerData);
  const [showBackground, setShowBackground] = useState(false);

  const handleScroll = () => {
    const section = document.getElementById("#ourservices");
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    if (!bannerData.length) {
      getBannerDetails().then((res) => {
        dispatch(getBannerData(res));
      });
    }
    if (!partnerList.length) {
      getPartnerDetails().then((res) => {
        dispatch(getPartnerData(res));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBackground(true);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`text-center p-8 text-custom-primary bg-custom-secondary rounded-b-2xl shadow-2xl ${
        showBackground ? "welcome-section-background-image" : ""
      }`}
    >
      <motion.h1
        variants={fadeIn("left", 0.2)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="text-4xl md:text-5xl font-bold py-5"
      >
        Write Your Success Story with Confidence
      </motion.h1>
      <motion.p
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="pb-6 font-medium text-xl"
      >
        Every story of success begins with a single chapter—start yours today with TheGradStory.
      </motion.p>
      <Button className="text-white hover:text-custom-primary" onClick={handleScroll}>
        Start Your Chapter Today
      </Button>
      <div className="lg:mx-20 p-6 rounded-2xl my-14 mt-20 bg-custom-subSecondary">
        <HomeSwiper bannerData={bannerData} />
      </div>
      <Brands partnerList={partnerList} />
    </div>
  );
};

export default HomeBanner;
