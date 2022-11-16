import React from "react";
import { Text, View } from "react-native";

function HuntTableHead() {
  return (
    <View className="bg-greyBlue">
      <View className="flex-row justify-between p-3 ">
        <View>
          <Text className="text-white">Sales Rank</Text>
          <Text className="text-white text-center">680.36K</Text>
        </View>
        <View>
          <Text className="text-white">Hunt Score</Text>
          <Text className="text-white text-center">50</Text>
        </View>
        <View>
          <Text className="text-white">Ave Sales Rank</Text>
          <Text className="text-white text-center">293.81K</Text>
        </View>
      </View>
      <View className="justify-center flex bg-darkTeal">
        <Text className="w-12 h-[1px] "></Text>
      </View>
      <View className="flex-row justify-around p-3">
        <View>
          <Text className="text-white">Buy Cost</Text>
          <Text className="text-white text-center">0</Text>
        </View>
        <View>
          <Text className="text-white">Ebay Listing</Text>
          <Text className="text-white text-center">New $181.95</Text>
        </View>
      </View>
    </View>
  );
}

export default HuntTableHead;
