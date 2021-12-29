import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context";

import useFetch from "../useFetch";
import apiRequests from "../apiRequest";

import Header from "../components/Header";
import MobileMenu from "../components/MobileMenu";
import SearchBar from "../components/SearchBar";
import MoviesSlider from "../components/MoviesSlider";

const SingleMoviePage = () => {
  const { addMylist, removeFromMylist, checkIfMovieInList, showSearchBar } =
    useGlobalContext();
  const { id, media_type } = useParams();

  const [isInMyList, setIsInMyList] = useState(false);

  const { data, isLoading, isError, fetchData } = useFetch(
    `${apiRequests.base_url}/${media_type}/${id}${apiRequests.api_key}`
  );
  const { data: videos, fetchData: fetchVideo } = useFetch(
    `${apiRequests.base_url}/${media_type}/${id}/videos${apiRequests.api_key}`
  );
  const { data: credits, fetchData: fetchCredits } = useFetch(
    `${apiRequests.base_url}/${media_type}/${id}/credits${apiRequests.api_key}`
  );

  useEffect(() => {
    if (checkIfMovieInList(id)) setIsInMyList(true);
    else setIsInMyList(false);
    fetchData(
      `${apiRequests.base_url}/${media_type}/${id}${apiRequests.api_key}`
    );
    fetchVideo(
      `${apiRequests.base_url}/${media_type}/${id}/videos${apiRequests.api_key}`
    );
    fetchCredits(
      `${apiRequests.base_url}/${media_type}/${id}/credits${apiRequests.api_key}`
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
                  <div>
                    {!isInMyList ? (
                      <button
                        className="btn btn-MyList "
                        onClick={() => {
                          addMylist({ id, media_type, poster_path });
                          if (checkIfMovieInList(id)) setIsInMyList(true);
                          else setIsInMyList(false);
                        }}
                      >
                        Add to my list
                      </button>
                    ) : (
                      <button
                        className="btn btn-MyList"
                        onClick={() => {
                          removeFromMylist(id);
                          if (checkIfMovieInList(id)) setIsInMyList(true);
                          else setIsInMyList(false);
                        }}
                      >
                        Remove from my list
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
              url={`${apiRequests.base_url}/${media_type}/${id}/similar${apiRequests.api_key}`}
              pageValue={media_type}
            />
          </div>
        </section>
      </main>
    </>
  );
};

export default SingleMoviePage;
