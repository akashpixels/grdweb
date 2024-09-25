import React from "react";
import { GrExpand } from "react-icons/gr";
import { FaCompressAlt } from "react-icons/fa";
import { BASE_URL } from "api/apis";

interface ICardData {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cardData: any;
  setShowFullCard: React.Dispatch<React.SetStateAction<boolean>>;
  showFullCard: boolean;
}
const CardReview = ({ cardData, setShowFullCard, showFullCard }: ICardData) => {
  const { userTitle, description, userPhoto } = cardData;

  return (
    <div className="p-4 md:p-8">
      <div className="text-custom-white bg-custom-primary p-8 rounded-3xl shadow-xl">
        <div className="flex justify-between gap-16 mb-10">
          <p>
            {description?.slice(0, 200)}
            {description?.length > 200 ? "..." : ""}
          </p>
          <span
            className="cursor-pointer hidden lg:flex"
            onClick={() => setShowFullCard(!showFullCard)}
          >
            {!showFullCard ? <GrExpand /> : <FaCompressAlt />}
          </span>
        </div>

        <div className="flex items-center gap-5 ">
          <img src={`${BASE_URL}/${userPhoto}`} alt="review-man" width={60} />
          <div>
            <h3 className="text-2xl font-medium text-white">{userTitle}</h3>
            <p>{""}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardReview;
