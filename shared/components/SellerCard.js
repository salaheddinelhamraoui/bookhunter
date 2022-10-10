import React from "react";
import { Image, Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FONTS } from "../../constants";

function SellerCard({ vendor }) {
  const API = "https://bookhunter.com";
  const {
    vendorName,
    price,
    link,
    vendorLogo,
    sell,
    duration = false,
  } = vendor;
  return (
    <TouchableOpacity
      style={{ marginVertical: 5, paddingHorizontal: 10, paddingVertical: 20 }}
      className="bg-white flex-row"
    >
      <Image
        source={{ uri: API + vendorLogo }}
        resizeMode="contain"
        className="w-[35px] mr-2 "
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
    </TouchableOpacity>
  );
}

export default SellerCard;
