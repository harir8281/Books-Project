import React, { useEffect, useState } from "react";
import axios from "axios";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import BooksList from "./components/BooksList";
import JsonFileUploadForm from "./components/JsonFileUploadForm";
import Navbar from "./components/Navbar";

import "./App.css"; 

function App() {
  const [books, setBooks] = useState([]);

  const getBooks = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/books");
      console.log("Books API Response:", response.data);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    getBooks();
  }, []);

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<BooksList books={books} />} />
        <Route
          path="/upload"
          element={<JsonFileUploadForm onRefetch={getBooks} />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
