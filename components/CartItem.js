import React, { useCallback } from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Linking,
} from "react-native";
import { FONTS } from "../constants";
import { Ionicons } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { deleteFromCard } from "../features/cardSlice";

const API = "https://bookhunter.com";

const CartItem = ({ item }) => {
  const { bookData, vendor, type } = item;
  const dispatch = useDispatch();

  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(vendor.link);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(vendor.link);
    } else {
      Alert.alert(`Cannot Open This URL Please Contact Support`);
    }
  }, [vendor.link]);

  return (
    <View className="h-44 w-44 bg-white shadow-sm rounded-md m-2 overflow-hidden border">
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
          source={{ uri: API + vendor.vendorLogo }}
          className="h-12 w-12"
        />
      </View>
      <View className="items-center gap-2 px-2">
        <Text style={{ fontFamily: FONTS.JosefinSansBold }} numberOfLines={2}>
          {bookData.book.title}
        </Text>
        <Text style={{ fontFamily: FONTS.JosefinSansBold }} className="mb-2">
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
        <TouchableOpacity
          className="w-[50%] h-full bg-green-700  justify-center"
          onPress={handlePress}
        >
          <Text
            className="text-center text-white text-base"
            style={{ fontFamily: FONTS.JosefinSansBold }}
          >
            {type}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CartItem;
