import React from 'react';
import logo from '../assets/logo.svg';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  return (
    <div className="flex md:flex-row justify-between items-center py-4 px-6 md:px-20 bg-gradient-to-r from-[#000000] via-black to-[#041229]">
      <div className="flex justify-between items-center md:w-auto">
        <button
          onClick={toggleMenu}
          className="md:hidden focus:outline-none pr-4"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-8 h-8 text-white"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12H12m-8.25 5.25h16.5"
              />
            </svg>
          )}
        </button>
        <img src={logo} className="h-6" alt="Certlify" />
      </div>
      <div
        className={`${
          isMenuOpen ? 'block' : 'hidden'
        } md:flex md:items-center w-full md:w-auto`}
      >
        <ul className="mt-4 md:mt-0 md:flex text-white md:flex-row md:gap-12 md:text-base md:font-medium">
          <li>Home</li>
          <li>Services</li>
          <li>FAQ's</li>
        </ul>
      </div>
      <div className="md:mt-0">
        <Link to="/register">
          <button className="bg-white text-black text-[14px] font-medium p-[10px] rounded-xl">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Header;
