import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const BooksList = ({ books }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.longDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
      book.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const booksForCurrentPage = filteredBooks.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredBooks.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mt-5">
      <div className="mb-4">
        <h1>Book List</h1>
        <input
          type="text"
          className="form-control"
          placeholder="Search by title, short description, long description, or status..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Title</th>
            <th>Short Description</th>
            <th>Long Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {booksForCurrentPage.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.shortDescription}</td>
              <td>{book.longDescription}</td>
              <td>{book.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="pagination">
        <ul className="pagination">
          {Array.from({ length: totalPages }).map((_, index) => (
            <li
              key={index}
              className={`page-item ${index + 1 === currentPage ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(index + 1)}
              >
                {index + 1}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BooksList;
