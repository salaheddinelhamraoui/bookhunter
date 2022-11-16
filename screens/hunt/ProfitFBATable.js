import React from "react";
import { Pressable, Text, View } from "react-native";

function ProfitFBATable() {
  return (
    <View>
      <View className="py-4 bg-lightTeal flex items-center">
        <Text>Profit (FBA)</Text>
        <Text>$82.85</Text>
      </View>
      <View className="flex-row pt-2 bg-white ">
        <View className="flex-grow items-center border-r-2 border-black">
          <Text>0</Text>
          <Text>Used</Text>
          <View className=" w-full flex-row py-4">
            <View className="flex-grow items-center">
              <Text>All</Text>
              <Pressable className="my-2 p-2 bg-darkTeal rounded-md">
                <Text>20.35 G</Text>
              </Pressable>
              <Pressable className="my-2 p-2 ">
                <Text>20.35 G</Text>
              </Pressable>
              <Pressable className="my-2 p-2 rounded-md">
                <Text>20.35 G</Text>
              </Pressable>
              <Pressable className="my-2 p-2 rounded-md">
                <Text>20.35 G</Text>
              </Pressable>
            </View>
            <View className="flex-grow items-center">
              <Text>FBA</Text>
              <Pressable className="my-2 p-2 ">
                <Text>20.35 V</Text>
              </Pressable>
              <Pressable className="my-2 p-2 bg-darkTeal rounded-md">
                <Text>20.35 V</Text>
              </Pressable>
            </View>
          </View>
        </View>
        <View className="flex-grow items-center  ">
          <Text>0</Text>
          <Text>New</Text>
          <View className=" w-full flex-row py-4">
            <View className="flex-grow items-center">
              <Text>All</Text>
              <Pressable className="my-2 p-2 bg-darkTeal rounded-md">
                <Text>20.35 G</Text>
              </Pressable>
              <Pressable className="my-2 p-2 ">
                <Text>20.35 G</Text>
              </Pressable>
              <Pressable className="my-2 p-2 rounded-md">
                <Text>20.35 G</Text>
              </Pressable>
              <Pressable className="my-2 p-2 rounded-md">
                <Text>20.35 G</Text>
              </Pressable>
            </View>
            <View className="flex-grow items-center">
              <Text>FBA</Text>
              <Pressable className="my-2 p-2 ">
                <Text>20.35 V</Text>
              </Pressable>
              <Pressable className="my-2 p-2 bg-darkTeal rounded-md">
                <Text>20.35 V</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default ProfitFBATable;
