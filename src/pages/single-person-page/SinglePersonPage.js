import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../../context";

import useFetch from "../../useFetch";
import apiRequest from "../../apiRequest";

// components
import Header from "../../components/header/Header";
import MobileMenu from "../../components/mobile-menu/MobileMenu";
import SearchBar from "../../components/search-bar/SearchBar";
import MoviesSlider from "../../components/movie-slider/MoviesSlider";

// scss
import "./single-person-page.scss";

const SinglePersonPage = () => {
  const { showSearchBar } = useGlobalContext();
  const { id } = useParams();

  const { data, isLoading, isError, fetchData } = useFetch(
    `${apiRequest.base_url}/person/${id}`
  );
  const { data: credits } = useFetch(
    `${apiRequest.base_url}/person/${id}/combined_credits`
  );

  useEffect(() => {
    fetchData(`${apiRequest.base_url}/person/${id}`);
  }, [id]);

  if (isLoading) return <></>;
  if (isError) return <></>;
  if (!data) return <></>;

  const { name, birthday, biography, profile_path } = data;

  const biographyArr = biography.split(/\r?\n/);

  // sort by popularity and remove duplicate from the array
  let creditsUniq;
  if (credits) {
    creditsUniq = credits.cast.filter((item, i) => {
      return credits.cast.findIndex((elem) => elem.id == item.id) == i;
    });
    creditsUniq = creditsUniq
      .sort((a, b) => {
        return Math.round(a.popularity) - Math.round(b.popularity);
      })
      .reverse();
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
        <section className="container movie-page">
          <div className="movie-div">
            <img src={`${apiRequest.imgBase_url}${profile_path}`} alt="" />
            <div className="info">
              <div className="header-info">
                <h2>{name}</h2>
              </div>
              <p>{birthday}</p>
              <div className="biography">
                {biographyArr.map((elem, i) => {
                  return <p key={i}>{elem}</p>;
                })}
              </div>
            </div>
          </div>
          <div>
            {credits && (
              <MoviesSlider
                title="Movies and Tv Shows"
                url={false}
                listParam={creditsUniq}
              />
            )}
          </div>
        </section>
      </main>
    </>
  );
};

export default SinglePersonPage;
