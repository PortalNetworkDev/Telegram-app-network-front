import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Create a base query instance for Redux Toolkit Query
export const geckoApi = createApi({
  reducerPath: "geckoApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.coingecko.com/api/v3/" }),
  endpoints: (builder) => ({
    getPOERate: builder.query({
      query: () =>
        `simple/price?ids=portal-network-token&vs_currencies=usd&x_cg_api_key=${process.env.GECKO_API_KEY}`,
    }),
  }),
});

export const { useGetPOERateQuery } = geckoApi;
