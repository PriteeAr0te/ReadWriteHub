import React, { useContext, useState } from "react";
import BookContext from "../Context/Books/BookContext";

const AddBook = () => {
  const context = useContext(BookContext);
  const { addBook } = context;
  const [book, setBook] = useState({
    cover: "",
    title: "",
    description: "",
    genre: "",
    publish_date: "", // Change this line
    price: "", // Change this line
    tags: [], // Change this line
    isPublished: false,
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();
    // Convert price to a number
    const price = parseFloat(book.price);
    // Format date if necessary (check the format expected by the backend)
    const publishDate = new Date(book.publish_date).toISOString();
    addBook(
      book.cover,
      book.title,
      book.description,
      book.genre,
      publishDate,
      price,
      book.tags, // Change this line
      book.isPublished
    );
    setBook({
      cover: "",
      title: "",
      description: "",
      genre: "",
      publish_date: "", // Change this line
      price: "", // Change this line
      tags: [], // Change this line
      isPublished: false,
    });
    alert("New Book Added", "success");
  };

  const onChange = (e) => {
    const { name, value } = e.target;
    if (name === "tags") {
      // Split the comma-separated string into an array of tags
      const tagsArray = value.split(",").map((tag) => tag.trim());
      setBook({
        ...book,
        [name]: tagsArray,
      });
    } else if (name === "price") {
      setBook({
        ...book,
        [name]: value.replace(/\D/g, ""),
      });
    } else {
      setBook({
        ...book,
        [name]: value,
      });
    }
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;
    setBook({ ...book, isPublished: value === "true" });
  };

  return (
    <div className="container-fluid">
      <form className="add-note-form mx-auto" onSubmit={handleOnSubmit}>
        <h1 className="form-title text-center"> Add New Book </h1>
        <div className="form-group">
          <label className="fw-semibold ml-5 mt-3" htmlFor="cover">
            {" "}
            Cover
          </label>
          <input
            type="text"
            className="form-control my-2"
            id="cover"
            value={book.cover}
            name="cover"
            aria-describedby="cover"
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="fw-semibold ml-5 mt-3" htmlFor="title">
            {" "}
            Title
          </label>
          <input
            type="text"
            className="form-control my-2"
            id="title"
            value={book.title}
            name="title"
            aria-describedby="title"
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group my-3">
          <label className="fw-semibold mt-3" htmlFor="description">
            Description
          </label>
          <textarea
            type="text"
            className="form-control my-2"
            id="description"
            value={book.description}
            name="description"
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="fw-semibold ml-5 mt-3" htmlFor="genre">
            {" "}
            Genre
          </label>
          <input
            type="text"
            className="form-control my-2"
            id="genre"
            value={book.genre}
            name="genre"
            aria-describedby="genre"
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="fw-semibold ml-5 mt-3" htmlFor="price">
            {" "}
            Price
          </label>
          <input
            type="text"
            className="form-control my-2"
            id="price"
            value={book.price}
            name="price"
            aria-describedby="price"
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group">
          <label className="fw-semibold ml-5 mt-3" htmlFor="publish_date">
            {" "}
            Publish Date
          </label>
          <input
            type="date"
            className="form-control my-2"
            id="publish_date"
            value={book.publish_date}
            name="publish_date"
            aria-describedby="date"
            onChange={onChange}
            required
          />
        </div>
        <div className="form-group m-2">
          <input
            className="form-check-input"
            type="radio"
            name="isPublished"
            id="trueRadio"
            value={true}
            checked={book.isPublished}
            onChange={handleRadioChange}
          />
          <label className="form-check-label" htmlFor="trueRadio">
            True
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="isPublished"
            id="falseRadio"
            value={false}
            checked={!book.isPublished}
            onChange={handleRadioChange}
          />
          <label className="form-check-label" htmlFor="falseRadio">
            False
          </label>
        </div>
        <div className="form-group">
          <label className="fw-semibold ml-5 mt-3" htmlFor="tags">
            {" "}
            Tags (Comma separated)
          </label>
          <input
            type="text"
            className="form-control my-2"
            id="tags"
            value={book.tags.join(",")}
            name="tags"
            aria-describedby="tags"
            onChange={onChange}
            required
          />
        </div>
        <div className="w-full flex justify-center items-center">
          <button
            disabled={book.title.length < 5 || book.description.length < 5}
            type="submit"
            className="btn btn-primary px-2 my-2 p-1 m-1"
          >
            {" "}
            Add Book
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddBook;
