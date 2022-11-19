import React, { useState } from "react";
import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

function HuntTableHead({ huntTableHead }) {
  const { salesRank, huntScore, avg, ebay } = huntTableHead;
  const [average, setAverage] = useState(avg[0]);
  const [ebayPrice, setEbayPrice] = useState(ebay[0]);
  const data = [
    { label: avg[0], value: avg[0] },
    { label: avg[1], value: avg[1] },
  ];

  const data2 = [
    { label: ebay[0], value: ebay[0] },
    { label: ebay[1], value: ebay[1] },
  ];

  return (
    <View className="bg-greyBlue">
      <View className="flex-row justify-between p-3 ">
        <View>
          <Text className="text-white">Sales Rank</Text>
          <Text className="text-white text-center">{salesRank}</Text>
        </View>
        <View>
          <Text className="text-white">Hunt Score</Text>
          <Text className="text-white text-center">{huntScore}</Text>
        </View>
        <View>
          <Text className="text-white">Ave Sales Rank</Text>
          <Dropdown
            data={data}
            maxHeight={200}
            labelField="label"
            valueField="value"
            value={average}
            placeholder={average}
            onChange={(item) => {
              setAverage(item?.label);
            }}
            className="text-white px-2 py-1"
            activeColor="#88888880"
            inputSearchStyle={{ color: "white" }}
          />
        </View>
      </View>
      <View className="justify-center flex bg-darkTeal">
        <Text className="w-12 h-[1px] "></Text>
      </View>
      <View className="flex-row  justify-around  p-3">
        <View className="flex-grow">
          <Text className="text-white text-center">Buy Cost</Text>
          <Text className="text-white text-center">0</Text>
        </View>
        <View className="flex-grow">
          <Text className="text-white text-center">Ebay Listing</Text>
          <Dropdown
            data={data2}
            maxHeight={200}
            labelField="label"
            valueField="value"
            value={ebayPrice}
            placeholder={ebayPrice}
            onChange={(item) => {
              setEbayPrice(item?.label);
            }}
            className="text-white w-36 m-auto px-1 py-0"
            activeColor="#88888880"
            inputSearchStyle={{ color: "white" }}
          />
        </View>
      </View>
    </View>
  );
}

export default HuntTableHead;
