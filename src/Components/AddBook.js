import React, { useContext, useState } from "react";
import axios from "axios";
import BookContext from "../Context/Books/BookContext";

const AddBook = () => {
  const [image, setImage] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [publish_date, setPublish_date] = useState("");
  const [price, setPrice] = useState(0);
  const [tags, setTags] = useState([]);
  const [isPublished, setIsPublished] = useState([]);

  console.log(image, 12);

  const [error, setError] = useState("");
  const context = useContext(BookContext);
  const { addBook } = context;

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = "";
      const formData = new FormData();
      formData.append("cover", image);
      formData.append("title", title);
      formData.append("description", description);
      formData.append("genre", genre);
      formData.append("publish_date", publish_date);
      formData.append("price", price);
      formData.append("tags", tags);
      formData.append("isPublished", isPublished);
      // formData.append("upload_preset", "readwritehubimage");

      const dataRes = await axios
        .post("http://localhost:5000/api/books/addbook", formData, {
          headers: { Authorization: localStorage.getItem("token") },
          "Content-Type": "multipart/form-data",
        })
        .then((res) => {
          console.log(res.data);
        });
      imageUrl = dataRes.data.book.cover;

      const bookData = {
        ...(image ? { cover: imageUrl } : {}),
        title: title,
        description: description,
        genre: genre,
        publish_date: publish_date,
        price: price,
        tags: tags,
        isPublished: isPublished,
      };

      const response = await addBook(bookData);

      if (response && response.data && response.data.book) {
        const imageUrl = response.data.book.cover;
        console.log("imageUrl: ", imageUrl);
        alert("New Book Added", "success");
      } else {
        alert("Failed to add book", "error");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to add book");
    }
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;
    setIsPublished(value === "true");
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
            type="file"
            accept="image/*"
            className="form-control my-2"
            id="cover"
            name="cover"
            aria-describedby="cover"
            onChange={(e) => setImage(e.target.files[0])}
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
            value={title}
            name="title"
            aria-describedby="title"
            onChange={(e) => setTitle(e.target.value)}
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
            value={description}
            name="description"
            onChange={(e) => setDescription(e.target.value)}
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
            value={genre}
            name="genre"
            aria-describedby="genre"
            onChange={(e) => setGenre(e.target.value)}
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
            value={price}
            name="price"
            aria-describedby="price"
            onChange={(e) => setPrice(e.target.value)}
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
            value={publish_date}
            name="publish_date"
            aria-describedby="date"
            onChange={(e) => setPublish_date(e.target.value)}
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
            checked={isPublished}
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
            checked={!isPublished}
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
            value={tags.join(",")}
            name="tags"
            aria-describedby="tags"
            onChange={(e) =>
              setTags(e.target.value.split(",").map((tag) => tag.trim()))
            }
            required
          />
        </div>
        <div className="w-full flex justify-center items-center">
          <button
            disabled={title.length < 5 || description.length < 5}
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
