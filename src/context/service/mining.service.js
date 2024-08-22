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
    generatorUp: builder.query({
      query: () => ({
        url: "mining/buyrizegenerator",
        method: "POST",
      }),
    }),
    batteryUp: builder.query({
      query: () => ({
        url: "mining/buyrizebattery",
        method: "POST",
      }),
    }),
    genReward: builder.query({
      query: (power) => ({
        url: "mining/setgeneratorreward",
        method: "POST",
        body: {
          power,
        },
      }),
    }),
    claimPower: builder.query({
      query: () => ({
        url: "mining/claimpower",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useMiningQuery,
  useLazyGeneratorUpQuery,
  useLazyBatteryUpQuery,
  useLazyGenRewardQuery,
  useLazyClaimPowerQuery,
} = miningService;
