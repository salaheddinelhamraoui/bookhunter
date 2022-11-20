import React from "react";
import { Pressable, View, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";

function Loading({ cancelLoading }) {
  return (
    <>
      <View className="flex-1 h-screen absolute  w-full z-[999] bg-slate-600 opacity-10"></View>
      <Pressable
        className="bg-red-500 w-40 mx-auto py-4 rounded-md items-center z-[1200] flex-1 absolute top-[60%] right-1/3"
        onPress={cancelLoading}
      >
        <Text>Cancel</Text>
      </Pressable>
      <ActivityIndicator className=" flex-1 absolute top-1/2 right-1/2 z-50" />
    </>
  );
}

export default Loading;
