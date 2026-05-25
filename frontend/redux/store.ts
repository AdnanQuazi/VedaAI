import { configureStore } from "@reduxjs/toolkit";

import { authApi } from "./services/authApi";

import { assignmentApi } from "./services/assignmentApi";

import createAssignmentReducer from "./features/createAssignment/createAssignmentSlice";

export const store =
  configureStore({
    reducer: {
      [authApi.reducerPath]:
        authApi.reducer,

      [assignmentApi.reducerPath]:
        assignmentApi.reducer,

      createAssignment: createAssignmentReducer,
    },

    middleware: (
      getDefaultMiddleware
    ) =>
      getDefaultMiddleware().concat(
        authApi.middleware,
        assignmentApi.middleware
      ),
  });

export type RootState =
  ReturnType<
    typeof store.getState
  >;

export type AppDispatch =
  typeof store.dispatch;