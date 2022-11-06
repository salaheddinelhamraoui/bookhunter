import { DrawerActions, useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
import { useSelector } from "react-redux";
import { assets, FONTS } from "../constants";

function NavBar() {
  const navigation = useNavigation();
  const { qty } = useSelector((state) => state.cardSlice);

  return (
    <SafeAreaView>
      <View className="flex bg-white flex-row items-between justify-between pt-2  h-[55px] border-b-[0.2px]">
        <TouchableOpacity
          className=""
          onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
        >
          <Image
            source={assets.menus}
            resizeMode="contain"
            className="w-[25px] h-[40px] ml-4"
          />
        </TouchableOpacity>
        <Image
          source={assets.hunter}
          resizeMode="contain"
          className="w-[50%] h-[40px]"
        />
        <TouchableOpacity
          className="mr-4"
          onPress={() => navigation.navigate("CART")}
        >
          <Image
            source={assets.bag}
            resizeMode="contain"
            className="w-[25px] h-[40px] mr-4"
          />
          <View className="absolute bg-lightTeal w-5 h-5  left-4 top-3 justify-center rounded-full">
            <Text
              className="text-center text-white"
              style={{
                fontFamily: FONTS.textBold,
              }}
            >
              {qty}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default NavBar;
