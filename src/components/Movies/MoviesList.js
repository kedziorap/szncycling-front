import { useState, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AppContext from '../../store/app-context';
import { get } from '../../api';
import useTranslator from '../../hooks/use-translator';

import Loader from '../UI/Loader';
import MovieCard from './MovieCard';
import Pagination from '../UI/Pagination';
import Searcher from '../Searcher/Searcher';

import styles from './MoviesList.module.scss';


const MoviesList = () => {

  const limit = 24;
  const history = useHistory();

  const ctxApp = useContext(AppContext);
  const {
    movies: tracks,
    allMovies: allTracks,
    setAllMovies: setAllTracks,
    actualPage,
    searchingPlace,
    setActualPage
  } = ctxApp;

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [pageActive, setPageActive] = useState(true);

  const errorConnectTxt = useTranslator('errors.connect');
  const errorTxt = useTranslator('errors.occurred');

  const getTrack = () => {
    setIsLoading(true);
    setError(false);
    get(`tracks?page=${actualPage}`).then((res) => {
      const { data, status } = res;
      if (pageActive) {
        if (status === 200) {
          ctxApp.setMovies(data.tracks);
          setAllTracks(data.allTracks);
        } else if (status === 404) {
          ctxApp.setMovies([]);
          setError(errorConnectTxt);
        } else {
          setError(errorTxt);
        }
        setIsLoading(false);
      }
    });
  };

  const getTrackByPlace = (id) => {
    setIsLoading(true);
    setError(false);
    get(`tracks-place/${id}?page=${actualPage}`).then((res) => {
      const { data, status } = res;
      //console.log(data);
      if (pageActive) {
        if (status === 200) {
          ctxApp.setMovies(data.tracks);
          setAllTracks(data.allTracks);
        } else if (status === 404) {
          ctxApp.setMovies([]);
          setError(errorConnectTxt);
        } else {
          setError(errorTxt);
        }
        setIsLoading(false);
      }
    });
  };
  const getTrackByCity = (phrase) => {
    setIsLoading(true);
    setError(false);
    get(`cities?search=${phrase}&page=${actualPage}`).then((res) => {
      const { data, status } = res;
      //console.log(data);
      if (pageActive) {
        if (status === 200) {
          ctxApp.setMovies(data.tracks);
          setAllTracks(data.allTracks);
        } else if (status === 404) {
          ctxApp.setMovies([]);
          setError(errorConnectTxt);
        } else {
          setError(errorTxt);
        }
        setIsLoading(false);
      }
    });
  };


  useEffect(() => {
    if (actualPage === 1) history.push(`/tracks?page=${actualPage}`);
    if (searchingPlace) {
      if(searchingPlace.typePlace === 'place') {
        getTrackByPlace(searchingPlace.id);
      } else {
        getTrackByCity(searchingPlace.city);
      }
    } else {
      getTrack();
    }

  }, [actualPage, searchingPlace]);

  useEffect(() => {
    return ()=> {
      setPageActive(false)
    }
  }, []);

  const changePage = (number) => {
    history.push(`/tracks?page=${number}`);
    setActualPage(number);
    window.scrollTo(0, 0);
  };

  const lista = (
    <ul className={styles.list}>
      {tracks.map((track) => (
        <MovieCard key={track.id} {...track} />
      ))}
    </ul>
  );
  const output = <>{lista}</>;
  return (
    <>
    <Searcher/>
      {tracks.length !== 0 && !error && !isLoading && output}
      {error && !isLoading && <p>Error</p>}
      {isLoading && <Loader />}
      {allTracks > limit && tracks.length > 0 && !error && !isLoading && (
        <Pagination
          allRecords={allTracks}
          actualPage={actualPage}
          callback={changePage}
          limit={limit}
        />
      )}
      {allTracks > limit && !error && !isLoading && tracks.length === 0 && (
        <p>Nic nie znaleziono.</p>
      )}
    </>
  );
};

export default MoviesList;
