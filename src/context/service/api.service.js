import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


// Create a base query instance for Redux Toolkit Query
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_MINIAPPAPI,
  prepareHeaders: (headers, { getState }) => {
    // get host name
    const accsess = window?.Telegram?.WebApp?.initData;
    const testToken = "user=%7B%22id%22%3A434209%2C%22first_name%22%3A%22Ruben%22%2C%22last_name%22%3A%22Babaev%22%2C%22username%22%3A%22just14zy%22%2C%22language_code%22%3A%22en%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-7544175125997533892&chat_type=supergroup&start_param=r-66571355&auth_date=1715238655&hash=72199a3022dd44311e2311bac615907f2758a3270a90a6cf2acc165611f5eeaa"
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
