import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="w-full py-6 bg-gray-900">
      <div className="container flex flex-col items-center justify-center gap-4 px-4 text-center md:flex-row md:gap-6 md:px-6 lg:gap-10">
        <div className="flex items-center gap-2 text-gray-100 md:gap-4 dark:text-gray-900">
          <p className="text-sm font-medium">
            © 2023 ReadWriteHub. All rights reserved.
          </p>
        </div>
        <nav className="flex flex-col gap-2 md:flex-row md:ml-auto md:gap-4 lg:gap-6">
          <Link
            className="text-sm font-medium text-gray-50 no-underline pr-3 hover:underline dark:text-gray-950 dark:hover:underline"
            to="/"
          >
            Home
          </Link>
          <a
            className="text-sm font-medium text-gray-50 no-underline pr-3 hover:underline dark:text-gray-950 dark:hover:underline"
            href="#"
          >
            About
          </a>
          <a
            className="text-sm font-medium text-gray-50 no-underline pr-3 hover:underline dark:text-gray-950 dark:hover:underline"
            href="#"
          >
            Contact
          </a>
        </nav>
        <div className="flex items-center justify-center gap-4 md:gap-8">
          <a
            className="rounded-full bg-gray-100 text-black no-underline w-8 h-8 shadow-sm hover:opacity-90 dark:bg-gray-950 flex justify-center items-center"
            href="#"
          >
            <i className="fa-brands fa-linkedin text-md"></i>
          </a>
          <a
            className="rounded-full bg-gray-100 text-black no-underline w-8 h-8 shadow-sm hover:opacity-90 dark:bg-gray-950 flex justify-center items-center"
            href="#"
          >
            <i className="fa-brands fa-facebook"></i>
          </a>
          <a
            className="rounded-full bg-gray-100 text-black no-underline w-8 h-8 shadow-sm hover:opacity-90 dark:bg-gray-950 flex justify-center items-center"
            href="#"
          >
            <i className="fa-solid fa-envelope"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
