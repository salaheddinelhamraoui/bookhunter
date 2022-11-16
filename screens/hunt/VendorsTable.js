import React from "react";
import { Image, Pressable, Text, View } from "react-native";

function VendorsTable() {
  return (
    <View>
      <View className="py-4 bg-lightTeal flex items-center">
        <Text>Profit (FBA)</Text>
        <Text>$82.85</Text>
      </View>
      <View className="flex-row pt-2 bg-white ">
        <View className="flex-grow items-center">
          <Text>0</Text>
          <Text>Vendors</Text>
          <View className=" w-full flex-row py-4">
            <View className="flex-grow items-center">
              <Pressable className="my-2 p-2 bg-darkTeal rounded-md flex-row w-5/6 justify-between items-center">
                <Image
                  source={{ uri: "https://bookhunter.com/BookToCash.png" }}
                />
                <Text>eCampus</Text>
                <Text>7.00</Text>
                <Pressable className="bg-greyBlue px-2 py-1 rounded-md">
                  <Text className="text-white">Sell</Text>
                </Pressable>
              </Pressable>
              <Pressable className="my-2 p-2  rounded-md flex-row w-5/6 justify-between items-center">
                <Image
                  source={{ uri: "https://bookhunter.com/BookToCash.png" }}
                />
                <Text>eCampus</Text>
                <Text>7.00</Text>
                <Pressable className="bg-greyBlue px-2 py-1 rounded-md">
                  <Text className="text-white">Sell</Text>
                </Pressable>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default VendorsTable;
