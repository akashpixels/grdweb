import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import rootReducer from "store/Slices";
import { errorLoggingMiddleware } from "./Middlewares/errorLoggingMiddleware";
import { persistStore } from "redux-persist";

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(errorLoggingMiddleware),
});

const persister = persistStore(store);

export { store, persister };

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
