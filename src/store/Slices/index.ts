import builderReducer from "./cvbuilder";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import blogReducer from "./blog.slice";
import apiReducer from "./api.slice";
import authReducer from "./auth.slice";
import coverLetteReducer from "./coverletter.slice";
import modalReducer from "./modal.slice";
import jobReducer from "./job.slice";

const persistConfig = {
  key: "root",
  storage,
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, builderReducer);

const reducer = {
  builder: persistedReducer,
  blog: blogReducer,
  api: apiReducer,
  auth: authReducer,
  coverLetter: coverLetteReducer,
  modal: modalReducer,
  job: jobReducer,
};

export default reducer;
