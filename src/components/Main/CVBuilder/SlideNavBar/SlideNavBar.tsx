/* eslint-disable max-len */
import React, { useEffect, useState } from "react";
import LogoShort from "assets/logo_short.svg";
import { FileIcon } from "components/Common/Icons/Icon"; // Ensure these icons are imported correctly
import Tooltip from "components/Common/Tooltip/Tooltip";
import { Link, useNavigate } from "react-router-dom";
import { FaRegUserCircle } from "react-icons/fa";
import { showToast } from "utils/toastUtils";
import { getUserIsSubscribe } from "api/services/localServices.service";
import { IoMdLogOut } from "react-icons/io";
import { SlEnvolopeLetter } from "react-icons/sl";
import { PiSuitcase } from "react-icons/pi";
import ConfirmationModal from "components/Common/Modal/ConfirmModel/ConfirmModel";
import Modal from "components/Common/Modal/NormalModel/Modal";

const Sidebar: React.FC = () => {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);
  const { isSubscribe } = getUserIsSubscribe();
  const [isModalOpen, setModalOpen] = useState(false);

  const getPagePath = (value: string) => {
    return value.split("/")[2]; // Adjusted to get the correct segment
  };

  useEffect(() => {
    const value = getPagePath(window.location.pathname);
    setSelected(value);
  }, []);

  const handleSelect = (item: string) => {
    switch (item) {
      case "cv-builder":
        if (isSubscribe) {
          navigate("/dashboard/cv-builder");
        } else {
          navigate("/dashboard/profile/subscription-plan");
          showToast("error", "Activate your subscription to use CV Builder");
        }
        break;
      case "jobs-internships":
        if (isSubscribe) {
          navigate("/dashboard/jobs-internships");
        } else {
          navigate("/dashboard/profile/subscription-plan");
          showToast("error", "Activate your subscription to use jobs and internships");
        }
        break;
      case "profile":
        navigate("/dashboard/profile");
        break;
      case "counselling":
        navigate("/dashboard/counselling");
        break;
      case "networking":
        navigate("/dashboard/networking/upcoming");
        break;
      case "cover-letter":
        if (isSubscribe) {
          navigate("/dashboard/create-cover-letter");
        } else {
          navigate("/dashboard/profile/subscription-plan");
          showToast("error", "Activate your subscription to use cover letter builder");
        }
        break;
      default:
        break;
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleLogout = () => {
    setModalOpen(false);
    navigate("/logout");
  };
  return (
    <aside className="shadow-xl bg-white w-20 h-full flex flex-col items-center py-4 space-y-4 rounded-2xl p-4 no-print">
      <Link to="/">
        <img src={LogoShort} alt="logo" className="mb-3" />
      </Link>

      <p
        className={`p-3 rounded-lg cursor-pointer border ${
          selected === "profile"
            ? "border-custom-dark-orange bg-custom-subSecondary"
            : "border-transparent"
        }`}
        onClick={() => handleSelect("profile")}
      >
        <Tooltip message="profile" isShow={true}>
          <FaRegUserCircle className="text-2xl" />
        </Tooltip>
      </p>
      <p
        className={`p-4 rounded-lg cursor-pointer border ${
          selected === "jobs-internships"
            ? "border-custom-dark-orange bg-custom-subSecondary"
            : "border-transparent"
        }`}
        onClick={() => handleSelect("jobs-internships")}
      >
        <Tooltip message="Jobs and Internships" isShow={true}>
          <PiSuitcase className="text-2xl" />
        </Tooltip>
      </p>

      <p
        className={`p-4 rounded-lg cursor-pointer border ${
          selected === "cv-builder"
            ? "border-custom-dark-orange bg-custom-subSecondary"
            : "border-transparent"
        }`}
        onClick={() => handleSelect("cv-builder")}
      >
        <Tooltip message="CV Builder" isShow={true}>
          <FileIcon />
        </Tooltip>
      </p>

      <p
        className={`p-4 rounded-lg cursor-pointer border ${
          selected === "create-cover-letter"
            ? "border-custom-dark-orange bg-custom-subSecondary"
            : "border-transparent"
        }`}
        onClick={() => handleSelect("cover-letter")}
      >
        <Tooltip message="Cover letter" isShow={true}>
          <SlEnvolopeLetter className="text-2xl" />
        </Tooltip>
      </p>

      <p
        className={`p-4 text2xl rounded-lg cursor-pointer border ${
          selected === ""
            ? "border-custom-dark-orange bg-custom-subSecondary"
            : "border-transparent"
        }`}
        onClick={() => setModalOpen(true)}
      >
        <Tooltip message="Logout" isShow={true}>
          <IoMdLogOut className="text-2xl" />
        </Tooltip>
      </p>

      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ConfirmationModal
          onConfirm={handleLogout}
          onCancel={closeModal}
          message="<b>Are you sure you want to Logout your account?</b>"
        />
      </Modal>
    </aside>
  );
};

export default Sidebar;
