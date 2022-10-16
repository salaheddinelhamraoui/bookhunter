import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { FONTS } from "../constants";

function DropDownMenu({ selectItem, item }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleIsOpen = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      <TouchableOpacity
        className="mr-1 justify-center border-[1px] border-gray-300 rounded-md bg-white shadow-sm p-2 w-16"
        onPress={toggleIsOpen}
      >
        <Text
          className="text-center text-base"
          style={{ fontFamily: FONTS.JosefinSansBold }}
        >
          {item ? item : "..."}
        </Text>
      </TouchableOpacity>
      {isOpen && (
        <View className="absolute -bottom-[280%]  w-16 p-1 border-[1px] border-gray-300 rounded-md bg-white shadow-sm">
          <TouchableOpacity
            className="my-2"
            onPress={() => {
              selectItem("");
              setIsOpen(false);
            }}
          >
            <Text>...</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="my-2"
            onPress={() => {
              selectItem("X");
              setIsOpen(false);
            }}
          >
            <Text>X</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="my-2"
            onPress={() => {
              selectItem("290");
              setIsOpen(false);
            }}
          >
            <Text>290</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="my-2"
            onPress={() => {
              setIsOpen(false);
              selectItem("978");
            }}
          >
            <Text>978</Text>
          </TouchableOpacity>
        </View>
      )}
    </>
  );
}

export default DropDownMenu;
