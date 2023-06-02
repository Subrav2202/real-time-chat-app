import React from "react";
import { FaSearch } from "react-icons/fa";

function Search() {
  return (
    <div className="search-wrapper">
      <input type="text" placeholder="Search or start a new chat" />
      <div>
        <FaSearch />
      </div>
    </div>
  );
}

export default Search;
