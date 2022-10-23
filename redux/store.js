import { configureStore } from "@reduxjs/toolkit";
import cardSlice from "../features/cardSlice";
import userSlice from "../features/userSlice";

export const store = configureStore({
  reducer: {
    cardSlice,
    userSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});
