import { isRejectedWithValue, Middleware } from "@reduxjs/toolkit";

export const errorLoggingMiddleware: Middleware = () => (next) => (action) => {
  if (isRejectedWithValue(action)) {
    alert({ message: action.payload });
  }

  return next(action);
};
