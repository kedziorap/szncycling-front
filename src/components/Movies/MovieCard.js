import {useDispatch} from 'react-redux';
import {movieActions} from '../../redux/slices/movie';
import styles from './MovieCard.module.scss';
import {cutTime} from '../../helpers/functions';
import {Link} from 'react-router-dom';

const MovieCard = (props) => {
  const { name, duration, date, time, distance, id, first_time_on } = props;
  const dispatch = useDispatch();
  const setFirstTimeOn = (data) => dispatch(movieActions.setFirstAppear(data)) 
  const clickLinkHandler = () => first_time_on ? setFirstTimeOn(first_time_on) : setFirstTimeOn(null);
  return (
    <li className={styles.element}>
      <Link to={`/tracks/${id}`}  className={styles.wrapper} onClick={clickLinkHandler}>
        <div className={styles.date}>
          {date}
        </div>
        <div className={styles.time}>
        {cutTime(time)}
        </div>
        <div className={styles.play}><span className={styles.link}><i className="icon-youtube-play"/></span></div>
        <div className={styles.duration}>{duration}</div>
        <div className={styles.distance}>{distance} km</div>
      </Link>
      <div className={styles.description}>{name}</div>
    </li>
  );
};

export default MovieCard;
