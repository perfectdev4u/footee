import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
};

export const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    showMessage: (state, action) => {
      state.message = action.payload;
    },
    removeMessage: (state) => {
      state.message = null;
    },
  },
});

export const { showMessage, removeMessage } = alertSlice.actions;
export default alertSlice.reducer;
