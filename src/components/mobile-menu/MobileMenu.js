import React from "react";
import { useGlobalContext } from "../../context";

//react icons
import { Link } from "react-router-dom";

// component
import Header from "../header/Header";

// scss
import "./mobile-menu.scss";

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
