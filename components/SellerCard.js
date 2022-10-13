import React from "react";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FONTS } from "../constants";
import { useSelector, useDispatch } from "react-redux";
import { addToCard } from "../features/cardSlice";

function SellerCard({ vendor, type, bookData }) {
  const dispatch = useDispatch();

  const API = "https://bookhunter.com";
  const {
    vendorName,
    price,
    link,
    vendorLogo,
    sell,
    duration = false,
  } = vendor;

  const DATA = {
    vendor: { ...vendor },
    type,
    bookData,
  };

  return (
    <TouchableOpacity
      style={{
        marginVertical: 5,
        paddingHorizontal: 10,
        paddingVertical: 20,
      }}
      className="bg-white flex-row justify-between align-middle rounded-lg"
    >
      <View className="flex-row">
        <Image
          source={{ uri: API + vendorLogo }}
          resizeMode="contain"
          className="w-[35px] mr-2"
        />
        <View>
          <Text
            style={{ fontFamily: FONTS.JosefinSansBold }}
            className="text-base"
          >
            {vendorName}
          </Text>
          <Text style={{ fontFamily: FONTS.JosefinSansBold }}>{price}</Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => dispatch(addToCard(DATA))}
        className={`flex-1 justify-center px-5 rounded-md ${parseFloat(price.replace("$", "")) === 0
            ? "bg-gray-400"
            : "bg-red-400"
          }`}
        disabled={parseFloat(price.replace("$", "")) === 0 ? true : false}
      >
        <Text
          style={{ fontFamily: FONTS.JosefinSansBold }}
          className="text-base"
        >
          {type.toUpperCase()}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

export default SellerCard;
