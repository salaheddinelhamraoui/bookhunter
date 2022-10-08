import React from "react";
import { View, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function InputSearch({ ISBN, onShow }) {
  return (
    <View
      className="bg-white rounded-md shadow-lg shadow-gray-400 flex-row align-middle py-4 px-4"
      onTouchStart={onShow}
    >
      <Ionicons name="search" size={24} color="black" />
      <Text className="text-xl pl-5">{ISBN.join("")}</Text>
    </View>
  );
}

export default InputSearch;
