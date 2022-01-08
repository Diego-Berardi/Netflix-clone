import React, { useEffect } from "react";
import { useGlobalContext } from "../../context";

import apiRequests from "../../apiRequest";
import useFetch from "../../useFetch";

// components
import MoviesSlider from "../movie-slider/MoviesSlider";
import BigScreenMovie from "../big-screen-movie/BigScreenMovie";


const RowContainer = ({ pageValue }) => {
  const { returnMyList } = useGlobalContext();

  const myList = returnMyList('myList');
  const watchedList = returnMyList("watchedList");

  const { data, fetchData } = useFetch(
    `${apiRequests.TrendingBase_url}/${pageValue}/week`
  );

  const getIndex = () => {
    const now = new Date().getTime();
    return Math.round(Math.round(now / 1000) / (60 * 5)) % 20;
  };

  useEffect(() => {
    fetchData(
      `${apiRequests.TrendingBase_url}/${pageValue}/week`
    );
  }, [pageValue]);
  return (
    <main className="">
      {data && pageValue !== "person" && (
        <BigScreenMovie {...data.results[getIndex()]} />
      )}
      <MoviesSlider
        title={"Trending Now"}
        url={`${apiRequests.TrendingBase_url}/${pageValue}/week`}
      />

      {!(pageValue == "person") && (
        <MoviesSlider
          title={"My List "}
          url={false}
          listParam={myList}
          pageValue={pageValue}
        />
      )}
      {!(pageValue == "person") && (
        <MoviesSlider
          title={"Watched List "}
          url={false}
          listParam={watchedList}
          pageValue={pageValue}
        />
      )}

      {pageValue === "all" ? (
        <>
          <MoviesSlider
            title={"popular Movies"}
            url={`${apiRequests.base_url}/movie/popular`}
            pageValue="movie"
          />
          <MoviesSlider
            title={"popular Tv Shows"}
            url={`${apiRequests.base_url}/tv/popular`}
            pageValue="tv"
          />
        </>
      ) : (
        <MoviesSlider
          title={`popular ${pageValue === "movie" ? "Movies" : ""} ${
            pageValue === "tv" ? "Tv Shows" : ""
          }`}
          url={`${apiRequests.base_url}/${pageValue}/popular`}
          pageValue={pageValue}
        />
      )}
      {(pageValue == "person" || pageValue == "all") && (
        <MoviesSlider
          title="People"
          url={`${apiRequests.TrendingBase_url}/person/week`}
          pageValue={pageValue}
        />
      )}
    </main>
  );
};

export default RowContainer;
