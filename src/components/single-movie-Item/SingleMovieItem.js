import React from "react";
import { Link } from "react-router-dom";

// scss
import "./single-movie-item.scss";

const SingleMovie = ({ name, title, id, img_url, media_type }) => {
  return (
    <>
      {img_url && (
        <article className="single-Movie">
          <Link to={`/${media_type}/${id}`}>
            <img src={img_url} alt="" />
            {media_type === "person" && <span>{name || title}</span>}
          </Link>
        </article>
      )}
    </>
  );
};

export default SingleMovie;
