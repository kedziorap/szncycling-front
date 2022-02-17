import React, {useState} from 'react';

const MovieContext = React.createContext({
  movie: null,
  place: null,
  listPlace: [],
  setMovie: (movie)=>{},
  setPlace: (place)=>{},
})

export const MovieContextProvider = (props) => {

  const [movie, setMovie] = useState(null);
  const [place, setPlace] = useState(null);
  const [listPlace, setListPlace] = useState(null);

  const setSelectMovie = (data) => {
    setMovie(data);
    setListPlace(data.places);
  }

  return (
    <MovieContext.Provider value={{
      movie,
      place,
      listPlace,
      setSelectMovie,
      setPlace,
      setListPlace
    }}>
      {props.children}
    </MovieContext.Provider>
  )
}
export default MovieContext;