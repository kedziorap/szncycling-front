import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  allMovies: 0,
  movies: [],
  page: 1,
  searchingPlace: null
}

const moviesSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {
    setMovies(state, action) {
      state.movies = action.payload;
    }, 
    setPage(state, action) {
      state.page = action.payload;
    }, 
    setAllMovies(state, action) {
      state.allMovies = action.payload;
    }, 
    setSearchingPlace(state, action) {
      state.searchingPlace = action.payload;
    }
  }
})

export const moviesActions = moviesSlice.actions;

export default moviesSlice.reducer;