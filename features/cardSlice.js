import AsyncStorage from "@react-native-async-storage/async-storage";
import { createSlice } from "@reduxjs/toolkit";
import Toast from "react-native-root-toast";
import { v4 as uuidv4 } from "uuid";

const initialState = {
  items: [],
  qty: 0,
};

export const cardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    initializeCartRedux: (state, action) => {
      (state.items = action.payload.items), (state.qty = action.payload.qty);
    },

    addToCard: (state, action) => {
      const { vendor, bookData, type } = action.payload;
      state.items = addVendor(state.items, vendor, bookData, type);
      state.qty = ++state.qty;
      setCartInDatabase(state);
    },

    deleteFromCard: (state, action) => {
      const { id, vendor } = action.payload;
      state.items = deleteVendor(state.items, id, vendor.vendorName);
      state.qty = --state.qty;
      setCartInDatabase(state);
    },
  },
});

async function setCartInDatabase(items) {
  try {
    await AsyncStorage.setItem("cartData", JSON.stringify(items));
  } catch (error) {
    console.log(error);
    // Toast.show("Something goes wrong, Please try again!", {
    //   duration: Toast.durations.SHORT,
    //   position: Toast.positions.CENTER,
    //   shadow: true,
    //   animation: true,
    //   hideOnPress: true,
    //   delay: 0,
    //   containerStyle: {
    //     backgroundColor: "#FF8787",
    //     height: 60,
    //     justifyContent: "center",
    //   },
    // });
  }
}

function addVendor(items, vendor, bookData, type) {
  const vendorIndex = items.findIndex(
    (item) => item.vendor === vendor.vendorName
  );

  if (vendorIndex === -1) {
    return [
      ...items,
      {
        vendor: vendor.vendorName,
        subItems: [{ id: uuidv4(), type, vendor, bookData }],
      },
    ];
  } else {
    items[vendorIndex].subItems = [
      ...items[vendorIndex].subItems,
      { id: uuidv4(), type, vendor, bookData },
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

export const { addToCard, deleteFromCard, initializeCartRedux } =
  cardSlice.actions;

export default cardSlice.reducer;
