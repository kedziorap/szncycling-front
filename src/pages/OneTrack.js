import Movie from '../components/Movie/Movie';
import { MovieContextProvider } from '../store/movie-context';

const OneTrack = () => {
  return (
    <>
      <MovieContextProvider>
      <Movie />
      </MovieContextProvider>
    </>
  );
};

export default OneTrack;