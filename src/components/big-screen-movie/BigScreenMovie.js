import React, { useState, useEffect } from "react";
import apiRequests from "../../apiRequest";
import { useGlobalContext } from "../../context";

import { FiInfo } from "react-icons/fi";

import { Link } from "react-router-dom";

//scss
import "./big-screen-movie.scss";

const BigScreenMovie = ({
  backdrop_path,
  poster_path,
  title,
  name,
  overview,
  media_type,
  id,
}) => {
  const [isInMyList, setIsInMyList] = useState(false);

  const { addMylist, removeFromMylist, checkIfMovieInList } =
    useGlobalContext();

  useEffect(() => {
    if (!id) return;
    if (checkIfMovieInList("myList", id)) setIsInMyList(true);
    else setIsInMyList(false);
  }, []);

  return (
    <section
      className="img-background"
      style={{
        backgroundImage: `url('${apiRequests.imgBase_url}${backdrop_path}')`,
      }}
    >
      <div className="background-big-screen-section">
        <div className="info-container">
          <h2>{title || name}</h2>
          {overview && <p>{overview.substring(0, 250)}...</p>}
          <div className="btn-container">
            {!isInMyList ? (
              <button
                className="btn btn-big-screen "
                onClick={() => {
                  addMylist("myList", { id, media_type, poster_path });
                  if (checkIfMovieInList("myList", id)) setIsInMyList(true);
                  else setIsInMyList(false);
                }}
              >
                Add to my list
              </button>
            ) : (
              <button
                className="btn btn-big-screen"
                onClick={() => {
                  removeFromMylist("myList", id);
                  if (checkIfMovieInList("myList", id)) setIsInMyList(true);
                  else setIsInMyList(false);
                }}
              >
                Remove from my list
              </button>
            )}
            <Link
              to={`/${media_type}/${id}`}
              className="btn btn-big-screen link-big-screen"
            >
              <FiInfo /> More Info
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BigScreenMovie;
