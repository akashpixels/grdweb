import React from "react";

interface IHeader {
  title: string;
  subtitle: string;
}

const Header = ({ title, subtitle }: IHeader) => {
  return (
    <header className="bg-white shadow p-4 rounded-2xl">
      <h1 className="text-2xl font-semibold mb-2">{title}</h1>
      <p className="text-sm text-gray-500">{subtitle}</p>
    </header>
  );
};

export default Header;
