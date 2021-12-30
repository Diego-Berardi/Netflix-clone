import React, { useEffect } from "react";
import apiRequests from "../apiRequest";
import useFetch from "../useFetch";

import MoviesSlider from "./MoviesSlider";
import BigScreenMovie from "./BigScreenMovie";

import { useGlobalContext } from "../context";

const RowContainer = ({ pageValue }) => {
  const { returnMyList } = useGlobalContext();

  const myList = returnMyList();

  const { data, fetchData } = useFetch(
    `${apiRequests.TrendingBase_url}/${pageValue}/week${apiRequests.api_key}`
  );

  const getIndex = () => {
    const now = new Date().getTime();
    return Math.round(Math.round(now / 1000) / (60 * 5)) % 20;
  };

  useEffect(() => {
    fetchData(
      `${apiRequests.TrendingBase_url}/${pageValue}/week${apiRequests.api_key}`
    );
  }, [pageValue]);
  return (
    <main className="">
      {data && pageValue !== "person" && (
        <BigScreenMovie {...data.results[getIndex()]} />
      )}
      <MoviesSlider
        title={"Trending Now"}
        url={`${apiRequests.TrendingBase_url}/${pageValue}/week${apiRequests.api_key}`}
      />

      {!(pageValue == "person") && (
        <MoviesSlider
          title={"My List "}
          url={false}
          listParam={myList}
          pageValue={pageValue}
        />
      )}

      {pageValue === "all" ? (
        <>
          <MoviesSlider
            title={"popular Movies"}
            url={`${apiRequests.base_url}/movie/popular${apiRequests.api_key}`}
            pageValue="movie"
          />
          <MoviesSlider
            title={"popular Tv Shows"}
            url={`${apiRequests.base_url}/tv/popular${apiRequests.api_key}`}
            pageValue="tv"
          />
        </>
      ) : (
        <MoviesSlider
          title={`popular ${pageValue === "movie" ? "Movies" : ""} ${
            pageValue === "tv" ? "Tv Shows" : ""
          }`}
          url={`${apiRequests.base_url}/${pageValue}/popular${apiRequests.api_key}`}
          pageValue={pageValue}
        />
      )}
      {(pageValue == "person" || pageValue == "all") && (
        <MoviesSlider
          title="People"
          url={`${apiRequests.TrendingBase_url}/person/week${apiRequests.api_key}`}
          pageValue={pageValue}
        />
      )}
    </main>
  );
};

export default RowContainer;
