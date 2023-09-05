const Book = require("../models/BookModel");
const asyncHandler = require("express-async-handler");

const addBooks = asyncHandler(async (req, res) => {
  try {
    const books = req.body;
    await Book.insertMany(books);
    res.json({ message: "Books inserted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getBooks = asyncHandler(async (req, res) => {
  try {
    const { title, shortDescription, longDescription, status, page, limit } =
      req.query;

    const query = {
      title: new RegExp(title, "i"),
      shortDescription: new RegExp(shortDescription, "i"),
      longDescription: new RegExp(longDescription, "i"),
      status: new RegExp(status, "i"),
    };

    const options = {
      skip: (page - 1) * limit,
      limit: parseInt(limit),
    };

    const books = await Book.find(query, null, options);
    res.json(books);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const deleteAllBooks = asyncHandler(async (req, res) => {
  try {
    await Book.deleteMany();
    res.json("Database cleared");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
});

module.exports = { addBooks, getBooks, deleteAllBooks };
