import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Navbar = ({ userType }) => {
  useEffect(() => {
    console.log("UserType= ", userType);
  }, [userType]);
  return (
    <header className="bg-[#00c2a2] dark:bg-[#065f46]">
      <div className="container flex justify-between h-16 items-center">
        <div className="flex items-center">
          <a className="mr-auto flex no-underline">
            <h2 className="text-white text-3xl font-sans font-bold tracking-tight">
              ReadWriteHub
            </h2>
          </a>
        </div>
        <div className="flex flex-grow justify-center max-w-sm md:min-w-[400px]">
          <input
            placeholder="Search"
            type="search"
            className="p-1.5 rounded-md outline-none mx-1 w-full"
          />
          <button
            type="submit"
            variant="outline"
            className="p-1.5 px-2.5 bg-amber-400 rounded-md"
          >
            <SearchIcon className="h-4 w-4" />
          </button>
        </div>
        <nav className="hidden md:flex items-center space-x-4 text-md font-medium lg:space-x-6">
          <Link
            to="/"
            className="px-3 py-2 rounded-md text-white no-underline hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
          >
            Home
          </Link>
          {userType === "author" && (
            <li className="list-none">
              <Link
                to="/author"
                className="px-3 py-2 rounded-md text-white no-underline hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
              >
                Author Page
              </Link>
            </li>
          )}
          {userType === "reader" && (
            <li className="list-none">
              <Link
                to="/reader"
                className="px-3 py-2 rounded-md text-white no-underline hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
              >
                Reader Page
              </Link>
            </li>
          )}
        </nav>
      </div>
    </header>
  );
};

function SearchIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  );
}

export default Navbar;
