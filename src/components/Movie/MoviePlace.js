import styles from './MoviePlace.module.scss';
import { getNamePlace } from '../../helpers/functions';

const MoviePlace = (props) => {
  const { click, place } = props;
  return (
    <li onClick={() => click(place)} className={styles.wrapper}>
      <span>{getNamePlace(place, true)}</span> <span>{place.time_on}</span>
    </li>
  );
};

export default MoviePlace;
