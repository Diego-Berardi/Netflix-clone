import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../../context";

// react icons
import { FiMenu } from "react-icons/fi";
import { GoSearch } from "react-icons/go";
import { AiOutlineClose } from "react-icons/ai";

//components
import SearchBar from "../search-bar/SearchBar";

// scss
import "./header.scss";

const Header = () => {
  const { showMobileMenu, setShowMobileMenu, showSearchBar, setShowSearchBar } =
    useGlobalContext();
  return (
    <header className="container">
      <nav>
        <Link className="link" to="/">
          <h1>Movie Database</h1>
        </Link>
        <div className="pc-menu">
          <ul className="">
            <li>
              <Link className="link" to="/movie">
                Movie
              </Link>
            </li>
            <li>
              <Link className="link" to="/tv">
                Tv Shows
              </Link>
            </li>
            <li>
              <Link className="link" to="/person">
                People
              </Link>
            </li>
          </ul>

          <div className="icons">
            <SearchBar />
            <button
              className="link search-btn"
              onClick={() => setShowSearchBar(!showSearchBar)}
            >
              <GoSearch />
            </button>
          </div>
        </div>
        <div className="mobile-btns">
          <button
            className="link search-btn"
            onClick={() => setShowSearchBar(!showSearchBar)}
          >
            <GoSearch />
          </button>
          <button
            className="btn mobile-menu-btn"
            onClick={() => setShowMobileMenu(!showMobileMenu)}
          >
            {!showMobileMenu ? <FiMenu /> : <AiOutlineClose />}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
