/* eslint-disable max-len */
import React from "react";
import logo from "assets/logot.svg";
import { FooterData, FooterSections, footerData } from "Json/footer";
import { SubscriptionUpdates } from "routes/routes";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-gray-900">
      <SubscriptionUpdates />
      <div className=" w-full">
        <div className="grid grid-cols-2 gap-8 px-4 lg:py-8 md:grid-cols-4 py-12 md:p-12 mx-10">
          {Object.keys(footerData).map((section: string, index: number) => (
            <div key={index} className="text-center md:text-start">
              <h2 className="border-b pb-3 md:pb-0 md:border-none mb-6 text-sm font-semibold text-custom-secondary dark:text-custom-secondary">
                {section?.charAt(0).toUpperCase() + section.slice(1)}
              </h2>
              <ul className="text-custom-white font-medium">
                {footerData[section as keyof FooterSections].map(
                  (item: FooterData, itemIndex: number) => (
                    <li key={itemIndex} className="mb-4">
                      <a
                        href={item.link}
                        className="hover:underline"
                        target={item.target ?? "_self"}
                      >
                        {item.name}
                      </a>
                    </li>
                  )
                )}
              </ul>
            </div>
          ))}
        </div>
        <div className="px-4 py-6 bg-custom-white md:flex md:items-center md:justify-between rounded-t-2xl shadow-2xl">
          <div className="flex justify-center md:justify-start items-center mb-3 md:mb-4">
            <img src={logo} alt="gradstory logo" width={100} />
          </div>
          <div className="text-md text-custom-primary text-center font-medium">
            © 2024 <a href="#">TheGradStory</a>. All Rights Reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
