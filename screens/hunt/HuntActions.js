import React from "react";
import { Pressable, Text, View } from "react-native";

function HuntActions({ huntActions }) {
  const { minUsedFbaPrice, buyBox, amazonPrice, graph, amazonUrl } =
    huntActions;
  return (
    <View className="my-4 bg-white shadow-md p-4 mx-4  rounded-md">
      <View className="flex flex-row justify-between my-2">
        <Pressable className="bg-gray-200 p-2 mr-2 rounded-md shadow-md flex-grow">
          <Text className="text-center">${minUsedFbaPrice}</Text>
          <Text className="text-center">Used Buy Box</Text>
        </Pressable>
        <Pressable className="bg-gray-200 mr-2 p-2 rounded-md shadow-md flex-grow">
          <Text className="text-center">${buyBox}</Text>
          <Text className="text-center">New Buy Box</Text>
        </Pressable>
        <Pressable className="bg-gray-200 p-2 rounded-md shadow-md flex-grow">
          <Text className="text-center">${amazonPrice}</Text>
          <Text className="text-center">Amazon</Text>
        </Pressable>
      </View>
      <View className="flex flex-row justify-between my-2 ">
        <Pressable className="bg-gray-200 p-2 rounded-md shadow-md w-[48%] tr">
          <Text className="text-center">Keepa Chart</Text>
        </Pressable>
        <Pressable className="bg-gray-200 p-2 rounded-md shadow-md w-[48%]">
          <Text className="text-center">Amazon</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default HuntActions;
