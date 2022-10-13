import React from "react";
import { Text, View } from "react-native";
import { FlatList, ScrollView } from "react-native-gesture-handler";
import { FONTS } from "../constants";
import CartItem from "./CartItem";

function CartVendor({ data, title }) {
  const { subItems } = data;
  return (
    <>
      {subItems && subItems.length > 0 && (
        <View className="mt-2">
          <View className="bg-[#4e8098]  py-3 items-center">
            <Text
              style={{ fontFamily: FONTS.JosefinSansBold }}
              className="text-white text-lg"
            >
              {title}
            </Text>
          </View>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
            {subItems.map((item, i) => (
              <CartItem item={item} key={i} />
            ))}

          </ScrollView>
        </View>
      )}
    </>
  );
}

export default CartVendor;
