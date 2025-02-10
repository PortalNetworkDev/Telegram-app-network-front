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
    multitabUp: builder.query({
      query: () => ({
        url: "mining/buyrizemultitab",
        method: "POST",
      }),
    }),
    getItems: builder.query({
      query: (skinType) => ({
        url: "skinsShop/getItems",
        method: "GET",
        params: { skinType },
      }),
      providesTags: (result, error, skinType) => [
        { type: "Items", id: skinType },
      ],
      keepUnusedDataFor: 300,
    }),
    buySkin: builder.mutation({
      query: ({ skinId, skinType }) => ({
        url: "skinsShop/buySkin",
        method: "POST",
        body: { skinId },
      }),
      invalidatesTags: (result, error, { skinType }) => [
        { type: "Items", id: skinType },
      ],
    }),
    selectSkin: builder.mutation({
      query: ({ skinId, skinType }) => ({
        url: "skinsShop/selectSkin",
        method: "POST",
        body: { skinId },
      }),
      invalidatesTags: (result, error, { skinType }) => [
        { type: "Items", id: skinType },
      ],
    }),
    recoveryGenerator: builder.query({
      query: () => ({
        url: "boosts/useDailyRecovery",
        method: "GET",
      }),
    }),
    recoveryBoostInfo: builder.query({
      query: () => ({
        url: "boosts/getRecoveryBoostInfo",
        method: "GET",
      }),
    }),
    getDailyGifts: builder.query({
      query: () => ({
        url: "dailyGifts/getDailyGifts",
        method: "GET",
      }),
    }),
    checkDailyGifts: builder.query({
      query: () => ({
        url: "dailyGifts/checkIsDailyGiftAvailable",
        method: "GET",
      }),
    }),
    lotteryRoll: builder.query({
      query: (position) => ({
        url: "skinsShop/lottery/roll ",
        method: "POST",
        body: { position },
      }),
    }),
    claimDailyGift: builder.query({
      query: () => ({
        url: "dailyGifts/claimDailyGift",
        method: "POST",
      }),
    }),
    getTopMiners: builder.query({
      query: (page) => ({
        url: `topMinersList/getMinersList?page=${page}`,
        method: "GET",
      }),
    }),
    getUserPosition: builder.query({
      query: (page) => ({
        url: `topMinersList/getUserListPosition`,
        method: "GET",
      }),
    }),
    getTransactionHistory: builder.query({
      query: ({ limit, page, timePeriod }) => ({
        url: `transactions/history`,
        method: "POST",
        body: { limit, page, timePeriod },
      }),
    }),
    sendPower: builder.query({
      query: ({ recipient, amount }) => ({
        url: `sendPower/send`,
        method: "POST",
        body: { recipient, amount },
      }),
    }),
    sendPowerById: builder.query({
      query: ({ recipientId, amount }) => ({
        url: `sendPower/sendById`,
        method: "POST",
        body: { recipientId, amount },
      }),
    }),
    getNotifications: builder.query({
      query: () => ({
        url: "notifications/getNotificationsInfo",
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
  useLazyMultitabUpQuery,
  useGetItemsQuery,
  useBuySkinMutation,
  useSelectSkinMutation,
  useLazyRecoveryGeneratorQuery,
  useRecoveryBoostInfoQuery,
  useGetDailyGiftsQuery,
  useCheckDailyGiftsQuery,
  useLazyLotteryRollQuery,
  useLazyClaimDailyGiftQuery,
  useLazyGetTopMinersQuery,
  useGetUserPositionQuery,
  useLazyGetTransactionHistoryQuery,
  useLazySendPowerQuery,
  useLazySendPowerByIdQuery,
  useLazyGetNotificationsQuery,
} = miningService;
