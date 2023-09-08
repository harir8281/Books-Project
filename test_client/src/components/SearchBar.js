import React, { useState } from 'react';
import './SearchBar.css'; // Import your CSS file

function SearchBar({ onSearch }) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    onSearch(searchQuery);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search books..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input" // Apply a class to the input
      />
      <button onClick={handleSearch} className="search-button">Search</button> {/* Apply a class to the button */}
    </div>
  );
}

export default SearchBar;
