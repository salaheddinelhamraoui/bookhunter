import React, { useCallback } from "react";
import { Alert, Linking, Pressable, Text, View } from "react-native";

function HuntActions({ huntActions, handleClick, selectedItemId }) {
  const { minUsedFbaPrice, buyBox, amazonPrice, graph, amazonUrl } =
    huntActions;

  const handlePress = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(amazonUrl);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(amazonUrl);
    } else {
      Alert.alert(`Cannot Open This URL Please Contact Support`);
    }
  }, [amazonUrl]);

  const handlePressGraph = useCallback(async () => {
    // Checking if the link is supported for links with custom URL scheme.
    const supported = await Linking.canOpenURL(graph);

    if (supported) {
      // Opening the link with some app, if the URL scheme is "http" the web link should be opened
      // by some browser in the mobile
      await Linking.openURL(graph);
    } else {
      Alert.alert(`Cannot Open This URL Please Contact Support`);
    }
  }, [graph]);
  return (
    <View className="my-4 bg-white shadow-md p-4 mx-4  rounded-md">
      <View className="flex gap-2 flex-row justify-between my-2">
        <Pressable
          id="usedBuyBox"
          className={` rounded-md shadow-md flex-grow p-2 ${
            "usedBuyBox" === selectedItemId ? "bg-darkTeal" : "bg-gray-200"
          } rounded-md`}
          onPress={() => handleClick(minUsedFbaPrice, "usedBuyBox")}
        >
          <Text className="text-center">${minUsedFbaPrice}</Text>
          <Text className="text-center">Used Buy Box</Text>
        </Pressable>
        <Pressable
          className={` rounded-md shadow-md flex-grow p-2 ${
            "newBuyBox" === selectedItemId ? "bg-darkTeal" : "bg-gray-200"
          } rounded-md`}
          onPress={() => handleClick(buyBox, "newBuyBox")}
          id="newBuyBox"
        >
          <Text className="text-center">${buyBox}</Text>
          <Text className="text-center">New Buy Box</Text>
        </Pressable>
        <Pressable
          className={` rounded-md shadow-md flex-grow p-2 ${
            "amazonPrice" === selectedItemId ? "bg-darkTeal" : "bg-gray-200"
          } rounded-md`}
          onPress={() => handleClick(amazonPrice, "amazonPrice")}
          id="amazonPrice"
        >
          <Text className="text-center">${amazonPrice}</Text>
          <Text className="text-center">Amazon</Text>
        </Pressable>
      </View>
      <View className="flex flex-row justify-between my-2 ">
        <Pressable
          className="bg-gray-200 p-2 rounded-md shadow-md w-[48%] tr"
          onPress={handlePressGraph}
        >
          <Text className="text-center">Keepa Chart</Text>
        </Pressable>
        <Pressable
          className="bg-gray-200 p-2 rounded-md shadow-md w-[48%]"
          onPress={handlePress}
        >
          <Text className="text-center">Amazon</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default HuntActions;
