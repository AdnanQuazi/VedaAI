import { createApi } from "@reduxjs/toolkit/query/react";

import { axiosBaseQuery } from "./baseQuery";

import { User } from "@/types/user";

export const authApi = createApi({
  reducerPath: "authApi",

  baseQuery: axiosBaseQuery(),

  endpoints: (builder) => ({
    getMe: builder.query<
      User,
      void
    >({
      query: () => ({
        url: "/users/me",

        method: "GET",
      }),
    }),
  }),
});

export const {
  useGetMeQuery,
} = authApi;