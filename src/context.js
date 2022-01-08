import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchValue, setSearchValue] = useState(null);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const [list, setList] = useState(false);

  const checkIfMovieInList = (nameList, id) => {
    const myList = returnMyList(nameList);
    if (!myList) return;
    return myList.find((elem) => elem.id == id);
  };

  const removeFromMylist = (nameList, id) => {
    setList(!list); // force the render

    const tempList = returnMyList(nameList);
    const theObj = tempList.find((elem) => elem.id == id);
    const index = tempList.indexOf(theObj);
    tempList.splice(index, 1);

    setMyList(nameList, tempList);
  };

  const setMyList = (nameList, list) => {
    const listStringfy = JSON.stringify(list);

    localStorage.setItem(nameList, listStringfy);
  };

  const returnMyList = (nameList) => {
    const listStr = localStorage.getItem(nameList);
    if (!listStr) return;
    const list = JSON.parse(listStr);
    return list;
  };

  const addMylist = (nameList, movie) => {
    setList(!list); // force the render

    if (returnMyList(nameList)) {
      const duplicate = returnMyList(nameList).find(
        (elem) => elem.id == movie.id
      );
      if (duplicate) return;
      const newList = returnMyList(nameList);
      newList.push(movie);

      setMyList(nameList, newList);
    } else {
      setMyList(nameList, [movie]);
    }
  };

  const handleChange = (e) => {
    setSearchValue(e.target.value);
    navigate("/");
  };

  return (
    <AppContext.Provider
      value={{
        showMobileMenu,
        setShowMobileMenu,
        showSearchBar,
        setShowSearchBar,

        addMylist,
        removeFromMylist,
        checkIfMovieInList,
        returnMyList,

        handleChange,
        searchValue,
        setSearchValue,

        showSearchBar,
        setShowSearchBar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };
