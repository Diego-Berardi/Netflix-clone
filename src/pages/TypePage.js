import React, { useEffect } from "react";
import { useGlobalContext } from "../context";
import { useParams } from "react-router-dom";

import Header from "../components/Header";
import MobileMenu from "../components/MobileMenu";
import SearchBar from "../components/SearchBar";
import SearchContainer from "../components/SearchContainer";
import RowContainer from "../components/RowContainer";
import Footer from "../components/Footer";

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
