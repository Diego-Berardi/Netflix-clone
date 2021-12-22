import React from "react";
import { useGlobalContext } from "../context";

//react icons
import { CgProfile } from "react-icons/cg";
import { GoSearch } from "react-icons/go";
import { Link } from "react-router-dom";

import Header from "./Header";

const MobileMenu = () => {
  const { showMobileMenu } = useGlobalContext();
  return (
    <>
      {showMobileMenu && (
        <>
          <div className="mobile-menu">
            <Header />
            <ul className="mobile-list">
              <li>
                <Link to="/movie">Movie</Link>
              </li>
              <li>
                <Link to="/tv">Tv Shows</Link>
              </li>
              <li>
                <Link to="/person">People</Link>
              </li>
              <li className="li-icons-menu">
                <Link to="/search">
                  <GoSearch />
                </Link>
                <Link to="/profile">
                  <CgProfile />
                </Link>
              </li>
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default MobileMenu;
