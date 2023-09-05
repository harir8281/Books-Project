import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/" className="navbar-link">
            BooksList
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/upload" className="navbar-link">
            Upload-sample-json
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
