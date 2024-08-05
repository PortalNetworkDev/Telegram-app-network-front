import { createSlice } from "@reduxjs/toolkit";

export const setMining = createSlice({
  name: "mining",
  initialState: false,
  reducers: { setMining: (state, action) => action.payload },
});

export const { setMining: setMiningAction } = setMining.actions;
export const mining = setMining.reducer;
