import React, { useState, useEffect } from "react";
import { useGlobalContext } from "../context";

import useFetch from "../useFetch";
import apiRequests from "../apiRequest";

import SingleMovie from "./SingleMovie";

const SearchContainer = () => {
  const { setShowMobileMenu, searchValue } = useGlobalContext();

  const { data, isLoading, isError, fetchData } = useFetch(
    `${apiRequests.Search_url}${apiRequests.api_key}&query=${
      searchValue ? searchValue : ""
    }`
  );

  useEffect(() => {
    fetchData(
      `${apiRequests.Search_url}${apiRequests.api_key}&query=${searchValue}`
    );
  }, [searchValue]);

  useEffect(() => {
    setShowMobileMenu(false);
  }, []);

  if (isLoading) return <></>;
  if (isError) return <></>;
  if (!data) return <></>;

  return (
    <>
      <main className="search-page-container container">
        <div className="container-search-list">
          <h2>Movie and Tv Shows</h2>
          <div className="div-search-list">
            {data &&
              data.results.map((elem, i) => {
                if (!(elem.poster_path || elem.profile_path)) return;
                const img_url = `${apiRequests.imgBase_url}${
                  elem.poster_path || elem.profile_path
                }`;

                return (
                  <SingleMovie
                    key={elem.id}
                    {...elem}
                    img_url={img_url}
                    media_type={elem.media_type}
                  />
                );
              })}
          </div>
        </div>
      </main>
    </>
  );
};

export default SearchContainer;
