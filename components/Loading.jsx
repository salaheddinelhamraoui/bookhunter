import React from "react";
import { Pressable, View, Text } from "react-native";
import { ActivityIndicator } from "react-native-paper";

function Loading({ cancelLoading }) {
  return (
    <>
      <View className="h-screen absolute  w-full flex flex-col items-center justify-center z-[999] bg-slate-600 opacity-50"></View>
      <Pressable
        className=" mx-auto py-4 rounded-md items-center z-[1200] flex-1 absolute w-full bottom-20"
        onPress={cancelLoading}
      >
        <Text className="text-white text-center ">Cancel</Text>
      </Pressable>
      <ActivityIndicator
        className="text-white flex-1 absolute top-1/2 right-1/2 z-[1200]"
        color="#fff"
      />
    </>
  );
}

export default Loading;
