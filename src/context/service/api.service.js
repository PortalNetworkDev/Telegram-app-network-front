import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";


// Create a base query instance for Redux Toolkit Query
const baseQuery = fetchBaseQuery({
  baseUrl: process.env.REACT_APP_MINIAPPAPI,
  prepareHeaders: (headers, { getState }) => {
    // get host name
    const accsess = window?.Telegram?.WebApp?.initData;
    const testToken = "user=%7B%22id%22%3A555536511%2C%22first_name%22%3A%22%D0%9C%D0%B8%D1%85%D0%B0%D0%B8%D0%BB%22%2C%22last_name%22%3A%22%D0%98%D0%B2%D0%B0%D0%BD%D1%86%D0%BE%D0%B2%22%2C%22username%22%3A%22progerlab%22%2C%22language_code%22%3A%22ru%22%2C%22is_premium%22%3Atrue%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-7788739615742835235&chat_type=private&auth_date=1714578950&hash=c9d80913120467a5edc3580e5bfa5efec24767f44cb60a447022274955045101"
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
