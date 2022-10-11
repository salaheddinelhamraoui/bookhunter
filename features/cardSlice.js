import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  vendors: [],
  qty: 0,
};

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addToCard: (state, action) => {
      // return {
      //   vendors: [...state.vendors, action.payload],
      //   qty: state.qty++,
      // };
      state.vendors = [...state.vendors, action.payload];
      state.qty = ++state.qty;
    },
  },
});

export const { addToCard } = cardSlice.actions;

export default cardSlice.reducer;
