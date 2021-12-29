import React, { useEffect, useRef } from "react";
import useFetch from "../useFetch";

import SingleMovie from "./SingleMovie";

import apiRequests from "../apiRequest";

const MoviesSlider = ({ title, url, pageValue, listParam }) => {
  const { data, isLoading, isError, fetchData } = useFetch(url);

  useEffect(() => {
    fetchData(url);
  }, [url]);

  let list;

  if (url) {
    if (isLoading) return <></>;
    if (isError) return <></>;
    if (!data) return <></>;

    list = data.results;
  } else {
    if (!listParam) return <></>;
    list = listParam;

    if (pageValue == "tv" || pageValue == "movie") {
      list = list.filter((elem) => elem.media_type == pageValue);
    }
  }

  return (
    <>
      {list.length > 0 && (
        <section className=" container movie-slider-container">
          <h2>{title}</h2>
          <div className="movie-slider-container2">
            <div className="movie-slider">
              {list.map((elem, i) => {
                if (!(elem.poster_path || elem.profile_path)) return;
                const img_url = `${apiRequests.imgBase_url}${
                  elem.poster_path || elem.profile_path
                }`;

                return (
                  <SingleMovie
                    key={elem.id}
                    {...elem}
                    img_url={img_url}
                    media_type={elem.media_type || pageValue}
                  />
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default MoviesSlider;
