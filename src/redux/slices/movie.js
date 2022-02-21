import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  firstTimeOn: null
}

const movieSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    setFirstAppear(state, action) {
      state.firstTimeOn = action.payload;
    }
  }
})

export const movieActions = movieSlice.actions;

export default movieSlice.reducer;