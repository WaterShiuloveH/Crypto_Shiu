import { configureStore } from "@reduxjs/toolkit";
import { cryptoApi } from "../server/cryptoApi";
import { cryptoNewsApi } from "../server/cryptoNewsApi";
import { langReducer } from "./reducer";

export default configureStore({
  reducer: {
    [cryptoApi.reducerPath]: cryptoApi.reducer,
    [cryptoNewsApi.reducerPath]: cryptoNewsApi.reducer,
    language: langReducer,
  },
});
