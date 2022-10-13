import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { FONTS } from "../../constants";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { deleteFromCard } from "../../features/cardSlice";

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { id, bookData, vendor } = item;
  return (
    <View className="h-44 w-44 bg-white shadow-sm rounded-md m-2 overflow-hidden">
      <View className="p-2 flex-row justify-between">
        <Text style={{ fontFamily: FONTS.JosefinSansBold }}>
          {vendor.vendorName}
        </Text>
        <Text style={{ fontFamily: FONTS.JosefinSansBold }}>
          {vendor.price}
        </Text>
      </View>
      <View className="flex-1 justify-center items-center">
        <Image
          source={{ uri: "https://bookhunter.com/Booksrun.png" }}
          className="h-12 w-12"
        />
      </View>
      <View className="items-center gap-2 px-2">
        <Text style={{ fontFamily: FONTS.JosefinSansBold }} numberOfLines={2}>
          {bookData.book.title}
        </Text>
        <Text style={{ fontFamily: FONTS.JosefinSansBold }}>
          {bookData.book.isbn13}
        </Text>
      </View>

      <View className="w-full h-8 bg-red-300 flex-row">
        <TouchableOpacity
          className="w-[50%] h-full bg-red-500 justify-center"
          onPress={() => dispatch(deleteFromCard(item))}
        >
          <Text className="text-center">
            <Ionicons name="ios-trash-outline" size={24} color="white" />
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="w-[50%] h-full bg-green-700  justify-center">
          <Text
            className="text-center text-white text-base"
            style={{ fontFamily: FONTS.JosefinSansBold }}
          >
            Sell
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;
