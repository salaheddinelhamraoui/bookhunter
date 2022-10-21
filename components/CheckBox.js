import React from "react";
import { Pressable, View } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

function CheckBox({ handleCheckBox, isChecked = false, children }) {
  return (
    <View className="flex-1 flex-row items-center gap-2 justify-center">
      <Pressable
        className="border-[1px] border-darkBlue h-5 w-5 relative rounded-md"
        onPress={handleCheckBox}
      >
        {isChecked && <FontAwesome name="check" size={20} color="black" />}
      </Pressable>

      {children}
    </View>
  );
}

export default CheckBox;
