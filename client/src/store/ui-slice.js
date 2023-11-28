import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: { modalIsVisible: false, authIsVisible: false },
  reducers: {
    setModalIsVisible(state, actions) {
      state.modalIsVisible = actions.payload;
    },
    setAuthIsVisible(state, actions) {
      state.authIsVisible = actions.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
