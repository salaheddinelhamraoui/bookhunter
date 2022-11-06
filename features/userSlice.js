import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: {},
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.data = action.payload;
    },
    reset: () => initialState,
  },
});

export const { login, reset } = userSlice.actions;

export default userSlice.reducer;
