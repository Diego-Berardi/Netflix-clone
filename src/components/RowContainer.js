import React from "react";
import apiRequests from "../apiRequest";

import MoviesSlider from "./MoviesSlider";
import { useGlobalContext } from "../context";
const RowContainer = ({ pageValue }) => {
  const { myList } = useGlobalContext();
  return (
    <main className="container">
      <section>
        <MoviesSlider
          title={"Trending Now"}
          url={`${apiRequests.TrendingBase_url}/${pageValue}/week${apiRequests.api_key}`}
        />
        {/* <MyListSlider /> */}
        <MoviesSlider title={"My List "} url={false} listParam={myList} />

        {pageValue === "all" ? (
          <>
            <MoviesSlider
              title={"Top Rated Movies"}
              url={`${apiRequests.base_url}/movie/top_rated${apiRequests.api_key}`}
              pageValue="movie"
            />
            <MoviesSlider
              title={"Top Rated Tv Shows"}
              url={`${apiRequests.base_url}/tv/top_rated${apiRequests.api_key}`}
              pageValue="tv"
            />
          </>
        ) : (
          <MoviesSlider
            title={`Top Rated ${pageValue === "movie" ? "Movies" : ""} ${
              pageValue === "tv" ? "Tv Shows" : ""
            }`}
            url={`${apiRequests.base_url}/${pageValue}/top_rated${apiRequests.api_key}`}
            pageValue={pageValue}
          />
        )}
        <MoviesSlider
          title={"Action"}
          url={`${apiRequests.GenresBase_url}/${
            pageValue === "all" ? "movie" : pageValue
          }${apiRequests.api_key}&with_genres=28`}
          pageValue={pageValue === "all" ? "movie" : pageValue}
        />
        <MoviesSlider
          title={"Action & Adventure"}
          url={`${apiRequests.GenresBase_url}/${
            pageValue === "all" ? "movie" : pageValue
          }${apiRequests.api_key}&with_genres=10759`}
          pageValue={pageValue === "all" ? "movie" : pageValue}
        />

        <MoviesSlider
          title={"Comedy"}
          url={`${apiRequests.GenresBase_url}/${
            pageValue === "all" ? "movie" : pageValue
          }${apiRequests.api_key}&with_genres=35`}
          pageValue={pageValue === "all" ? "movie" : pageValue}
        />
        <MoviesSlider
          title={"Crime"}
          url={`${apiRequests.GenresBase_url}/${
            pageValue === "all" ? "movie" : pageValue
          }${apiRequests.api_key}&with_genres=80`}
          pageValue={pageValue === "all" ? "movie" : pageValue}
        />
        <MoviesSlider
          title={"Documentary"}
          url={`${apiRequests.GenresBase_url}/${
            pageValue === "all" ? "movie" : pageValue
          }${apiRequests.api_key}&with_genres=99`}
          pageValue={pageValue === "all" ? "movie" : pageValue}
        />
        <MoviesSlider
          title={"Drama"}
          url={`${apiRequests.GenresBase_url}/${
            pageValue === "all" ? "movie" : pageValue
          }${apiRequests.api_key}&with_genres=18`}
          pageValue={pageValue === "all" ? "movie" : pageValue}
        />
      </section>
    </main>
  );
};

export default RowContainer;
