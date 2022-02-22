import { configureStore } from '@reduxjs/toolkit';
import modeSlice from './slices/mode';
import moviesSlice from './slices/movies';
import movieSlice from './slices/movie';

const confObject = {
  reducer: {
    mode: modeSlice,
    movies: moviesSlice,
    movie: movieSlice
  }
}

const store = configureStore(confObject);

export default store;