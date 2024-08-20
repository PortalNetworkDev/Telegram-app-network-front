import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create a base query instance for Redux Toolkit Query
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_MINIAPPAPI,
  prepareHeaders: (headers, { getState }) => {
    // get host name
    const accsess = window?.Telegram?.WebApp?.initData;

    // const testToken =
    //   "user=%7B%22id%22%3A355903639%2C%22first_name%22%3A%22Andrey%22%2C%22last_name%22%3A%22Kudryashov%22%2C%22username%22%3A%22AndreyKudryashoff%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-237986505224524480&chat_type=channel&auth_date=1715358082&hash=6db0b78f9743583355d555fd6fdab6ebf7089e89a4bec5912c2c3a9ac4f3a4d1";

    const testToken =
      "user=%7B%22id%22%3A1221662024%2C%22first_name%22%3A%22Alexandr%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22W0RK6%22%2C%22language_code%22%3A%22ru%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=5296594207110303530&chat_type=sender&auth_date=1716805983&hash=bce90765796e455836738ad220161fb0cac0192c4e1ad61b90ff78e582095b83";

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
