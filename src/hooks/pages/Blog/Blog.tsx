/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-len */
import { getSpecificCategoryList } from "api/services/blog.apis";
import ChildContainer from "components/Common/BlogContainer/ChildContainer";
import MainContainer from "components/Common/BlogContainer/MainContainer";
import TitleSection from "components/Common/PageTitle/TitleSection";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllBlogs } from "store/Slices/api.slice";
import { getBlogDetails } from "store/Slices/blog.slice";

export interface BlogPost {
  blogID: string;
  blogTypeID: string;
  bio: string | null;
  userID: string;
  blogTitle: string;
  shortDescription: string;
  longDescription: string;
  thumbnailImage: string;
  writenBY: string;
  isPublished: boolean;
  publishedDate: string;
  blogComments: any | null;
}

const Blog = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const blogCategoryData = useAppSelector((state) => state.blog.blogSelectedCategoryData);
  const blogCategory = useAppSelector((state) => state.blog.blogSelectedCategory);
  const addBlogs = useAppSelector((state) => state.api.addBlogs);

  const handleBlogInfo = (value: BlogPost) => {
    dispatch(getBlogDetails(value));
    navigate(`/blog/${value?.blogTypeID}`);
  };

  useEffect(() => {
    if (!addBlogs.length) {
      getSpecificCategoryList().then((res) => {
        dispatch(getAllBlogs(res));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  return (
    <div className="bg-custom-white px-8 lg:px-20">
      <div className="text-center  md:px-16 lg:pt-8 pb-8  title-section-background-img">
        <TitleSection
          subTitle="Our blogs"
          title={blogCategory?.blogTypeName || ""}
          description={blogCategory?.blogTypeDescription || ""}
        />
      </div>
      {blogCategoryData?.length ?? addBlogs?.length ? (
        <>
          <div className="col-span-12 lg:col-span-6 flex flex-col mb-6">
            {blogCategoryData?.map((item, index) => (
              <ChildContainer blogData={item} key={index} onClick={handleBlogInfo} />
            ))}
          </div>

          <h3 className="font-semibold mb-6 text-xl">All blog posts</h3>
          <div className="grid grid-cols-12 gap-6 pb-8 lg:pb-16">
            {addBlogs?.map((item, index) => {
              return (
                <div className="col-span-12 md:col-span-6 lg:col-span-4" key={index}>
                  <MainContainer blogData={item} onClick={handleBlogInfo} />
                </div>
              );
            })}
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center pb-20 text-xl font-medium">
          No blogs found
        </div>
      )}
    </div>
  );
};

export default Blog;

{
  /* <h3 className="font-semibold mb-6 text-xl">Recent blog posts</h3> */
}
{
  /* <div className="grid grid-cols-12 gap-6 pb-8 lg:pb-16">
        <div className="col-span-12 lg:col-span-6">
          <MainContainer blogData={blogMainPosts.mainContainer[0]} />
        </div>
        <div className="col-span-12 lg:col-span-6 flex flex-col">
          {blogMainPosts.subContainer.map((item, index) => (
            <ChildContainer blogData={item} key={index} />
          ))}
        </div>
      </div> */
}
