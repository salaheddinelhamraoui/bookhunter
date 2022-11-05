import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { assets, FONTS, SIZES } from "../../constants";

function TriggerSetCard({
  navigation,
  triggerSet,
  userId,
  inactiveTriggerSet,
}) {
  const { fulfillement, buyCost, FBACostPerLBS, active } = triggerSet;
  const updateTrigger = () => {
    inactiveTriggerSet(triggerSet._id);
  };
  return (
    <View className="bg-white rounded-2xl w-[48%] mb-6">
      <View className="px-4 py-4 mb-4">
        <TouchableOpacity
          className="absolute top-[-15] right-[-8] rounded-full w-[35px] h-[35px] bg-gray-200"
          onPress={() =>
            navigation.navigate("EditTrigger", { triggerSet, userId })
          }
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
          className="border-b-[0.2px] border-gray-500 pb-2 mb-2 text-center w-full "
          style={{
            fontFamily: FONTS.JosefinSansBold,
            fontSize: SIZES.medium,
            lineHeight: 20,
          }}
        >
          BookHunter Default
        </Text>
        <View className="w-full flex flex-row ">
          <View className="w-[70%] mb-1">
            <Text
              style={{
                fontFamily: FONTS.JosefinSansBold,
                fontSize: SIZES.font,
              }}
            >
              Fulfillement :
            </Text>
          </View>
          <View className="w-[30%] mb-1">
            <Text
              className="ml-auto"
              style={{
                fontFamily: FONTS.textRegular,
                fontSize: SIZES.font,
              }}
            >
              {fulfillement}
            </Text>
          </View>
        </View>
        <View className="w-full flex flex-row">
          <View className="w-[70%] mb-1">
            <Text
              style={{
                fontFamily: FONTS.JosefinSansBold,
                fontSize: SIZES.font,
              }}
            >
              Buy Cost :
            </Text>
          </View>
          <View className="w-[30%]">
            <Text
              className="ml-auto"
              style={{
                fontFamily: FONTS.textRegular,
                fontSize: SIZES.font,
              }}
            >
              {buyCost}
            </Text>
          </View>
        </View>
        <View className="w-full flex flex-row">
          <View className="w-[70%]">
            <Text
              style={{
                fontFamily: FONTS.JosefinSansBold,
                fontSize: SIZES.font,
              }}
            >
              Cost Per lb :
            </Text>
          </View>
          <View className="w-[30%]">
            <Text
              className="ml-auto"
              style={{
                fontFamily: FONTS.textRegular,
                fontSize: SIZES.font,
              }}
            >
              {FBACostPerLBS}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        onPress={() => updateTrigger()}
        className={`rounded-b-2xl ${
          active === "true" ? "bg-green-500" : "bg-gray-400"
        }`}
      >
        <Text
          className="py-2 text-center text-white"
          style={{
            fontFamily: FONTS.JosefinSansBold,
            fontSize: SIZES.extraMedium,
          }}
        >
          {active === "true" ? "Active" : "Inactive"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default TriggerSetCard;
