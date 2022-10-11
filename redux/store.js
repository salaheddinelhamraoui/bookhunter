import { configureStore } from "@reduxjs/toolkit";
import test from "../features/testSlice";
import cardSlice from "../features/cardSlice";

export const store = configureStore({
  reducer: {
    cardSlice,
  },
  devTools: process.env.NODE_ENV !== "production",
});
