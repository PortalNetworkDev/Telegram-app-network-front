import { apiSlice } from "./api.service";

export const miningService = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Get mining data - GET: /mining/data
    mining: builder.query({
      query: () => ({
        url: "mining/data",
        method: "GET",
      }),
      providesTags: ["mining"],
    }),
  }),
});

export const { useMiningQuery } = miningService;
