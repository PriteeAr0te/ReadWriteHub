const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
  author: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  cover: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  genre: {
    type: String,
    required: true,
  },
  publish_date: {
    type: Date,
  },
  price: {
    type: Number,
    required: true,
  },
  tags: [String],
  isPublished: {
    type: Boolean,
    default: false,
  },
});

const Books = mongoose.model("book", bookSchema);

module.exports = Books;
