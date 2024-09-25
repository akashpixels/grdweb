/* eslint-disable max-len */
/* eslint-disable max-lines-per-function */
import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import logo from "assets/logot.svg"; // Assuming you're using React Router for navigation
import { useAppSelector } from "hooks/reduxHooks";
import { BASE_URL } from "api/apis";
import dummyImg from "assets/dummyImg.jpg";
import { getUserIsSubscribe } from "api/services/localServices.service";
import Cookies from "js-cookie";
import Modal from "../Modal/NormalModel/Modal";
import ConfirmationModal from "../Modal/ConfirmModel/ConfirmModel";

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isModalOpen, setModalOpen] = useState(false);
  const { isSubscribe } = getUserIsSubscribe();
  const profileImg = Cookies.get("ProfileImage");
  const userData = useAppSelector((state) => state.auth.userData);
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [blogDropdown, setBlogDropdown] = useState<boolean>(false);
  const [userDropdown, setUserDropdown] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleDropdown = (value: string) => {
    if (value === "services") {
      setIsDropdownOpen(!isDropdownOpen);
      setBlogDropdown(false);
    } else if (value === "blog") {
      setBlogDropdown(!blogDropdown);
      setIsDropdownOpen(false);
    }
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const closeMenu = (event: any) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
      setBlogDropdown(false);
      setIsOpen(false);
      setUserDropdown(false);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 996);
    };

    window.addEventListener("resize", handleResize);
    document.addEventListener("mousedown", closeMenu); // Listen for clicks outside the dropdown

    return () => {
      window.removeEventListener("resize", handleResize);
      document.removeEventListener("mousedown", closeMenu); // Clean up event listener
    };
  }, []);

  const getActiveClass = (path: string) => {
    return location.pathname === path ? "lg:bg-custom-primary lg:text-white" : "text-gray-900";
  };

  const closeModal = () => {
    setModalOpen(false);
    setUserDropdown(false);
  };
  const handleLogout = () => {
    setUserDropdown(false);
    setModalOpen(false);
    navigate("/logout");
  };

  return (
    <nav className="bg-custom-white dark:border-gray-700">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4 lg:gap-16">
        <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-12" alt="gradstory logo" height={100} width="auto" />
        </Link>
        <button
          onClick={toggleMenu}
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400  dark:focus:ring-gray-600"
          aria-expanded={isOpen ? "true" : "false"}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`w-full lg:flex lg:w-auto ${
            isOpen ? "block" : "hidden"
          } lg:flex-1 lg:justify-between`}
          id="navbar-multi-level"
          ref={dropdownRef}
        >
          <ul className="flex flex-col font-semibold p-4 lg:p-0 mt-4 border rounded-lg bg-gray-50 lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 text-custom-primary lg:bg-transparent dark:border-gray-700">
            <li className="lg:p-3 lg:rounded-2xl">
              <Link
                to="/"
                onClick={() => setIsOpen(false)}
                className="flex items-center rounded justify-between w-full py-2 px-3  hover:bg-custom-secondary lg:hover:bg-transparent lg:border-0  lg:p-0 lg:w-auto lg:dark:hover:bg-transparent"
                aria-current="page"
              >
                Home
              </Link>
            </li>
            <li className={`lg:p-3 lg:rounded-2xl ${getActiveClass("/our-story")}`}>
              <Link
                to="/our-story"
                onClick={() => setIsOpen(false)}
                className="flex items-center rounded justify-between w-full py-2 px-3  hover:bg-custom-secondary lg:hover:bg-transparent lg:border-0  lg:p-0 lg:w-auto lg:dark:hover:bg-transparent"
                aria-current="page"
              >
                About Us
              </Link>
            </li>
            <li className={`lg:p-3 lg:rounded-2xl ${getActiveClass("/subscription")}`}>
              <button
                id="dropdownNavbarLink"
                onClick={() => {
                  navigate("/subscription");
                  setIsOpen(false);
                }}
                className="flex items-center rounded justify-between w-full py-2 px-3 hover:bg-custom-secondary lg:hover:bg-transparent lg:border-0 lg:p-0 lg:w-auto lg:dark:hover:bg-transparent"
              >
                Our Services
                {/* This commented code is because of quick launching */}
                {/* <svg
                  className="w-2.5 h-2.5 ms-2.5"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 10 6"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                  />
                </svg> */}
              </button>
              {/* {isDropdownOpen && (
                <ServiceDropdown setIsDropdownOpen={setIsDropdownOpen} setIsOpen={setIsOpen} />
              )} */}
            </li>
            <li className={`lg:p-3 lg:rounded-2xl ${getActiveClass("/blog")}`}>
              <button
                id="dropdownNavbarLink"
                onClick={() => {
                  handleDropdown("blog");
                  navigate("/blog");
                  setIsOpen(false);
                }}
                className="flex items-center rounded justify-between w-full py-2 px-3  hover:bg-custom-secondary lg:hover:bg-transparent lg:border-0  lg:p-0 lg:w-auto lg:dark:hover:bg-transparent"
              >
                Blogs
              </button>
              {/* {blogDropdown && (
                <BlogDropdown setBlogDropdown={setBlogDropdown} setIsOpen={setIsOpen} />
              )} */}
            </li>
            <li className={`lg:p-3 lg:rounded-2xl ${getActiveClass("/contact")}`}>
              <Link
                to="/contact"
                onClick={() => setIsOpen(false)}
                className="block py-2 px-3 rounded hover:bg-custom-secondary lg:hover:bg-transparent lg:border-0 lg:p-0 lg:dark:hover:bg-transparent"
              >
                Get in Touch
              </Link>
            </li>

            {isMobile ? (
              !userData.token ? (
                <>
                  <li>
                    <Link
                      to="/sign-in"
                      onClick={() => setIsOpen(false)}
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-custom-secondary lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0  lg:dark:hover:text-blue-500    lg:dark:hover:bg-transparent"
                    >
                      Log In
                    </Link>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/dashboard/profile"
                      onClick={() => setIsOpen(false)}
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-custom-secondary lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0  lg:dark:hover:text-blue-500    lg:dark:hover:bg-transparent"
                    >
                      My Profile
                    </Link>
                  </li>
                  <li>
                    <Link
                      onClick={() => {
                        setModalOpen(true);
                      }}
                      className="block py-2 px-3 text-gray-900 rounded hover:bg-custom-secondary lg:hover:bg-transparent lg:border-0 lg:hover:text-blue-700 lg:p-0  lg:dark:hover:text-blue-500    lg:dark:hover:bg-transparent"
                      to={""}
                    >
                      Log out
                    </Link>
                  </li>
                </>
              )
            ) : null}
          </ul>
          {!isMobile ? (
            !userData.token ? (
              <ul className="flex flex-col font-semibold p-4 lg:p-0 mt-4 border rounded-lg bg-gray-50 lg:space-x-8 rtl:space-x-reverse lg:flex-row lg:mt-0 lg:border-0 text-custom-primary lg:bg-transparent dark:border-gray-700">
                <li className={`p-3 rounded-2xl ${getActiveClass("/sign-in")}`}>
                  <Link
                    to="/sign-in"
                    className="block py-2 px-3  rounded hover:bg-custom-secondary lg:hover:bg-transparent lg:border-0  lg:p-0     lg:dark:hover:bg-transparent"
                  >
                    Log In
                  </Link>
                </li>
              </ul>
            ) : (
              <div className="flex gap-6 items-center">
                <div className="relative flex items-center">
                  <button onClick={() => setUserDropdown(!userDropdown)}>
                    <img
                      src={
                        !profileImg || profileImg === "null" || profileImg === "undefined"
                          ? dummyImg
                          : `${BASE_URL}/${profileImg}`
                      }
                      alt="profile image"
                      width={50}
                      height={50}
                      className="rounded-full w-12 h-12 object-cover"
                    />
                  </button>
                  {userDropdown && (
                    <>
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-2 z-20 top-8">
                        <Link
                          to="/dashboard/profile"
                          onClick={() => setUserDropdown(false)}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          My Profile
                        </Link>
                        <Link
                          to={
                            isSubscribe
                              ? "/dashboard/cv-builder"
                              : "/dashboard/profile/subscription-plan"
                          }
                          onClick={() => setUserDropdown(false)}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          CV Builder
                        </Link>
                        <Link
                          to={
                            isSubscribe
                              ? "/dashboard/create-cover-letter"
                              : "/dashboard/profile/subscription-plan"
                          }
                          onClick={() => setUserDropdown(false)}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Cover letter
                        </Link>
                        <Link
                          to={
                            isSubscribe
                              ? "/dashboard/jobs-internships"
                              : "/dashboard/profile/subscription-plan"
                          }
                          onClick={() => setUserDropdown(false)}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                        >
                          Jobs
                        </Link>
                        <Link
                          onClick={() => {
                            setModalOpen(true);
                            setUserDropdown(false);
                          }}
                          className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                          to={""}
                        >
                          Logout
                        </Link>
                      </div>
                    </>
                  )}
                </div>
              </div>
            )
          ) : null}
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={closeModal}>
        <ConfirmationModal
          onConfirm={handleLogout}
          onCancel={closeModal}
          message="<b>Are you sure you want to logout ?</b>"
        />
      </Modal>
    </nav>
  );
};

export default Header;
