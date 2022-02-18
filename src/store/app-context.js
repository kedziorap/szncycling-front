import React, { useState } from 'react';

const AppContext = React.createContext({
  mobileMode: true,
  menuIsVisible: false,
  movies: [],
  setMovies: () => {},
  allMovies: null,
  setAllMovies: () => {},
  actualPage: null,
  setActualPage: () => {},
  searchingPlace: null,
  setSearchingPlace: () => {},
  firstTimeOn: null,
  setFirstTimeOn: () => {},
  loadingLang: true,
  setLoadingLang: () => {},
});

export const AppContextProvider = (props) => {
  const [isMobile, setIsMobile] = useState(true);
  const [menuIsVisible, setMenuIsVisible] = useState(false);
  const [movies, setMovies] = useState([]);
  const [allMovies, setAllMovies] = useState(0);
  const [actualPage, setActualPage] = useState(1);
  const [searchingPlace, setSearchingPlace] = useState(null);
  const [firstTimeOn, setFirstTimeOn] = useState(null);
  const [loadingLang, setLoadingLang] = useState(false);
  
  const setMobileIsActive = () => setIsMobile(true);
  const setMobileIsNotActive = () => setIsMobile(false);

  return (
    <AppContext.Provider
      value={{
        mobileMode: isMobile,
        setMobileIsActive,
        setMobileIsNotActive,
        menuIsVisible,
        setMenuIsVisible,
        movies,
        setMovies,
        allMovies,
        setAllMovies,
        actualPage,
        setActualPage,
        searchingPlace,
        setSearchingPlace,
        firstTimeOn,
        setFirstTimeOn,
        loadingLang,
        setLoadingLang
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};
export default AppContext;
