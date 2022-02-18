import { useContext } from 'react';
import useTranslator from '../../hooks/use-translator';
import styles from './MovieInformer.module.scss';
import AppContext from '../../store/app-context';

import StreetSign from '../Streets/StreetSign';

const MovieInformer = (props) => {
  const ctxApp = useContext(AppContext);
  const foundMovies = useTranslator('tracks.found_movies')
  const { searchingPlace } = ctxApp;
  const { all } = props;
  return (
    <div className={styles.wrapper}>
      {searchingPlace && (
        <StreetSign
          name={searchingPlace.name}
          city={searchingPlace.city}
          type={searchingPlace.type}
          typePlace={searchingPlace.typePlace}
        />
      )}
      <div className={styles.all}>{foundMovies}: <span>{all}</span></div>
    </div>
  );
};

export default MovieInformer;
