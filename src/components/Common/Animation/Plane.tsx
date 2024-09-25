/* eslint-disable react/react-in-jsx-scope */
// src/components/PlaneAnimation.tsx
import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import plane from "assets/pngegg.png";

const PlaneAnimation: React.FC = () => {
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      controls.start({ x: scrollY });
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [controls]);

  return (
    <motion.div
      className="absolute top-6 left-0"
      style={{ translateX: "-50%" }}
      animate={controls}
      transition={{ type: "tween", ease: "linear", duration: 0.3 }}
    >
      <img src={plane} alt="Plane" className="w-40 h-auto" />
    </motion.div>
  );
};

export default PlaneAnimation;
