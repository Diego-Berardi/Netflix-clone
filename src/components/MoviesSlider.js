import React, { useEffect, useRef } from "react";
import useFetch from "../useFetch";
import { useGlobalContext } from "../context";

import SingleMovie from "./SingleMovie";

import apiRequests from "../apiRequest";

import { MdArrowBackIosNew } from "react-icons/md";
import { MdArrowForwardIos } from "react-icons/md";

const MoviesSlider = ({ title, url, pageValue, listParam }) => {
  let scroolPerClick = 400;
  let scroolAmount = 0;

  const refMovieSlider = useRef(null);

  const scroolLeft = () => {
    refMovieSlider.current.scrollTo({
      top: 0,
      left: (scroolAmount -= scroolPerClick),
      behavior: "smooth",
    });
    if (scroolAmount < 0) {
      scroolAmount = 0;
    }
  };
  const scroolRight = () => {
    refMovieSlider.current.scrollTo({
      top: 0,
      left: (scroolAmount += scroolPerClick),
      behavior: "smooth",
    });

    if (scroolAmount > 2300) {
      scroolAmount = 2300;
    }
  };

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
    console.log(listParam);
    list = listParam;
    console.log(list);
  }

  return (
    <>
      {!(list.length < 1) && (
        <div className="movie-slider-container">
          <h2>{title}</h2>
          <div className="movie-slider-container2">
            <div className="before" onClick={scroolLeft}>
              <MdArrowBackIosNew />
            </div>
            <div className="movie-slider" ref={refMovieSlider}>
              {list.map((elem, i) => {
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
            <div className="after" onMouseDown={scroolRight}>
              <MdArrowForwardIos />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MoviesSlider;
