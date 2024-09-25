/* eslint-disable max-len */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { getBlogCategoriesList, getSpecificCategoryList } from "api/services/blog.apis";
import { useAppDispatch, useAppSelector } from "hooks/reduxHooks";
import { getBlogCategories, getBlogSelectedCategoryData } from "store/Slices/blog.slice";
import { IBlogCategoriesList } from "interface/Server/Blog";
import { getAllBlogs } from "store/Slices/api.slice";
import { BASE_URL } from "api/apis";

export interface IBlogDropdown {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setBlogDropdown: React.Dispatch<React.SetStateAction<boolean>>;
}

const BlogDropdown = ({ setBlogDropdown, setIsOpen }: IBlogDropdown) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const blogCategories = useAppSelector((state) => state.blog.blogCategories);
  const addBlogs = useAppSelector((state) => state.api.addBlogs);

  useEffect(() => {
    if (!blogCategories?.length) {
      getBlogCategoriesList().then((res) => {
        dispatch(getBlogCategories(res));
      });
    }
    /** Get all blog posts */
    if (!addBlogs.length) {
      getSpecificCategoryList().then((res) => {
        dispatch(getAllBlogs(res));
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleClicks = (value: IBlogCategoriesList) => {
    getSpecificCategoryList(value?.blogTypeID).then((res) => {
      dispatch(getBlogSelectedCategoryData({ value: value, response: res }));
    });

    setBlogDropdown(false);
    setIsOpen(false);
    navigate("/blog");
  };

  return (
    <div
      className="lg:w-max lg:absolute top-12 text-gray-900 left-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none "
      role="menu"
      aria-orientation="vertical"
      aria-labelledby="menu-button"
    >
      <div className="flex gap-2lg:gap-10 flex-col lg:flex-row">
        <div className="p-4" role="none">
          <p className="px-4 py-2 text-[13px]">Explore Topic</p>
          {blogCategories?.map((item, index: number) => (
            <button
              key={index}
              className="text-gray-500 block px-4 py-2 text-[15px] hover:text-blue-400"
              onClick={() => {
                handleClicks(item);
              }}
              role="menuitem"
              id={`menu-item-${item.blogTypeID}`}
            >
              {item.blogTypeName}
            </button>
          ))}
        </div>
        <div className="bg-gray-200 lg:w-96 p-4 flex flex-col">
          <div className="flex-1">
            <p className="px-4 py-2 text-[13px]">Latest blog posts</p>

            {addBlogs?.map((blogData, index) => {
              const { thumbnailImage, shortDescription, blogTitle } = blogData;
              const title = blogTitle?.split(":")[0];
              return (
                <div className="p-2 flex items-center gap-5" key={index}>
                  <div className="w-60">
                    <img src={`${BASE_URL}/${thumbnailImage}`} alt="blog post" />
                  </div>
                  <div>
                    <h3 className="font-bold text-md">{title}</h3>
                    <p className="text-[10px] font-normal text-gray-500">{shortDescription}</p>
                  </div>
                </div>
              );
            })}
          </div>

          <p
            className="px-4 py-2 text-[13px] text-custom-orange flex items-center gap-2 cursor-pointer"
            onClick={() => {
              setBlogDropdown(false);
              navigate("/blog");
            }}
          >
            <span>All blog posts </span>
            <FaArrowRight />
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogDropdown;
