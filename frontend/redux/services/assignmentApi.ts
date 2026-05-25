import { createApi } from "@reduxjs/toolkit/query/react";

import { axiosBaseQuery } from "./baseQuery";

import {
  Assignment,
  AssignmentDetailResponse,
} from "@/types/assignment";

export const assignmentApi = createApi({
  reducerPath: "assignmentApi",

  baseQuery: axiosBaseQuery(),

  tagTypes: ["Assignments"],

  endpoints: (builder) => ({
    getAssignments: builder.query<Assignment[], void>({
      query: () => ({
        url: "/assignments",

        method: "GET",
      }),

      providesTags: ["Assignments"],
    }),

    getAssignment: builder.query<
      AssignmentDetailResponse,
      string
    >({
      query: (assignmentId) => ({
        url: `/assignments/${assignmentId}`,
        method: "GET",
      }),
    }),

    createAssignment: builder.mutation<
      Assignment,
      FormData
    >({
      query: (formData) => ({
        url: "/assignments",
        method: "POST",
        data: formData,
      }),
      invalidatesTags: ["Assignments"],
    }),
  }),
});

export const {
  useGetAssignmentsQuery,
  useCreateAssignmentMutation,
  useGetAssignmentQuery,
} = assignmentApi;
