import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="bg-[#00c2a2] dark:bg-[#065f46]">
      <div className="container flex h-16 items-center">
        <a className="mr-auto flex no-underline">
          <h2 className="text-white text-3xl font-sans font-bold tracking-tight">
            {" "}
            ReadWriteHub
          </h2>
        </a>
        <nav className="hidden md:flex items-center space-x-4 text-md font-medium lg:space-x-6">
          <Link
            to="/"
            className="px-3 py-2 rounded-md text-white no-underline hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
          >
            Home
          </Link>
          <a
            href="#"
            className="px-3 py-2 rounded-md text-white no-underline hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
          >
            About
          </a>
          <a
            href="#"
            className="px-3 py-2 rounded-md text-white no-underline hover:bg-gray-100/50 dark:hover:bg-gray-800/50"
          >
            Contact
          </a>
        </nav>
      </div>
    </header>
  );
};

// const MountainIcon = (props) => {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
//     </svg>
//   );
// };

export default Navbar;
