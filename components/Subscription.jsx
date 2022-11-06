import React, { useCallback } from "react";
import { Alert, Linking, Pressable, Text, View } from "react-native";
import { FONTS } from "../constants";

function Subscription({ sub }) {
  const url = "https://bookhunter.com/pricing";
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Can't open this URL: ${url}`);
    }
  }, []);
  return (
    <View className="bg-white p-6 rounded-md shadow-md shadow-gray-300 m-4">
      {!sub?.plan ? (
        <>
          <Text
            style={{ fontFamily: FONTS.JosefinSansBold }}
            className="text-2xl text-center"
          >
            You don't have any subscription
          </Text>
          <View className="flex-row justify-center">
            <Text
              style={{ fontFamily: FONTS.JosefinSansBold }}
              className="text-lg"
            >
              Get more
            </Text>
            <Pressable onPress={handlePress}>
              <Text
                style={{ fontFamily: FONTS.JosefinSansBold }}
                className="text-lg underline ml-1 text-darkTeal"
              >
                information
              </Text>
            </Pressable>
          </View>
        </>
      ) : null}
      {sub?.plan ? (
        <>
          <Text
            style={{ fontFamily: FONTS.JosefinSansBold }}
            className="text-2xl text-center"
          >
            {sub.plan}
          </Text>
          <View className="flex items-center">
            <Text
              style={{ fontFamily: FONTS.JosefinSansBold }}
              className={`text-lg text-center w-28 text-white ${
                sub.status === "active" ? "bg-green-500" : "bg-red-500"
              }`}
            >
              {sub.status}
            </Text>
          </View>
        </>
      ) : null}
    </View>
  );
}

export default Subscription;
