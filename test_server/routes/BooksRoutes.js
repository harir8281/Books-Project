const express = require("express");
const {
  getBooks,
  addBooks,
  deleteAllBooks,
} = require("../controllers/BooksController");

const router = express.Router();

router.route("/").get(getBooks).post(addBooks).delete(deleteAllBooks);

module.exports = router;
