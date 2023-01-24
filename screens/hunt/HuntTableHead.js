import React, { useState } from "react";
import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

function HuntTableHead({ huntTableHead }) {
  const renderAve = (ave) => {
    const aveLength = ave.split(",").length;
    const value = ave.split(",")[0];
    if (aveLength === 1) return value;
    if (aveLength === 2) return `${value}K`;
    if (aveLength === 3) return `${value}M`;
  };

  const { salesRank, huntScore, avg, ebay } = huntTableHead;

  const averageValue = avg.map((item) => renderAve(item));

  const [average, setAverage] = useState(averageValue[0]);
  const [ebayPrice, setEbayPrice] = useState(ebay[0]);
  const data = [
    { label: averageValue[0], value: averageValue[0] },
    { label: averageValue[1], value: averageValue[1] },
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
          <Text className="text-white text-center">{renderAve(salesRank)}</Text>
        </View>
        <View>
          <Text className="text-white">Hunt Score</Text>
          <Text className="text-white text-center">{huntScore}</Text>
        </View>
        <View>
          <Text className="text-white">Ave Sales Rank</Text>
          <View className="bg-white rounded-md">
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
            />
          </View>
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
          <View className="items-center">
            <View className="bg-white  rounded-md w-32">
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
                // className="text-white w-36 m-auto px-1 py-0"
                activeColor="#88888880"
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

export default HuntTableHead;
