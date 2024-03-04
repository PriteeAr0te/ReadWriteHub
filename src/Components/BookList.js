import React, { useContext, useEffect } from "react";
import BookContext from "../Context/Books/BookContext";

const BookList = () => {
  const context = useContext(BookContext);
  const { books, fetchBooks } = context;

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <div className="flex flex-row flex-wrap m-2 justify-center space-2">
      {Array.isArray(books) && books.length > 0 ? (
        books.map((book) => (
          <div
            key={book._id}
            className="rounded-lg border bg-card text-card-foreground shadow-sm w-full max-w-md"
            data-v0-t="card"
          >
            <div className="p-6 flex flex-col items-center">
              <img
                src={book.cover}
                width="full"
                height="auto"
                alt="Book cover"
                className="aspect-[3/2] rounded-none object-cover"
              />
              <div className="grid gap-1 w-full">
                <h1 className="text-2xl font-semibold tracking-tight">
                  {book.title}
                </h1>
                <p className="text-sm tracking-tighter">{book.description}</p>
                {/* <p className="text-sm font-semibold">By {book.author}</p> */}
                <p className="text-2xl font-semibold">${book.price}</p>
                <p className="text-xs uppercase tracking-wide">{book.genre}</p>
                <p className="text-xs uppercase tracking-wide">
                  {book.publishDate}
                </p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No books found.</p>
      )}
    </div>
  );
};

export default BookList;
