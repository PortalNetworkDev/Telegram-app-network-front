import { createSlice } from "@reduxjs/toolkit";

export const setMining = createSlice({
  name: "mining",
  initialState: {
    isMining: false,
    battery_balance: null,
    battery_capacity: null,
    battery_level: null,
    generator_balance: null,
    generator_level: null,
    generator_limit: null,
    power_balance: null,
    power_poe: null,
    power_price: null,
    power_rize_battery: null,
    power_rize_generator: null,
    price_rize_battery: null,
    price_rize_generator: null,
    recovery_power_lim: null,
  },
  reducers: {
    setMining: (state, action) => {
      state.isMining = action.payload;
    },
    updateData: (state, action) => {
      state.battery_balance = action.payload?.battery_balance;
      state.battery_capacity = action.payload?.battery_capacity;
      state.battery_level = action.payload?.battery_level;
      state.generator_balance = action.payload?.generator_balance;
      state.generator_level = action.payload?.generator_level;
      state.generator_limit = action.payload?.generator_limit;
      state.power_balance = action.payload?.power_balance;
      state.power_poe = action.payload?.power_poe;
      state.power_price = action.payload?.power_price;
      state.power_rize_battery = action.payload?.power_rize_battery;
      state.power_rize_generator = action.payload?.power_rize_generator;
      state.price_rize_battery = action.payload?.price_rize_battery;
      state.price_rize_generator = action.payload?.price_rize_generator;
      state.recovery_power_lim = action.payload?.recovery_power_lim;
    },
  },
});

export const { setMining: setMiningAction, updateData } = setMining.actions;
export const mining = setMining.reducer;
