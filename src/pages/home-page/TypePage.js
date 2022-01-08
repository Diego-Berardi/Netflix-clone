import React, { useEffect } from "react";
import { useGlobalContext } from "../../context";
import { useParams } from "react-router-dom";

// components
import Header from "../../components/header/Header";
import MobileMenu from "../../components/mobile-menu/MobileMenu";
import SearchBar from "../../components/search-bar/SearchBar";
import SearchContainer from "../../components/search-container/SearchContainer";
import RowContainer from "../../components/sliders-container/SlidersContainer";
import Footer from "../../components/footer/Footer";

// scss
import "./home-page.scss";

const TypePage = () => {
  const { setShowMobileMenu, searchValue, setSearchValue, showSearchBar } =
    useGlobalContext();
  const { type } = useParams();

  useEffect(() => {
    setShowMobileMenu(false);
    setSearchValue(false);
  }, [type]);

  return (
    <>
      <Header />
      <MobileMenu />
      {showSearchBar && (
        <div className="search-bar-mobile">
          <SearchBar />
        </div>
      )}
      {searchValue ? (
        <SearchContainer />
      ) : (
        <RowContainer pageValue={type ? type : "all"} />
      )}

      <Footer />
    </>
  );
};

export default TypePage;
