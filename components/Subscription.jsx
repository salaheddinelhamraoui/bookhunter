import React, { useCallback } from "react";
import {
  Alert,
  Linking,
  Pressable,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { FONTS, SIZES } from "../constants";

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

  const convertDate = (ms) => {
    const month = new Date(ms * 1000).getMonth() + 1;
    const day = new Date(ms * 1000).getDate();
    const year = new Date(ms * 1000).getFullYear();
    return `${month}/${day}/${year}`;
  };

  return (
    <View className="bg-white p-6 rounded-md shadow-md shadow-gray-300 m-4">
      {!sub?.subscription?.plan ? (
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
      {sub?.subscription?.plan ? (
        <>
          <Text
            style={{ fontFamily: FONTS.JosefinSansBold }}
            className="text-2xl text-center"
          >
            {sub?.subscription?.plan}
          </Text>
          <View className="flex items-center">
            <Text
              style={{ fontFamily: FONTS.JosefinSansBold }}
              className={`text-lg text-center w-28 text-white my-2 ${
                sub?.subscription?.status === "active"
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            >
              {sub?.subscription?.status}
            </Text>
            <Text
              style={{ fontFamily: FONTS.JosefinSansBold }}
              className={`text-lg text-center my-2`}
            >
              Next Payment:{" "}
              {convertDate(sub?.strapi?.data[0]?.current_period_end)}
            </Text>
          </View>
          <TouchableOpacity
            className="w-full"
            onPress={() => {
              Linking.openURL("https://bookhunter.com/login");
            }}
          >
            <View className="mt-4 bg-[#6fbfbf]  rounded-lg px-4 py-2">
              <Text
                className="text-center"
                style={{
                  fontFamily: FONTS.JosefinSansBold,
                  fontSize: SIZES.medium,
                  color: "white",
                }}
              >
                Update
              </Text>
            </View>
          </TouchableOpacity>
        </>
      ) : null}
    </View>
  );
}

export default Subscription;
