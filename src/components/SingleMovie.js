import React from "react";
import { Link } from "react-router-dom";

const SingleMovie = ({ title, id, img_url, media_type }) => {
  return (
    <article className="single-Movie">
      <Link to={`/${media_type}/${id}`}>
        <img src={img_url} alt="" />
      </Link>
    </article>
  );
};

export default SingleMovie;
