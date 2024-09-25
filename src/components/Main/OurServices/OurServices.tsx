/* eslint-disable max-len */
import Heading from "components/Common/Heading/Heading";
import React, { useState } from "react";
import Card from "components/Common/Card/Card";
import { ourServices } from "Json/chapter";
import SponsoredJobs from "components/Common/SponsoredJobs/SponsoredJobs";
import { useAppDispatch } from "hooks/reduxHooks";
import { handleSubscribeModel } from "store/Slices/modal.slice";
import { useNavigate } from "react-router-dom";
import Modal from "components/Common/Modal/NormalModel/Modal";
import { FaHandshake } from "react-icons/fa6";
import { getUserIsSubscribe } from "api/services/localServices.service";

const OurServices = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isSubscribe } = getUserIsSubscribe();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleServiceClick = (index: number, url: string) => {
    if (index === ourServices.length - 1) {
      // Open modal for the last item
      setIsModalOpen(true);
      navigate(url);
    } else if (isSubscribe) {
      navigate(url);
    } else if (!isSubscribe) {
      dispatch(handleSubscribeModel(true));
    }
  };

  const closeModal = () => setIsModalOpen(false);

  return (
    <div>
      <div
        className="p-10 bg-custom-white rounded-xl shadow-2xl text-custom-primary background-image mb-20"
        id="#ourservices"
      >
        <div className="lg:mx-12 xl:mx-20">
          <Heading
            textColor="text-custom-primary"
            borderColor="border-custom-primary"
            text="Our Services"
          />
          <p className="text-center my-6 text-xl">
            Unlock your potential with services designed to help you achieve career success
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {ourServices.map((item, index) => {
              const { title, description, buttonText, img, borderColor, navigate } = item;
              return (
                <Card
                  key={index}
                  img={img}
                  onClick={() => handleServiceClick(index, navigate)}
                  title={title}
                  description={description}
                  buttonText={buttonText}
                  borderColor={borderColor}
                  navigate={navigate}
                />
              );
            })}
          </div>
          <SponsoredJobs />
        </div>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <div className="flex flex-col items-center text-center">
            <FaHandshake className="inline-block mr-2 text-yellow-500 text-6xl mb-2" />
            <div className="text-2xl font-bold mb-4">Great Connections Await You!</div>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default OurServices;
