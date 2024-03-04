import React from "react";
import BookList from "./BookList";
import AddBook from "./AddBook";

const Author = () => {
  return (
    <>
      <div className="w-full min-h-screen flex flex-row">
        <div
          className="bg-card text-card-foreground shadow-sm w-full max-w-sm rounded-xl border my-5"
          data-v0-t="card"
        >
          <div className="flex flex-col space-y-1.5 p-4">
            <h3 className="font-semibold whitespace-nowrap tracking-tight text-lg">
              Filter &amp; Sort
            </h3>
            <p className="text-muted-foreground text-xs leading-none">
              Filter and sort your Books
            </p>
          </div>
          <div className="p-4">
            <div className="grid gap-4">
              <div className="dropdown">
                <button
                  className="btn bg-slate-400 dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Genre
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      All Genre
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Fiction
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Programming
                    </a>
                  </li>
                </ul>
              </div>
              <div className="dropdown">
                <button
                  className="btn bg-gray-400 dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Release Date
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      2022
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      2023
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      2024
                    </a>
                  </li>
                </ul>
              </div>
              <div className="dropdown">
                <button
                  className="btn dropdown-toggle bg-slate-400"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Author
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      All
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Dipali
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Pritee
                    </a>
                  </li>
                </ul>
              </div>
              <div className="dropdown">
                <button
                  className="btn dropdown-toggle bg-slate-400"
                  type="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Status
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      All
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Published
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Draft
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center w-[50%] min-h-fit border-2 border-blue-500 m-10 flex-wrap">
          <AddBook />
        </div>
      </div>
      <div className="w-full mt-10 mb-10">
        <BookList />
      </div>
    </>
  );
};

export default Author;
