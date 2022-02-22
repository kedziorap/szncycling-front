import styles from './MoviePlace.module.scss';

import StreetName from '../Streets/StreetName';

const MoviePlace = (props) => {
  const { click, place } = props;
  return (
    <li onClick={() => click(place)} className={styles.wrapper}>
      <span><StreetName place={place} details/></span> <span>{place.time_on}</span>
    </li>
  );
};

export default MoviePlace;
