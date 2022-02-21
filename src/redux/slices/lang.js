import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loadingLang: false
}

const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    isLoading(state) {
      state.loadingLang = true
    },
    notLoading(state) {
      state.loadingLang = false
    }
  }
});

export const langActions = langSlice.actions;

export default langSlice.reducer;