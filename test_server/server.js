const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDb = require("./config/dbConnection");

dotenv.config();

connectDb();

const app = express();
const port = process.env.PORT || 5001;

app.use(express.json());
app.use(cors());
app.use("/api/books", require("./routes/BooksRoutes"));

app.listen(port, () => console.log(`listening on ${port}`));
