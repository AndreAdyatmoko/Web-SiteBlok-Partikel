import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./Reducer/AuthReducer";

export const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
});

export default store;