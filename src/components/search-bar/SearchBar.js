import React from "react";
import { useGlobalContext } from "../../context";

// scss
import "./search-bar.scss";

const SearchBar = () => {
  const { handleChange, showSearchBar } = useGlobalContext();

  return (
    <>
      {showSearchBar && (
        <form action="" className="search-bar-form">
          <input type="text" placeholder="Search..." onChange={handleChange} />
        </form>
      )}
    </>
  );
};

export default SearchBar;
