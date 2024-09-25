import React from "react";
import MainContainer from "components/Common/BlogContainer/MainContainer";
import Button from "components/Common/Button/Button";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { BASE_URL } from "api/apis";
import { BlogPost as IBlogProps } from "./Blog";
import { getBlogDetails } from "store/Slices/blog.slice";

const BlogPost = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const blogData = useAppSelector((state) => state.blog.blogData);
  const blogCategoryData = useAppSelector((state) => state.blog.blogSelectedCategoryData);

  /**Send to Blog Details */
  const handleBlogInfo = (value: IBlogProps) => {
    dispatch(getBlogDetails(value));
    navigate(`/blog/${value?.blogTypeID}`);
  };

  return (
    <div className="bg-custom-white p-4 lg:p-16">
      <h1 className="text-3xl md::text-5xl font-semibold mb-2">{blogData?.blogTitle}</h1>
      <p className="text-gray-500 md:text-xl">{blogData?.shortDescription}</p>
      <div className="mb-4 mt-8">
        <img
          src={`${BASE_URL}/${blogData?.thumbnailImage}`}
          alt="BLOG-POST"
          className="w-full rounded-2xl"
        />
      </div>
      <p dangerouslySetInnerHTML={{ __html: blogData?.longDescription || "" }}></p>
      <div className="grid grid-cols-12 gap-8 mt-6 lg:mt-16">
        <div className="col-span-12 md:col-span-6 lg:col-span-4">
          <p className="text-custom-dark-orange mb-2 font-semibold">
            <small>Latest</small>
          </p>
          <h3 className="font-semibold text-2xl mb-2">From the blog</h3>
          <p className="text-gray-500 mb-5 md:text-xl">
            <small>
              Practical advice and insights to enhance your academic and professional life
            </small>
          </p>
          <Button
            className="text-custom-primary"
            bgColor="bg-custom-orange hover:text-custom-white"
            onClick={() => navigate("/blog")}
          >
            View all posts
          </Button>
        </div>
        {blogCategoryData?.map((item, index) => {
          return (
            <div className="col-span-12 md:col-span-6 lg:col-span-4" key={index}>
              <MainContainer blogData={item} onClick={handleBlogInfo} />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BlogPost;
