const express = require("express");
const router = express.Router();
const authenticateUser = require("../middleware/authentication");
const Books = require("../Models/Books");
const Reviews = require("../Models/Reviews");

router.get("/filterbooks", authenticateUser, async (req, res) => {
  try {
    const authorId = req.user.id;
    const { published, genre, sortBy, sortOrder, page, limit } = req.query;

    const query = { author: authorId };
    if (published) {
      query.isPublished = published === "true";
    }
    if (genre) {
      query.genre = genre;
    }
    const sortOptions = {};
    if (sortBy) {
      sortOptions[sortBy] = sortOrder === "desc" ? -1 : 1;
    }

    const pageNumber = parseInt(page) || 1;
    const limitPerPage = parseInt(limit) || 10;
    const startIndex = (pageNumber - 1) * limitPerPage;
    const endIndex = pageNumber * limitPerPage;

    const books = await Books.find({ query })
      .sort(sortOptions)
      .limit(limitPerPage)
      .skip(startIndex);

    res.json({ books });
  } catch (error) {
    console.log(error.message);
    res.status(500).json("Internal Server error");
  }
});

router.get("/reviews", authenticateUser, async (req, res) => {
  try {
    const authorId = req.user.id;
    const { page, limit } = req.query;
    const { query } = { author: authorId };

    const pageNumber = parseInt(page) || 1;
    const limitPerPage = parseInt(limit) || 10;
    const startIndex = (pageNumber - 1) * limitPerPage;

    const reviews = await Reviews.find(query)
      .sort({ createdAt: -1 })
      .limit(limitPerPage)
      .skip(startIndex);

    res.json({ reviews });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({ errro: "Internal server error" });
  }
});

module.exports = router;
