import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  test: "111",
};

export const testSlice = createSlice({
  name: "test",
  initialState,
  reducers: {
    update: (state, action) => {
      state.test = action.payload;
    },
  },
});

export const { update } = testSlice.actions;

export default testSlice.reducer;
