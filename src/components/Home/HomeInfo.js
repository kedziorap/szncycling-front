import useTranslator from '../../hooks/use-translator';

import MovieCard from '../Movies/MovieCard';

import styles from './HomeInfo.module.scss';

const HomeInfo = (props) => {
  const { info } = props;
  const {
    allCities,
    allMovies,
    allPlaces,
    fullTime,
    sumDistance,
    newestTracks,
  } = info;

  const statsTxt = useTranslator('home.stats');
  const moviesTxt = useTranslator('home.movies');
  const placesTxt = useTranslator('home.places');
  const townsTxt = useTranslator('home.towns');
  const kilometersTxt = useTranslator('home.kilometers');
  const hoursTxt = useTranslator('home.hours_recording');
  const latestTxt = useTranslator('home.latest_video')

  const lista = (
    <ul className={styles.list}>
      {newestTracks.map((track) => (
        <MovieCard key={track.id} {...track} />
      ))}
    </ul>
  );
  return (
    <div className={styles.InfoWrapper}>
      <h2 className={styles.header}>{statsTxt}</h2>
      <div className={styles.IconSection}>
        <div className={styles.IconElement}>
          <div>{allMovies} <i className="icon-youtube-play"/> </div>
          <span>{moviesTxt}</span>
        </div>
        <div className={styles.IconElement}>
          <div>{allPlaces} <i className="icon-location"/> </div>
          <span>{placesTxt}</span>
        </div>
        <div className={styles.IconElement}>
          <div>{allCities} <i className="icon-map-signs"/> </div>
          <span>{townsTxt}</span>
        </div>
        <div className={styles.IconElement}>
          <div>{Math.round(sumDistance).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1 ")} <i className="icon-road"/> </div>
          <span>{kilometersTxt}</span>
        </div>
        <div className={styles.IconElement}>
          <div>{fullTime.split(':')[0]} <i className="icon-hourglass-3"/> </div>
          <span>{hoursTxt}</span>
        </div>
      </div>
      <h2 className={styles.header}>{latestTxt}</h2>
      {lista}
    </div>
  );
};

export default HomeInfo;
