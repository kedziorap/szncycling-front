import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  useReducer
} from 'react';
import { get } from '../../api';
import { debounced } from '../../helpers/functions';
import { useDispatch, useSelector } from 'react-redux';
import { moviesActions } from '../../redux/slices/movies';
import useInput from '../../hooks/use-input';
import useTranslator from '../../hooks/use-translator';

import MovieInfromer from './MovieInformer';
import Button from '../UI/Button';
import Input from '../UI/Input';
import StreetName from '../Streets/StreetName';

import styles from './Searcher.module.scss';
const stateReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return {
      active: true,
      loading: true
    }
  }
  if (action.type === 'FOCUS') {
    return {
      active: true,
      loading: false
    }
  }
  if (action.type === 'BLUR') {
    return {
      active: false,
      loading: false
    }
  }
  if (action.type === 'LOAD') {
    return {
      active: state.active,
      loading: false
    }
  }
  return {
    loading: false,
    active: false
  }
}
const Searcher = (props) => {
  const { isLoading: listIsLoading } = props;
  const dispatch = useDispatch();
  const searchingPlace = useSelector((state) => state.movies.searchingPlace);
  const allMovies = useSelector((state) => state.movies.allMovies);
  const actualPage = useSelector((state) => state.movies.page);
  const setActualPage = (number) => dispatch(moviesActions.setPage(number));
  const setSearchingPlace = (place) => dispatch(moviesActions.setSearchingPlace(place));

  const [state, dispatchState] = useReducer(stateReducer, {loading: false, active: false})
  const [placesList, setPlacesList] = useState([]);
  const [citiesList, setCitiesList] = useState([]);
  const [placeSelected, setPlaceSelected] = useState(null);
  const [error, setError] = useState(false)
  const [pageIsActive, setPageIsActive] = useState(true)
  const inputEl = useRef(null);
  const dropRef = useRef(null);
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
    return () => {
      setPageIsActive(false)
    }
  }, []);
  useEffect(() => {
    const scrollerFn = (e) => {
      if (["ArrowUp", "ArrowDown"].indexOf(e.code) > -1 && state.active) {
        e.preventDefault();
      }
    }
    window.addEventListener("keydown", scrollerFn, false);
    return () => {
      window.removeEventListener("keydown", scrollerFn, false);
    }
  }, [state.active]);

  const handleRef = (e) => {
    const index = + e.target.dataset.index;
    const all = dropRef.current.querySelectorAll('li[tabindex="-1"]');
    if (e.keyCode === 13) {
      e.target.click();
    }
    if (e.keyCode === 40) {
      if (index + 1 < all.length) {
        const newIndex = index + 1;

        all[newIndex].focus()
      }
    }
    if (e.keyCode === 38) {
      if (index - 1 >= 0) {
        const newIndex = index - 1;
        all[newIndex].focus()
      } else {
        inputEl.current.focus()
      }
    }
  }

  const getPlaces = (phrase) => {
    setError(false);
    get(`places?search=${phrase}`).then((res) => {

      if (pageIsActive) {
        const { data, status } = res;
        //setIsLoading(false);
        dispatchState({type: 'LOAD'});
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
      dispatchState({type: 'INPUT'});
      debounceGet(phrase);
    }
  };
  const onKeyDown = (event) => {
    if (event.keyCode === 40 && dropRef.current) {
      inputEl.current.blur()
      dropRef.current.querySelectorAll('li[tabindex="-1"]')[0].focus()
    }
  }

  const setPlaceToShow = (place) => {
    dispatchState({type: 'BLUR'});
    setPlaceSelected(place);
  };

  const onFocusHandler = () => {
    dispatchState({type: 'FOCUS'});
  };

  const onBlurHandler = () => {
    setTimeout(() => {
      const elem = document.activeElement;
      if (+elem.getAttribute('tabindex') !== -1) {
        dispatchState({type: 'BLUR'});
      }

    }, 500);
  };

  const clearPlace = () => {
    setPlaceSelected(null);
    setPlaceName('');
  };

  const searchPlaceToShow = () => {
    setActualPage(1);
    dispatchState({type:''});
    setSearchingPlace(placeSelected);
    setPlaceSelected(null);
    setPlaceName('')
  };

  const resetList = () => {
    setSearchingPlace(null);
    if (actualPage !== 1) setActualPage(1);
  };

  const places = placesList.map((place, index) => {
    return (
      <li
        tabIndex="-1"
        key={place.id}
        data-index={index}
        onClick={() => setPlaceToShow({ ...place, typePlace: 'place' })}
        className={styles.element}
      >
        <StreetName place={place} details />
      </li>
    );
  });
  const cities = citiesList.map((place, index) => {
    return (
      <li
        tabIndex="-1"
        key={place.id}
        data-index={index + places.length}
        onClick={() => setPlaceToShow({ ...place, typePlace: 'city' })}
        className={styles.element}
      >
        <StreetName place={place} details onlytowns />
      </li>
    );
  });
  const myBlu = () => {
    setTimeout(() => {
      const elem = document.activeElement;
      if (+elem.getAttribute('tabindex') !== -1) {
        dispatchState({type: 'FOCUS'});
      }
    }, 500);
  }
  let dropdown;
  if (error && state.active) {
    dropdown = <ul className={styles.dropdown}>
      <li>{error}</li>
    </ul>
  } else if (state.loading && placeName.length > 2 && state.active) {
    dropdown = (
      <ul className={styles.dropdown}>
        <li>{searchingTxt}</li>
      </ul>
    );
  } else if (placeName.length < 3 && state.active) {
    dropdown = (
      <ul className={styles.dropdown}>
        <li>{minLengthTxt}</li>
      </ul>
    );
  } else if (placeName.length > 2 && (placesList.length || citiesList.length) && state.active) {
    dropdown = <ul ref={dropRef} onKeyDown={handleRef} onBlur={myBlu} className={`${styles.dropdown}`}>
      {places.length ? <><li className={styles.listTitle}>{placesTxt}</li>{places}</> : null}
      {cities.length ? <><li className={styles.listTitle}>{citiesTxt}</li>{cities}</> : null}
    </ul>;
  } else if (placesList.length === 0 && citiesList.length === 0 && state.active) {
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
    output = (
      <>
        <div className={styles.inputWrapper}>
          <div className={styles.labelInput}>{searchForTxt}:</div>
          <div className={styles.label}>
            <StreetName place={placeSelected} details onlytowns={placeSelected.typePlace === 'city'} />
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
          <label className={styles.labelInput} htmlFor="mysearcher">{searchForTxt}:</label>
          <Input
            value={placeName}
            onChange={onChangeHandler}
            onKeyDown={onKeyDown}
            isValid={true}
            maxlength="20"
            ref={inputEl}
            onFocus={onFocusHandler}
            onBlur={onBlurHandler}
            id="mysearcher"
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
      <MovieInfromer all={allMovies} isLoading={listIsLoading} />
    </div>
  );
};

export default Searcher;
