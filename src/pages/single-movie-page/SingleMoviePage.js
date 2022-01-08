import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../context";

import useFetch from "../../useFetch";
import apiRequests from "../../apiRequest";

// components
import Header from "../../components/header/Header";
import MobileMenu from "../../components/mobile-menu/MobileMenu";
import SearchBar from "../../components/search-bar/SearchBar";
import MoviesSlider from "../../components/movie-slider/MoviesSlider";

// scss
import "./single-movie-page.scss";

import { MdDone } from "react-icons/md";

const SingleMoviePage = () => {
  const { addMylist, removeFromMylist, checkIfMovieInList, showSearchBar } =
    useGlobalContext();
  const { id, media_type } = useParams();

  const [isInMyList, setIsInMyList] = useState(false);
  const [isInWatchedList, setIsInWatchedList] = useState(false);

  const { data, isLoading, isError, fetchData } = useFetch(
    `${apiRequests.base_url}/${media_type}/${id}`
  );
  const { data: videos, fetchData: fetchVideo } = useFetch(
    `${apiRequests.base_url}/${media_type}/${id}/videos`
  );
  const { data: credits, fetchData: fetchCredits } = useFetch(
    `${apiRequests.base_url}/${media_type}/${id}/credits`
  );

  useEffect(() => {
    if (checkIfMovieInList("myList", id)) setIsInMyList(true);
    else setIsInMyList(false);

    if (checkIfMovieInList("watchedList", id)) setIsInWatchedList(true);
    else setIsInWatchedList(false);

    fetchData(
      `${apiRequests.base_url}/${media_type}/${id}`
    );
    fetchVideo(
      `${apiRequests.base_url}/${media_type}/${id}/videos`
    );
    fetchCredits(
      `${apiRequests.base_url}/${media_type}/${id}/credits`
    );
  }, [id]);

  if (isLoading) return <></>;
  if (isError) return <></>;
  if (!data) return <></>;

  const {
    name,
    title,
    poster_path,
    backdrop_path,
    overview,
    vote_average,
    release_date,
    genres,
  } = data;

  let trailerObj;
  if (videos) {
    const listVideosRev = [...videos.results].reverse();
    trailerObj = listVideosRev.find((elem) => elem.type === "Trailer");
  }

  return (
    <>
      <Header />
      <MobileMenu />
      {showSearchBar && (
        <div className="search-bar-mobile">
          <SearchBar />
        </div>
      )}
      <main>
        <section className=" movie-page">
          <div
            className="img-background"
            style={{
              backgroundImage: `url('${apiRequests.imgBase_url}${backdrop_path}')`,
            }}
          >
            <div className="background-single-movie-page">
              <div className="movie-div">
                <img src={`${apiRequests.imgBase_url}${poster_path}`} alt="" />
                <div className="info">
                  <div className="display-flex">
                    <h2>{title || name}</h2>
                    {release_date && <p>( {release_date.split("-")[0]} )</p>}
                  </div>
                  <div className="display-flex">
                    <div className="vote-avarage">
                      <p>{vote_average * 10}%</p>
                    </div>
                    <div className="genres-div">
                      {genres &&
                        genres.map((elem, i) => {
                          return <p key={i}>- {elem.name}</p>;
                        })}
                    </div>
                  </div>
                  <p>{overview}</p>
                  <div className="display-flex btn-div">
                    {!isInMyList ? (
                      <button
                        className="btn btn-MyList "
                        onClick={() => {
                          addMylist("myList", { id, media_type, poster_path });
                          if (checkIfMovieInList("myList", id))
                            setIsInMyList(true);
                          else setIsInMyList(false);
                        }}
                      >
                        Add to my list
                      </button>
                    ) : (
                      <button
                        className="btn btn-MyList"
                        onClick={() => {
                          removeFromMylist("myList", id);

                          if (checkIfMovieInList("myList", id))
                            setIsInMyList(true);
                          else setIsInMyList(false);
                        }}
                      >
                        Remove from my list
                      </button>
                    )}
                    {!isInWatchedList ? (
                      <button
                        className="btn btn-MyList "
                        onClick={() => {
                          addMylist("watchedList", {
                            id,
                            media_type,
                            poster_path,
                          });
                          if (checkIfMovieInList("watchedList", id))
                            setIsInWatchedList(true);
                          else setIsInWatchedList(false);
                        }}
                      >
                        watched it?
                      </button>
                    ) : (
                      <button
                        className="btn btn-MyList"
                        onClick={() => {
                          removeFromMylist("watchedList", id);

                          if (checkIfMovieInList("watchedList", id))
                            setIsInWatchedList(true);
                          else setIsInWatchedList(false);
                        }}
                      >
                        <MdDone />
                      </button>
                    )}
                  </div>
                </div>
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
              url={`${apiRequests.base_url}/${media_type}/${id}/similar`}
              pageValue={media_type}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default SingleMoviePage;
