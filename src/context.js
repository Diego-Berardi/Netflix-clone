import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const navigate = useNavigate();

  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [searchValue, setSearchValue] = useState(null);
  const [showSearchBar, setShowSearchBar] = useState(false);

  const [list, setList] = useState(false);

  const checkIfMovieInList = (id) => {
    const myList = returnMyList();
    if (!myList) return;
    return myList.find((elem) => elem.id == id);
  };

  const removeFromMylist = (id) => {
    setList(!list); // force the render

    const tempList = returnMyList();
    const theObj = tempList.find((elem) => elem.id == id);
    const index = tempList.indexOf(theObj);
    tempList.splice(index, 1);

    setMyList(tempList);
  };

  const setMyList = (list) => {
    const listStringfy = JSON.stringify(list);

    localStorage.setItem("myList", listStringfy);
  };

  const returnMyList = () => {
    const listStr = localStorage.getItem("myList");
    if (!listStr) return;
    const list = JSON.parse(listStr);
    return list;
  };

  const addMylist = (movie) => {
    setList(!list); // force the render

    if (returnMyList()) {
      const duplicate = returnMyList().find((elem) => elem.id == movie.id);
      if (duplicate) return;
      const newList = returnMyList();
      newList.push(movie);

      setMyList(newList);
    } else {
      setMyList([movie]);
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
