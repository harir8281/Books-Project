const Book = require("../models/BookModel");
const asyncHandler = require("express-async-handler");
const fs = require("fs");
const path = require("path");

const addBooks = asyncHandler(async (req, res) => {
  try {
    const filePath = path.join(__dirname, "../book.json");
    const fileData = fs.readFileSync(filePath, "utf-8");
    const books = JSON.parse(fileData);

    await Book.insertMany(books);
    res.json({ message: "Books inserted successfully", data: books });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

const getBooks = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const searchQuery = req.query.search || "";

  try {
    const skip = (page - 1) * limit;

    const searchFilter = {
      $or: [
        { title: { $regex: searchQuery, $options: "i" } },
        { shortDescription: { $regex: searchQuery, $options: "i" } },
        { longDescription: { $regex: searchQuery, $options: "i" } },
        { status: { $regex: searchQuery, $options: "i" } },
      ],
    };

    const books = await Book.find(searchFilter).skip(skip).limit(limit);

    const totalCount = await Book.countDocuments(searchFilter);

    res.json({
      books,
      currentPage: page,
      totalPages: Math.ceil(totalCount / limit),
    });
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
