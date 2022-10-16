import React from "react";
import { ScrollView } from "react-native-gesture-handler";
import { useSelector } from "react-redux";
import CartVendor from "../../components/CartVendor";
import { Text, View, Image } from "react-native";
import { assets, FONTS } from "../../constants";

function Cart() {
  const { items } = useSelector((state) => state.cardSlice);
  const { qty } = useSelector((state) => state.cardSlice);

  return (
    <View className="bg-white h-full">
      <ScrollView showsVerticalScrollIndicator={false}>
        {items.map((item, i) => (
          <CartVendor data={item} key={i} title={item.vendor} />
        ))}
      </ScrollView>

      {qty === 0 && (
        <View className="h-full flex items-center justify-center">
          <Image
            source={assets.empty}
            resizeMode="contain"
            className="w-[250px] h-[250px] -mt-24"
          />
          <Text
            style={{
              fontFamily: FONTS.JosefinSansBold,
              fontSize: 20,
            }}
          >
            Your Cart Is Currently Empty !
          </Text>
        </View>
      )}
    </View>
  );
}

export default Cart;
