import { BASE_URL } from "api/apis";
import { BlogPost } from "pages/Blog/Blog";
import React from "react";

export interface IBlogJson {
  blogData: BlogPost;
  // eslint-disable-next-line no-unused-vars
  onClick: (value: BlogPost) => void;
}

const MainContainer = ({ blogData, onClick }: IBlogJson) => {
  const { thumbnailImage, shortDescription, blogTitle } = blogData;
  return (
    <div className="p-5 shadow-lg rounded-lg bg-gray-100" onClick={() => onClick(blogData)}>
      <div className="mb-4">
        <img src={`${BASE_URL}/${thumbnailImage}`} alt="blog image" className="w-full" />
      </div>
      <h3 className="font-semibold text-xl mb-2">{blogTitle}</h3>
      <p className="text-custom-dark-orange mb-2 font-semibold">
        <small>{shortDescription}</small>
      </p>
      <p className="text-gray-400">Read more...</p>
    </div>
  );
};

export default MainContainer;
