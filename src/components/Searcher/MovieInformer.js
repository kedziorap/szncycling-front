import { useSelector } from 'react-redux';
import useTranslator from '../../hooks/use-translator';
import styles from './MovieInformer.module.scss';

import StreetSign from '../Streets/StreetSign';

const MovieInformer = (props) => {
  const foundMovies = useTranslator('tracks.found_movies')
  const searchingPlace = useSelector((state) => state.movies.searchingPlace);
  const { all, isLoading } = props;
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
      <div className={styles.all}>{foundMovies}: <span>{isLoading ? '': all}</span></div>
    </div>
  );
};

export default MovieInformer;
