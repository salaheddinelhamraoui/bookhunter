import { DrawerActions, useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { useSelector } from "react-redux";
import { assets } from "../../constants";

function NavBar() {
  const navigation = useNavigation();
  const { qty } = useSelector((state) => state.cardSlice);

  return (
    <View className="felx flex-row items-between justify-between  h-[50px] mt-4">
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
        // onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      >
        <Image
          source={assets.bag}
          resizeMode="contain"
          className="w-[25px] h-[40px] mr-4"
        />
        <Text className="absolute bg-green-600 rounded-full w-5 h-5 text-center left-4 top-3">
          {qty}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default NavBar;
