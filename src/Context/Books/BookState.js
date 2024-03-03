import React, { useState } from "react";
import BookContext from "./BookContext";

const BookState = (props) => {
  const BASE_URL = "http://localhost:5000";
  const bookInitial = [];
  const [books, setBooks] = useState(bookInitial);

  //fetch all books
  const fetchBooks = async () => {
    const response = await fetch(`${BASE_URL}/api/books/fetchallbooks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    setBooks(json);
  };

  //add Book
  const addBook = async (
    cover,
    title,
    description,
    genre,
    publish_date,
    price,
    tags,
    isPublished
  ) => {
    const response = await fetch(`${BASE_URL}/api/books/addbook`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        cover,
        title,
        description,
        genre,
        publish_date,
        price,
        tags,
        isPublished,
      }),
    });
    const book = await response.json();
    setBooks(books.concat(book));
  };

  //Delete a Book
  const deleteBook = async (id) => {
    const response = await fetch(`${BASE_URL}/api/books/deletebook/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });
    const json = await response.json();
    const newBooks = books.filter((book) => {
      return book._id !== id;
    });
    setBooks(newBooks);
  };

  //Edit Book Details

  const editBook = async (
    id,
    cover,
    title,
    description,
    genre,
    publish_date,
    price,
    tags,
    isPublished
  ) => {
    const response = await fetch(`${BASE_URL}/api/books/editbook/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({
        cover,
        title,
        description,
        genre,
        publish_date,
        price,
        tags,
        isPublished,
      }),
    });
    const json = await response.json();
    let newBooks = JSON.parse(JSON.stringify(books));
    for (let index = 0; index < newBooks.length; index++) {
      const element = newBooks[index];
      if (element._id === id) {
        newBooks[index].cover = cover;
        newBooks[index].title = title;
        newBooks[index].description = description;
        newBooks[index].price = price;
        newBooks[index].tags = tags;
        newBooks[index].isPublished = isPublished;
        break;
      }
    }
    setBooks(newBooks);
  };

  return (
    <BookContext.Provider
      value={{ books, addBook, deleteBook, editBook, fetchBooks }}
    >
      {props.children}
    </BookContext.Provider>
  );
};

export default BookState;
