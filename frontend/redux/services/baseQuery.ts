import {
  BaseQueryFn,
} from "@reduxjs/toolkit/query";

import { AxiosError } from "axios";

import { api } from "./api";

export const axiosBaseQuery =
  (): BaseQueryFn =>
  async (
    {
      url,
      method,
      data,
      params,
    }: any,
    baseQueryApi
  ) => {
    try {
      const result =
        await api({
          url,
          method,
          data,
          params,
          signal: baseQueryApi.signal,
        });

      return {
        data:
          result.data.data,
      };
    } catch (error) {
      const err =
        error as AxiosError;

      return {
        error: {
          status:
            err.response
              ?.status,

          data:
            err.response
              ?.data ||
            err.message,
        },
      };
    }
  };