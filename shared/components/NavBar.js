import { DrawerActions, useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, TouchableOpacity, View } from "react-native";
import { Drawer } from "react-native-paper";
import { assets } from "../../constants";

function NavBar() {
  const navigation = useNavigation();

  return (
    <View className="felx flex-row h-[50px] mt-4">
      <Image
        source={assets.hunter}
        resizeMode="contain"
        className="w-[50%] h-[40px]"
      />
      <TouchableOpacity
        className=" ml-auto"
        onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      >
        <Image
          source={assets.menu}
          resizeMode="contain"
          className="w-[25px] h-[40px] mr-4"
        />
      </TouchableOpacity>
    </View>
  );
}

export default NavBar;
