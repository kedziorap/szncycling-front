import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
} from 'react';
import { get } from '../../api';
import { debounced} from '../../helpers/functions';
import { useDispatch, useSelector } from 'react-redux';
import { moviesActions } from '../../redux/slices/movies';
import useInput from '../../hooks/use-input';
import useTranslator from '../../hooks/use-translator';

import MovieInfromer from './MovieInformer';
import Button from '../UI/Button';
import Input from '../UI/Input';
import StreetName from '../Streets/StreetName';

import styles from './Searcher.module.scss';

const Searcher = (props) => {
  const {isLoading: listIsLoading} = props;
  const dispatch = useDispatch();
  const searchingPlace = useSelector((state) => state.movies.searchingPlace);
  const allMovies = useSelector((state) => state.movies.allMovies);
  const actualPage = useSelector((state) => state.movies.page);
  const setActualPage = (number) => dispatch(moviesActions.setPage(number));
  const setSearchingPlace = (place) => dispatch(moviesActions.setSearchingPlace(place));
  
  const [placesList, setPlacesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [placeSelected, setPlaceSelected] = useState(null);
  const [initial, setInitial] = useState(true);
  const [error, setError] = useState(false)
  const [pageIsActive, setPageIsActive] = useState(true)
  const inputEl = useRef(null);
  const { value: placeName, setValue: setPlaceName } = useInput();

  const errorConnectTxt = useTranslator('errors.connect');
  const errorTxt = useTranslator('errors.occurred');
  const placesTxt = useTranslator('tracks.places');
  const citiesTxt = useTranslator('tracks.cities');
  const searchingTxt = useTranslator('tracks.searching');
  const minLengthTxt = useTranslator('tracks.min_length');
  const nothingFoundTxt = useTranslator('tracks.nothing_found');
  const searchForTxt = useTranslator('tracks.search_for');
  const searchBtnTxt = useTranslator('tracks.search');
  const showAllTxt = useTranslator('tracks.show_all')

  const debounceGet = useCallback(
    debounced((nextValue) => getPlaces(nextValue), 500),
    []
  );
  useEffect(() => {
    setInitial(false);
    return () => {
      setPageIsActive(false)
    }
  }, []);
  const getPlaces = (phrase) => {
    setError(false);
    get(`places?search=${phrase}`).then((res) => {
      if (pageIsActive) {
        const { data, status } = res;
        //console.log(data);
        setIsLoading(false);
        if (status === 200) {
          setPlacesList(data.places);
          setCitiesList(data.cities)
        } else if (status === 404) {
          setError(errorConnectTxt)
        } else {
          setError(errorTxt)
        }
      }
    });
  };

  const onChangeHandler = (event) => {
    const phrase = event.target.value;
    setPlaceName(phrase);
    if (phrase.length > 2) {
      setIsLoading(true);
      debounceGet(phrase);
    }
  };

  const setPlaceToShow = (place) => {
    //setSearchingPlace(place);
    setPlaceSelected(place);
    // setInitial(false);
  };

  const onFocusHandler = () => {
    setIsActive(true);
  };

  const onBlurHandler = () => {
    setTimeout(() => {
      setIsActive(false);
    }, 500);
  };

  const clearPlace = () => {
    //setSearchingPlace(null);
    setPlaceSelected(null);
    setPlaceName('');
  };

  const searchPlaceToShow = () => {
    setActualPage(1);
    setSearchingPlace(placeSelected);
    setPlaceSelected(null);
    setPlaceName('')
   // console.log('selected');
  };

  const resetList = () => {
    setSearchingPlace(null);
    if (actualPage !== 1) setActualPage(1);
  };

  const places = placesList.map((place) => {
    return (
      <li
        key={place.id}
        onClick={() => setPlaceToShow({...place, typePlace: 'place'})}
        className={styles.element}
      >
        <StreetName place={place} details/>
      </li>
    );
  });
  const cities = citiesList.map((place) => {
    return (
      <li
        key={place.id}
        onClick={() => setPlaceToShow({...place, typePlace: 'city'})}
        className={styles.element}
      >
        <StreetName place={place} details onlytowns/>
      </li>
    );
  });

  let dropdown;
  if (error && isActive) {
   dropdown = <ul className={styles.dropdown}>
        <li>{error}</li>
      </ul>
  } else if (isLoading && placeName.length > 2 && isActive) {
    dropdown = (
      <ul className={styles.dropdown}>
        <li>{searchingTxt}</li>
      </ul>
    );
  } else if (placeName.length < 3 && isActive) {
    dropdown = (
      <ul className={styles.dropdown}>
        <li>{minLengthTxt}</li>
      </ul>
    );
  } else if (placeName.length > 2 && (placesList.length || citiesList.length) && isActive) {
    dropdown = <ul className={styles.dropdown}>
    {places.length ? <><li className={styles.listTitle}>{placesTxt}</li>{places}</>:null}
    {cities.length ? <><li className={styles.listTitle}>{citiesTxt}</li>{cities}</>:null}
    </ul>;
  } else if (placesList.length === 0 && citiesList.length === 0 &&isActive) {
    dropdown = (
      <ul className={styles.dropdown}>
        <li>{nothingFoundTxt}</li>
      </ul>
    );
  } else {
    dropdown = null;
  }

  let output;
  if (placeSelected) {
    //{placeSelected.typePlace === 'place'? getNamePlace(placeSelected, true): placeSelected.city === placeSelected.commune ? placeSelected.city : `${placeSelected.city}, ${communeTxt} ${placeSelected.commune}`}
    output = (
      <>
      <div className={styles.inputWrapper}>
        <div className={styles.labelInput}>{searchForTxt}:</div>
        <div className={styles.label}>
          <StreetName place={placeSelected} details onlytowns={placeSelected.typePlace === 'city'}/>
          <span onClick={clearPlace}>
            <i className="icon-cancel-1" />
          </span>
        </div>
        </div>
        <Button onClick={searchPlaceToShow}>{searchBtnTxt}</Button>
      </>
    );
  } else {
    output = (
      <>
        <div className={styles.inputWrapper}>
          <div className={styles.labelInput}>{searchForTxt}:</div>
          <Input
            value={placeName}
            onChange={onChangeHandler}
            isValid={true}
            maxlength="20"
            ref={inputEl}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
          />
          {dropdown}
        </div>
        <Button onClick={resetList} disabled={!searchingPlace}>
         {showAllTxt}
        </Button>
      </>
    );
  }
  return (
    <div>
      <div className={styles.WrapperSearch}>{output}</div>
      <MovieInfromer all={allMovies} isLoading={listIsLoading}/>
    </div>
  );
};

export default Searcher;
