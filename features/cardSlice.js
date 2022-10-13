import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  items: [],
  qty: 0,
};

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    addToCard: (state, action) => {
      const { vendor, bookData } = action.payload;
      state.items = addVendor(state.items, vendor, bookData);
      state.qty = ++state.qty;
    },

    deleteFromCard: (state, action) => {
      const { id, vendor } = action.payload;
      state.items = deleteVendor(state.items, id, vendor.vendorName);
      state.qty = --state.qty;
    },
  },
});

function addVendor(items, vendor, bookData) {
  const vendorIndex = items.findIndex(
    (item) => item.vendor === vendor.vendorName
  );

  if (vendorIndex === -1) {
    return [
      ...items,
      {
        vendor: vendor.vendorName,
        subItems: [{ id: uuidv4(), vendor, bookData }],
      },
    ];
  } else {
    items[vendorIndex].subItems = [
      ...items[vendorIndex].subItems,
      { id: uuidv4(), vendor, bookData },
    ];
    return items;
  }
}

function deleteVendor(items, id, vendorName) {
  const selectedItem = items.filter((item) => item.vendor === vendorName);
  const newItem = items.filter((item) => item.vendor !== vendorName);
  const newSubItems = selectedItem[0].subItems.filter(
    (subItem) => subItem.id !== id
  );

  return [...newItem, { vendor: vendorName, subItems: newSubItems }];
}

export const { addToCard, deleteFromCard } = cardSlice.actions;

export default cardSlice.reducer;
