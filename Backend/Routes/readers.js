const express = require("express");
const router = express.Router();
const Books = require("../Models/Books");
const Reviews = require("../Models/Reviews");
const authenticateUser = require("../middleware/authentication");

// Route to handle fetching and filtering books for readers
router.get("/browse-books", authenticateUser, async (req, res) => {
  try {
    const {
      topRated,
      author,
      genre,
      title,
      minRating,
      priceMin,
      priceMax,
      tags,
      sortBy,
      sortOrder,
      page,
      limit,
    } = req.query;

    // Define base query to fetch books
    const query = {};

    // Apply filters
    if (topRated === "true") {
      query.rating = { $gte: 4 };
    }
    if (author) {
      query.author = author;
    }
    if (genre) {
      query.genre = genre;
    }
    if (title) {
      query.title = { $regex: title, $options: "i" };
    }
    if (minRating) {
      query.rating = { $gte: minRating };
    }
    if (priceMin || priceMax) {
      query.price = {};
      if (priceMin) query.price.$gte = parseInt(priceMin);
      if (priceMax) query.price.$lte = parseInt(priceMax);
    }
    if (tags) {
      query.tags = { $in: tags.split(",") };
    }

    // Apply sorting
    const sortOptions = {};
    if (sortBy && sortOrder) {
      sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
    }

    // Apply pagination
    const pageNumber = parseInt(page) || 1;
    const limitPerPage = parseInt(limit) || 10;
    const startIndex = (pageNumber - 1) * limitPerPage;

    // Fetch books based on the constructed query, apply sorting and pagination
    let books = await Books.find(query)
      .sort(sortOptions)
      .limit(limitPerPage)
      .skip(startIndex)
      .populate("author", "name"); // Populate author details

    // If topRated is true, aggregate average ratings from Reviews collection
    if (topRated === "true") {
      let topRatedBooks = await Reviews.aggregate([
        { $group: { _id: "$book", avgRating: { $avg: "$rating" } } },
        { $match: { avgRating: { $gte: 4 } } },
      ]);

      // Extract book ids from topRatedBooks
      const topRatedBookIds = topRatedBooks.map((review) => review._id);

      // Filter books based on top-rated book ids
      books = books.filter((book) => topRatedBookIds.includes(book._id));
    }

    res.json({ books });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to fetch details of a specific book based on the book's ID
router.get("/book/:id", authenticateUser, async (req, res) => {
  try {
    const bookId = req.params.id;

    // Fetch the book details based on the provided book ID
    const book = await Books.findById(bookId);

    // Check if the book exists
    if (!book) {
      return res.status(404).json({ error: "Book not found" });
    }

    res.json({ book });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Route to allow readers to submit reviews for books they have read
router.post("/book/:id/reviews", authenticateUser, async (req, res) => {
  try {
    const bookId = req.params.id;
    const { message, rating } = req.body;

    // Validation: Ensure that the rating provided by the reader is between 1-5 stars
    if (rating < 1 || rating > 5) {
      return res
        .status(400)
        .json({ error: "Rating must be between 1 and 5 stars" });
    }

    // Create a new review object
    const newReview = new Reviews({
      book: bookId,
      reader: req.user.id,
      rating,
      message,
    });

    // Save the new review to the database
    await newReview.save();

    res.json({ success: true, message: "Review submitted successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
