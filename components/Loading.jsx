import React from "react";
import { View } from "react-native";
import { ActivityIndicator } from "react-native-paper";

function Loading() {
  return (
    <>
      <View className="flex-1 absolute h-full w-full z-[999] bg-slate-600 opacity-10"></View>
      <ActivityIndicator className=" flex-1 absolute top-1/2 right-1/2 z-50" />
    </>
  );
}

export default Loading;
