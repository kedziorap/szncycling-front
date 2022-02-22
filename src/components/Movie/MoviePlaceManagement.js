import { useContext, useState } from 'react';
import MovieContext from '../../store/movie-context';
import useTranslator from '../../hooks/use-translator';

import MoviePlace from './MoviePlace';
import Button from '../UI/Button';

import styles from './MoviePlaceManagement.module.scss';

const MoviePlaceManagement = (props) => {
  const ctxMovie = useContext(MovieContext);
  const { listPlace, movie, setListPlace } = ctxMovie;
  const [inputValue, setInputValue] = useState('');

  const filterPlaceTxt = useTranslator('track.filter_place')
  const clearTxt = useTranslator('track.clear');
  const nothingFoundTxt = useTranslator('track.nothing_found');

  const inputChangeHandler = (event) => {
    const phrase = event.target.value;
    setInputValue(phrase);
    const places = movie.places.filter(
      (place) =>
        (place.name && place.name.toLowerCase().includes(phrase.toLowerCase())) ||
        (place.city && place.city.toLowerCase().includes(phrase.toLowerCase())) ||
        (place.commune && place.commune.toLowerCase().includes(phrase.toLowerCase()))
    );
    setListPlace(places);
  };

  const clearInputHandler =() => {
    setInputValue('');
    setListPlace(movie.places);
  }

  const listElements = listPlace.map((place) => (
    <MoviePlace key={place.id} place={place} click={props.clickOnPlace} />
  ));

  return (
    <div>
      <div className={styles.input}>
        <input
          type="text"
          placeholder={filterPlaceTxt}
          value={inputValue}
          onChange={inputChangeHandler}
        />
        <Button className="btn" type="button" onClick={clearInputHandler}>
          {clearTxt}
        </Button>
      </div>
      <ul className={styles.list}>{listElements.length ? listElements : <li>{nothingFoundTxt}</li>}</ul>
    </div>
  );
};

export default MoviePlaceManagement;
