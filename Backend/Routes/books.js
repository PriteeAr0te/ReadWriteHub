const express = require("express");
const authenticateUser = require("../middleware/authentication");
const Books = require("../Models/Books");
const { body, validationResult } = require("express-validator");
const router = express.Router();

//Route1 : Add a new Book

router.post(
  "/addbook",
  authenticateUser,
  [
    body("cover")
      .notEmpty()
      .withMessage("Cover URL is required")
      .isURL()
      .withMessage("Please enter valid URL"),
    body("title").isLength({ min: 3 }).withMessage("Enter valid Title"),
    body("description")
      .isLength({ min: 5 })
      .withMessage("Description should be greater that 5 characters"),
    body("genre").notEmpty().withMessage("Genre is required"),
    body("publish_date").isISO8601().withMessage("Invalid Date Format"),
    body("price").isNumeric().withMessage("Price must be numeric"),
    body("tags").isArray().withMessage("Tags should be an array"),
    body("isPublished")
      .isBoolean()
      .withMessage("isPublished must be a boolean"),
  ],
  async (req, res) => {
    try {
      const {
        cover,
        title,
        description,
        genre,
        publish_date,
        price,
        tags,
        isPublished,
      } = req.body;

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const book = new Books({
        cover,
        title,
        description,
        genre,
        publish_date,
        price,
        tags,
        isPublished,
        author: req.user.id,
      });
      const saveBook = await book.save();
      res.json({ success: true, book });
    } catch (error) {
      console.log(error.message);
      return res.status(500).json("Internal Server Error");
    }
  }
);

//ROUTE2: Edit an existing book  : PUT "/api/books/editbook" . login required

router.put(
  "/editbook/:id",
  authenticateUser,
  [
    body("cover")
      .notEmpty()
      .withMessage("Cover URL is required")
      .isURL()
      .withMessage("Please enter valid URL"),
    body("title").isLength({ min: 3 }).withMessage("Enter valid Title"),
    body("description")
      .isLength({ min: 5 })
      .withMessage("Description should be greater that 5 characters"),
    body("genre").notEmpty().withMessage("Genre is required"),
    body("publish_date").isISO8601().withMessage("Invalid Date Format"),
    body("price").isNumeric().withMessage("Price must be numeric"),
    body("tags").isArray().withMessage("Tags should be an array"),
    body("isPublished")
      .isBoolean()
      .withMessage("isPublished must be a boolean"),
  ],
  async (req, res) => {
    const {
      cover,
      title,
      description,
      genre,
      publish_date,
      price,
      tags,
      isPublished,
    } = req.body;

    try {
      const newBook = {};
      if (cover) {
        newBook.cover = cover;
      }
      if (title) {
        newBook.title = title;
      }
      if (description) {
        newBook.description = description;
      }
      if (genre) {
        newBook.genre = genre;
      }
      if (publish_date) {
        newBook.publish_date = publish_date;
      }
      if (price) {
        newBook.price = price;
      }
      if (tags) {
        newBook.tags = tags;
      }
      if (isPublished) {
        newBook.published = isPublished;
      }

      //find the book to be updated and update it
      let book = await Books.findById(req.params.id);
      if (!book) {
        return res.status(500).json({ error: "not found" });
      }

      if (book.user && book.user.toString() !== req.user.id) {
        return res
          .status(401)
          .json({ error: "Not authorized to edit this book" });
      }
      book = await Books.findByIdAndUpdate(
        { _id: req.params.id },
        { $set: newBook },
        { new: true }
      );

      if (!book) {
        return res.status(404).json({ error: "Book not found" });
      }
      res.json({ book });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ error: "Internal server error" });
    }
  }
);

//ROUTE 3: Delete an existing book  : DELETE "/api/books/deletebook" . login required

router.delete("/deletebook/:id", authenticateUser, async (req, res) => {
  try {
    //find the book to be deleted and delete it
    let book = await Books.findById(req.params.id);
    if (!book) {
      return res.status(404).json({ error: "not found" });
    }

    //Allow deletion only if author owns this book
    if (book.user && book.user.toString() !== req.user.id) {
      return res.status(401).send("Not Allowed to delete the book");
    }
    book = await Books.findByIdAndDelete(req.params.id);
    res.json({
      message: "Your note has been deleteted successfully!",
      book: book,
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal server error");
  }
});

//ROUTE 4: fetch all books : GET "/api/books/fetchallbooks" . login required
router.get("/fetchallbooks", authenticateUser, async (req, res) => {
  try {
    const publishedBooks = await Books.find({ isPublished: true }).populate(
      "author",
      "name"
    );
    res.json(publishedBooks);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: "Internal server error" });
  }
});

module.exports = router;
