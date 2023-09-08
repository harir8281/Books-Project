import React, { useEffect, useState } from "react";
import axios from "axios";
import BooksList from "./components/BooksList";
import SearchBar from "./components/SearchBar"; // Import the SearchBar component
import "./App.css";

function App() {
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit] = useState(5);
  const [searchQuery, setSearchQuery] = useState(''); // New state for search query

  const getBooks = async (page) => {
    // Modify your API request to include the search query
    try {
      const response = await axios.get(`http://localhost:5001/api/books?page=${page}&limit=${limit}&search=${searchQuery}`);
      console.log("Books API Response:", response.data);
      setBooks(response.data.books);
      setCurrentPage(response.data.currentPage);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  useEffect(() => {
    getBooks(currentPage);
  }, [currentPage, searchQuery]); // Add searchQuery to the dependency array

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to the first page when a new search is performed
  };

  return (
    <div>
      <SearchBar onSearch={handleSearch} /> {/* Include the SearchBar component */}
      <BooksList books={books} />
      <div className="pagination">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
