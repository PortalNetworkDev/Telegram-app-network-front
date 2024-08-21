import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { loading } from "./loading";
import { apiSlice } from "./service/api.service";
import { colorScheme } from "./colorScheme";
import { mining } from "./mining";
import { geckoApi } from "./service/geckoApi.service";

export const store = configureStore({
  reducer: combineReducers({
    loading: loading,
    colorScheme: colorScheme,
    mining: mining,
    [apiSlice.reducerPath]: apiSlice.reducer,
    [geckoApi.reducerPath]: geckoApi.reducer,
  }),

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(apiSlice.middleware)
      .concat(geckoApi.middleware),
  devTools: process.env.NODE_ENV !== "production",
});
