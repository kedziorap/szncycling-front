import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  mobileMode: true,
  menuIsVisible: false
}

const modeSlice = createSlice({
  name: 'mode',
  initialState,
  reducers: {
    mobileOn(state) {
      state.mobileMode = true
    },
    mobileOff(state) {
      state.mobileMode = false
    },
    toggleMenu(state) {
      state.menuIsVisible = !state.menuIsVisible
    }
  }
})

export const modeActions = modeSlice.actions;

export default modeSlice.reducer;