import { configureStore } from "@reduxjs/toolkit";
import test from "../features/testSlice";

export const store = configureStore({
  reducer: {
    test,
  },
  devTools: process.env.NODE_ENV !== "production",
});
