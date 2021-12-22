import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalContext } from "../context";
// react icons
import { FiMenu } from "react-icons/fi";
import { GoSearch } from "react-icons/go";
import { AiOutlineClose } from "react-icons/ai";

import { CgProfile } from "react-icons/cg";

const Header = () => {
  const { showMobileMenu, setShowMobileMenu } = useGlobalContext();
  return (
    <header className="container">
      <nav>
        <Link className="link" to="/"><h1>Movie Database</h1></Link>
        <div className="pc-menu">
          <ul className="">
            <li>
              <Link className="link" to="/movie">Movie</Link>
            </li>
            <li>
              <Link className="link" to="/tv">Tv Shows</Link>
            </li>
            <li>
              <Link className="link" to="/person">People</Link>
            </li>
          </ul>

          <div className="icons">
            <Link className="link" to="/search">
              <GoSearch />
            </Link>
            <Link className="link" to="/profile">
              <CgProfile />
            </Link>
          </div>
        </div>

        <button
          className="btn mobile-menu-btn"
          onClick={() => setShowMobileMenu(!showMobileMenu)}
        >
          {!showMobileMenu ? <FiMenu /> : <AiOutlineClose />}
        </button>
      </nav>
    </header>
  );
};

export default Header;
