import { useState, useEffect, useRef, useContext } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import { get } from '../../api/index';
import {
  getSecond,
  getHourFormat,
  selectPlace,
  getNamePlace,
  cutTime,
} from '../../helpers/functions';
import AppContext from '../../store/app-context';
import MovieContext from '../../store/movie-context';
import useTranslator from '../../hooks/use-translator';

import YouTube from 'react-youtube';
import Loader from '../UI/Loader';
import MoviePlaceManagement from './MoviePlaceManagement';

import styles from './Movie.module.scss';

let interval;
let valueTime;

const Movie = () => {
  const history = useHistory();
  const location = useLocation();
  const ctxMovie = useContext(MovieContext);
  const ctxApp = useContext(AppContext);

  const { setSelectMovie, setPlace, place, movie } = ctxMovie;
  const {firstTimeOn} = ctxApp;
  const apthArr = location.pathname.split('/');
  const id = apthArr[apthArr.length - 1];

  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const secondMovie = useRef();

  const errorConnectTxt = useTranslator('errors.connect');
  const errorTxt = useTranslator('errors.occurred');
  const backTxt = useTranslator('track.back');


  const getTrack = (idTrack) => {
    setError(false);
    setIsLoading(true);
   // console.log('getTrack');
    get(`tracks/${idTrack}`).then((res) => {
      const { data, status } = res;
      if (status === 200) {
        setSelectMovie(data);
      } else if (status === 404) {
        setError(errorConnectTxt);
      } else {
        setError(errorTxt);
      }
      setIsLoading(false);
    });
  };

  useEffect(() => {
    getTrack(id);
  }, [id]);

  useEffect(() => {
    interval = setInterval(() => {
      setTimer();
    }, 1000);
    return () => {
      clearInterval(interval)
    };
  });
  const backPage = () => {
    history.goBack();
  }

  const clickOnPlace = (place) => {
    secondMovie.current.internalPlayer.seekTo(getSecond(place.time_on));
    setPlace(place);
  };
  const setTimer = async () => {
    const timer = await secondMovie.current.internalPlayer.getCurrentTime();
    valueTime = getHourFormat(Math.ceil(timer));
    const placeToShow = selectPlace(movie.places, valueTime);
    if (placeToShow !== place) {
      setPlace(placeToShow);
    }
  };

  const onReady = () => {
    setTimer();
    clearInterval(interval);
  };

  const onPlay = () => {
    setTimer();
    clearInterval(interval);
    interval = setInterval(() => {
      setTimer();
    }, 1000);
  };
  const onStop = () => {
    clearInterval(interval);
    //console.log('stop');
  };

  let output;
  if (movie) {
    const opts = {
      width: '100%',
      height: '100%',
      playerVars: {
        autoplay: 1,
        start: firstTimeOn ? getSecond(firstTimeOn) : 0,
        modestbranding: 1,
        rel: 0,
        control: 1,
      },
      host: 'https://www.youtube-nocookie.com'
    };
    output = (
      <>
        <YouTube
          containerClassName={styles.video}
          videoId={movie.embed}
          opts={opts}
          ref={secondMovie}
          onReady={onReady}
          onPlay={onPlay}
          onPause={onStop}
          onError={onStop}
          onStateChange={onStop}
        />
        <div className={styles.desc}>
          <div className={styles.info}>
            <span>
              <i className="icon-road" /> {movie.distance} km
            </span>
            <span>
              <i className="icon-calendar" /> {movie.date}
            </span>
            <span>
              <i className="icon-clock" /> {cutTime(movie.time)}
            </span>
          </div>
          <div className={styles.actual}>
            {place && getNamePlace(place, true)}
          </div>
        </div>
        <MoviePlaceManagement clickOnPlace={clickOnPlace} />
      </>
    );
  }
  return (
    <div>
      <div className={styles.back}>
        <button onClick={backPage}><i className="icon-angle-left" />
        {backTxt}</button>
      </div>
      {isLoading && <Loader />}
      {error && !isLoading && <p>{error}</p>}
      {movie && !isLoading && !error && output}
    </div>
  );
};

export default Movie;
