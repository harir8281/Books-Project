import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./BookList.css";

const BooksList = ({ books }) => {
  return (
    <div className="container mt-5">
      <table className="table table-striped custom-table">
        <thead>
          <tr>
            <th>Title</th>
            <th>Short Description</th>
            <th>Long Description</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.title}</td>
              <td>{book.shortDescription}</td>
              <td>{book.longDescription}</td>
              <td>{book.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BooksList;
