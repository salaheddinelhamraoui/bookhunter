import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { assets, FONTS, SIZES } from "../../constants";

function Member({ member }) {
  const navigation = useNavigation();
  const { firstName, lastName, role, type } = member;
  return (
    <View className="w-[48%] mt-6 bg-white rounded-lg px-4 py-4">
      <TouchableOpacity
        className="absolute top-[-15] right-[-8] rounded-full w-[35px] h-[35px] bg-gray-200"
        onPress={() => {
          navigation.navigate("EditMember", { member });
        }}
      >
        <View className="mx-auto my-auto">
          <Image
            source={assets.edit}
            resizeMode="contain"
            className="w-[15px] h-[15px]"
          />
        </View>
      </TouchableOpacity>
      <Text
        className="text-center"
        style={{
          fontFamily: FONTS.JosefinSansBold,
          fontSize: SIZES.medium,
        }}
      >
        {`${firstName} ${lastName}`}
      </Text>
      <Text
        className="text-center mt-3 text-blue-500"
        style={{
          fontFamily: FONTS.textRegular,
        }}
      >
        {role}
      </Text>
      <Text
        className="text-center mt-3"
        style={{
          fontFamily: FONTS.textRegular,
        }}
      >
        {type}
      </Text>
    </View>
  );
}

export default Member;
