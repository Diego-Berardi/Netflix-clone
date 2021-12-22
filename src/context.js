import React, { useContext, useEffect, useState } from "react";

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [myList, setMylist] = useState([]);
  console.log(myList);

  const checkIfMovieList = (id) => {
    return myList.find((elem) => elem.id === id)
  };

  const removeFromMylist= (id)=>{
    const tempList = myList
    const theObj = tempList.find((elem) => elem.id === id)
    const index = tempList.indexOf(theObj)
    tempList.splice(index, 1)
    setMylist(tempList)
    setLocalStorageList()
  }

  const setLocalStorageList = () => {
    let listStringfy = myList;
    listStringfy = JSON.stringify(listStringfy);

    localStorage.setItem("myList", listStringfy);
  };

  const getLocalStorageList = () => {
    let list = localStorage.getItem("myList");
    if (!list) return setMylist([]);
    list = JSON.parse(list);
    setMylist(list);
  };

  const addMylist = (movie) => {
    const prova = myList.find((elem) => elem.id === movie.id);
    if (prova) return;
    const tempArr = myList;
    tempArr.push(movie);
    setMylist(tempArr);
    setLocalStorageList();
  };

  useEffect(() => {
    
    getLocalStorageList();
  }, []);

  return (
    <AppContext.Provider
      value={{
        showMobileMenu,
        setShowMobileMenu,
        addMylist,
        removeFromMylist,
        checkIfMovieList,
        myList,
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
