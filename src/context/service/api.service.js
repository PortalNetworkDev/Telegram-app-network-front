import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create a base query instance for Redux Toolkit Query
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_MINIAPPAPI,
  prepareHeaders: (headers, { getState }) => {
    // get host name
    const accsess = window?.Telegram?.WebApp?.initData;
    const testToken = process.env.REACT_APP_TEST_TOKEN;

    if (accsess) headers.set("Authorization", `${accsess}`);
    else headers.set("Authorization", `${testToken}`);

    return headers;
  },
});

// if token expired or not valid - reauth user (Unauthorization error)
export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error && result?.error?.status === 401) {
    localStorage.clear();
    sessionStorage.clear();
    // return window.location.reload();
  }
  return result;
};

// Create an auto-generated hooks for each endpoint
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["update"],
  endpoints: (builder) => ({}),
});
