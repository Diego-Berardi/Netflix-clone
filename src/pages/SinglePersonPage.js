import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

import useFetch from "../useFetch";
import apiRequest from "../apiRequest";
import { useGlobalContext } from "../context";

import Header from "../components/Header";
import MobileMenu from "../components/MobileMenu";
import SearchBar from '../components/SearchBar'
import MoviesSlider from "../components/MoviesSlider";

const SinglePersonPage = () => {
  const { showSearchBar } =
    useGlobalContext();
  const { id } = useParams();

  const { data, isLoading, isError, fetchData } = useFetch(
    `${apiRequest.base_url}/person/${id}${apiRequest.api_key}`
  );
  const { data: credits } = useFetch(
    `${apiRequest.base_url}/person/${id}/combined_credits${apiRequest.api_key}`
  );


  useEffect(() => {
    fetchData(`${apiRequest.base_url}/person/${id}${apiRequest.api_key}`);
  }, [id]);

  if (isLoading) return <></>;
  if (isError) return <></>;
  if (!data) return <></>;
  //   console.log(data);

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
                {/* <p>{vote_average}</p> */}
              </div>
              <p>{birthday}</p>
              <div className="biography">
                {/* {showBio ? biography : `${biography.substring(0, 700)}`} */}
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
