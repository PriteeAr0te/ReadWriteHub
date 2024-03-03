const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const reviewsSchema = new Schema({
  book: {
    type: Schema.Types.ObjectId,
    ref: "book",
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  reader: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  message: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Reviews = mongoose.model("review", reviewsSchema);
module.exports = Reviews;
