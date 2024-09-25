import { BASE_URL } from "api/apis";
import { BlogPost } from "pages/Blog/Blog";
import React from "react";
import { formatDate } from "utils";

const ChildContainer = ({
  blogData,
  onClick,
}: {
  blogData: BlogPost;
  // eslint-disable-next-line no-unused-vars
  onClick: (value: BlogPost) => void;
}) => {
  const { blogTitle, shortDescription, thumbnailImage, publishedDate, writenBY } = blogData;
  return (
    <div className="sm:flex sm:gap-6 items-start flex-1 mb-2" onClick={() => onClick(blogData)}>
      <div className="flex-1 my-4 lg:my-0 lg:mb-1">
        <img src={`${BASE_URL}/${thumbnailImage}`} alt="blog post" className="w-full rounded-2xl" />
      </div>
      <div className="flex-1">
        <p className="text-custom-dark-orange mb-2 font-semibold">
          <small>
            {writenBY} • {formatDate(publishedDate)}
          </small>
        </p>
        <h3 className="font-semibold text-xl mb-2">{blogTitle}</h3>
        <p className="text-gray-500">
          <small>{shortDescription}</small>
        </p>
      </div>
    </div>
  );
};

export default ChildContainer;
