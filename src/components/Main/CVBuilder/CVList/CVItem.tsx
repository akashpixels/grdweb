/* eslint-disable max-len */
/* eslint-disable no-unused-vars */

import React, { useState } from "react";
import { MdOutlineEdit, MdDeleteOutline, MdOutlineAssistant, MdPreview } from "react-icons/md";
// import { IoCloudDownloadOutline } from "react-icons/io5";
// import { getCvById } from "api/services/cvbuilder.apis";
// import { generateGPTPayload } from "utils";
// import { getDataFromDoc } from "api/services/gpt.api";
import Modal from "components/Common/Modal/NormalModel/Modal";
import ConfirmationModal from "components/Common/Modal/ConfirmModel/ConfirmModel";

interface CVItemProps {
  title?: string;
  time?: string;
  builderId?: string | undefined;
  onEdit?: () => void;
  onDelete?: () => void;
  onDownload?: () => void;
  onCreateResume?: () => void;
  onViewCoverLetter?: () => void;
  isDraft?: boolean;
  isFromCoverLetter?: boolean;
}
/* eslint-disable max-lines-per-function */

const CVItem: React.FC<CVItemProps> = ({
  title,
  time,
  isDraft,
  onEdit,
  onDelete,
  // onDownload,
  onCreateResume,
  onViewCoverLetter,
  isFromCoverLetter,
}) => {
  // const [isOpen, setIsOpen] = useState(false);
  const [showATSscore, setShowATSscore] = useState(false);
  // const [loadingATSscore, setloadingATSscore] = useState(false);
  // const [loadingFeedback, setloadingFeedback] = useState(false);
  const [atsDetails, setATSDetails] = useState("");
  const [isModalOpen, setModalOpen] = useState(false);

  // const checkATSScore = async (cv: string | undefined, type?: string | undefined) => {
  //   type == "checkATSscore" ? setloadingATSscore(true) : setloadingFeedback(true);
  //   const cvData = await getCvById(cv ?? "");
  //   try {
  //     const payload = generateGPTPayload(JSON.stringify(cvData), type ?? "");
  //     const suggestion = await getDataFromDoc(payload);
  //     const suggestionData = suggestion.choices[0].message.content;
  //     type == "checkATSscore" ? setloadingATSscore(false) : setloadingFeedback(false);
  //     setATSDetails(suggestionData);
  //     setShowATSscore(true);
  //   } catch (e) {
  //     type == "checkATSscore" ? setloadingATSscore(false) : setloadingFeedback(false);
  //     // console.error(e);
  //   }
  // };

  const handleDeleteCV = () => {
    // Handle account deletion logic here
    onDelete && onDelete();
    setModalOpen(false);
  };

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div className="flex justify-between items-center py-4 border-b rounded-lg ">
      <div>
        <p className="font-semibold text-gray-600">
          {title}
          <span className="px-2 text-sm" style={{ color: "rgb(65 65 48 / 59%)" }}>
            {isDraft ? "(Saved as Draft)" : ""}
          </span>
        </p>
      </div>
      {!isFromCoverLetter && (
        <div>
          <p className="text-gray-500 text-sm">{time}</p>
        </div>
      )}
      <div className="flex space-x-2 text-2xl text-gray-500">
        {/* <button onClick={onDownload} className="p-1">
          <IoCloudDownloadOutline title="Download resume"/>
        </button> */}
        {!isFromCoverLetter && (
          <button onClick={openModal} className="p-1">
            <MdDeleteOutline title="Delete resume" />
          </button>
        )}
        <button onClick={onEdit} className="p-1">
          <MdOutlineEdit title={isFromCoverLetter ? "Edit cover-letter" : "Edit resume"} />
        </button>
        {!isFromCoverLetter && (
          <button onClick={onCreateResume} className="p-1">
            <MdOutlineAssistant title="create cover letter with AI" color="#9c9c14" />
          </button>
        )}
        <button onClick={onViewCoverLetter} className="p-1">
          <MdPreview title="View cover letter" />
        </button>
        {/* {!isFromCoverLetter && (
          <div className="relative no-print">
            <button
              type="button"
              className="h-full text-grey-400 rounded-md flex items-center"
              onClick={() => setIsOpen(!isOpen)}
            >
              <FaChevronDown />
            </button>
            {isOpen && (
              <div
                style={{ zIndex: 1 }}
                className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                <div className="py-1" role="none">
                  <button
                    onClick={() => {
                      checkATSScore(builderId, "checkATSscore");
                    }}
                    className="text-gray-700 w-full text-start block px-4 py-2 text-sm hover:bg-gray-100 font-semibold border-b"
                    role="menuitem"
                  >
                    Check ATS score
                    {loadingATSscore && (
                      <div className="flex justify-center items-center p-2">
                        <FaSpinner className="animate-spin text-2xl" />{" "}
                      </div>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      checkATSScore(builderId, "getFeedBack");
                    }}
                    className="text-gray-700 block px-4 py-2 w-full text-start text-sm hover:bg-gray-100 font-semibold"
                    role="menuitem"
                  >
                    Feedback
                    {loadingFeedback && (
                      <div className="flex justify-center items-center p-2">
                        <FaSpinner className="animate-spin text-2xl" />{" "}
                      </div>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )} */}
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ConfirmationModal
          onConfirm={handleDeleteCV}
          onCancel={closeModal}
          message="<b>Are you sure you want to delete your cv ?</b>"
        />
      </Modal>

      <Modal
        isOpen={showATSscore}
        onClose={() => {
          setShowATSscore(false);
          setATSDetails("");
        }}
        className="w-[90%] md:w-3/5"
      >
        <div
          style={{ overflow: "auto", maxHeight: "42rem" }}
          dangerouslySetInnerHTML={{ __html: atsDetails || "" }}
        ></div>
      </Modal>
    </div>
  );
};

export default CVItem;
