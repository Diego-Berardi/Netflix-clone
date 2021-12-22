import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useFetch from "../useFetch";
import apiRequest from "../apiRequest";
import { useGlobalContext } from "../context";

import Header from "../components/Header";
import MobileMenu from "../components/MobileMenu";
import MoviesSlider from "../components/MoviesSlider";

const SingleMoviePage = () => {
  const { addMylist, removeFromMylist, checkIfMovieList } = useGlobalContext();
  const { id, media_type } = useParams();

  const [isInMyList, setIsInMyList] = useState(false);

  const { data, isLoading, isError, fetchData } = useFetch(
    `${apiRequest.base_url}/${media_type}/${id}${apiRequest.api_key}`
  );
  const { data: videos, fetchData: fetchVideo } = useFetch(
    `${apiRequest.base_url}/${media_type}/${id}/videos${apiRequest.api_key}`
  );
  const { data: credits, fetchData: fetchCredits } = useFetch(
    `${apiRequest.base_url}/${media_type}/${id}/credits${apiRequest.api_key}`
  );
  console.log(credits);

  useEffect(() => {
    if (checkIfMovieList(id)) setIsInMyList(true);
    else setIsInMyList(false);
    fetchData(
      `${apiRequest.base_url}/${media_type}/${id}${apiRequest.api_key}`
    );
    fetchVideo(
      `${apiRequest.base_url}/${media_type}/${id}/videos${apiRequest.api_key}`
    );
    fetchCredits(
      `${apiRequest.base_url}/${media_type}/${id}/credits${apiRequest.api_key}`
    );
  }, [id]);

  if (isLoading) return <></>;
  if (isError) return <></>;
  if (!data) return <></>;
  // console.log(data)

  const {
    name,
    title,
    poster_path,
    overview,
    vote_average,
    release_date,
    genres,
  } = data;

  let trailerObj;
  if (videos) {
    trailerObj = videos.results.find(
      (elem) => (elem.name = "Official Trailer")
    );
  }

  return (
    <>
      <Header />
      <MobileMenu />
      <main>
        <section className="container movie-page">
          <div className="movie-div">
            <img src={`${apiRequest.imgBase_url}${poster_path}`} alt="" />
            <div className="info">
              <div className="header-info">
                <h2>{title || name}</h2>
                <p>{vote_average}</p>
              </div>
              <p>{release_date}</p>
              <p>{overview}</p>
              <div className="genres-div">
                Genres:
                {genres && genres.map((elem, i) => {
                  return <p key={i}>{elem.name}</p>;
                })}
              </div>
              <div>
                {!isInMyList ? (
                  <button
                    className="btn btn-info "
                    onClick={() => {
                      addMylist({ id, media_type, poster_path });
                      if (checkIfMovieList(id)) setIsInMyList(true);
                      else setIsInMyList(false);
                    }}
                  >
                    Add to my list
                  </button>
                ) : (
                  <button
                    className="btn btn-info"
                    onClick={() => {
                      removeFromMylist(id);
                      if (checkIfMovieList(id)) setIsInMyList(true);
                      else setIsInMyList(false);
                    }}
                  >
                    Remove from my list
                  </button>
                )}
              </div>
            </div>
          </div>
          <div>
            {credits && (
              <MoviesSlider
                title="Cast"
                url={false}
                listParam={credits.cast}
                pageValue="person"
              />
            )}
          </div>
          {trailerObj && (
            <div className="video-div">
              <div>
                <iframe
                  width="590"
                  height="315"
                  src={`https://www.youtube.com/embed/${trailerObj.key}`}
                  title="YouTube video player"
                  frameBorder="0"
                ></iframe>
              </div>
            </div>
          )}
          <div className="similar-container">
            <MoviesSlider
              title="Similar"
              url={`${apiRequest.base_url}/${media_type}/${id}/similar${apiRequest.api_key}`}
              pageValue={media_type}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default SingleMoviePage;
