import React from "react";
import { NavLink } from "react-router-dom";
import { Outlet } from "react-router-dom";

import Footer from "../Footer/Footer";

import "./Header.css";
import { ReactComponent as MenuIcon } from "./../../assets/svgs/menu-icon.svg";

const Header = () => {
  return (
    <>
      <nav className="bg-white border-gray-200 dark:bg-[#e5e7eb]">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <NavLink to="/">
            <div className="flex items-center">
              <img
                src="https://flowbite.com/docs/images/logo.svg"
                className="h-8 mr-3"
                alt="Flowbite Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-black text-black">
                Social Media Feed
              </span>
            </div>
          </NavLink>
          <button
            data-collapse-toggle="navbar-default"
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
            aria-controls="navbar-default"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <MenuIcon />
          </button>
          <div
            className="hidden w-full md:block md:w-auto"
            id="navbar-default "
          >
            <ul className="font-medium text-black dark:text-black flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-[#e5e7eb] md:dark:bg-[#e5e7eb] dark:border-gray-700 ">
              <li>
                <NavLink
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#4E67E4] md:p-0 dark:text-black md:dark:hover:text-[#4E67E4] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  to="/"
                >
                  Posts Feed
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#4E67E4] md:p-0 dark:text-black md:dark:hover:text-[#4E67E4] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  to="/users-feed?page=1"
                >
                  Users Feed
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#4E67E4] md:p-0 dark:text-black md:dark:hover:text-[#4E67E4] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  to="/my-posts"
                >
                  My Posts
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-[#4E67E4] md:p-0 dark:text-black md:dark:hover:text-[#4E67E4] dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent"
                  to="/add-post"
                >
                  Add Post
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <Outlet />
      <Footer />
    </>
  );
};

export default Header;
