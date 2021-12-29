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
          </div>
        </>
      )}
    </>
  );
};

export default MobileMenu;
