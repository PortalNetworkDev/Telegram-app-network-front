import { createSlice } from "@reduxjs/toolkit";

export const setColorScheme = createSlice({
  name: "colorScheme",
  initialState: "light",
  reducers: { setColorScheme: (state, action) => action.payload },
});

export const { setColorScheme: setColorSchemeAction } = setColorScheme.actions;
export const colorScheme = setColorScheme.reducer;
