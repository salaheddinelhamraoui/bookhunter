import React, { useState } from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

function NumberKeypad({ onPress, onClear, onHide }) {
  return (
    <>
      <View className="flex-row justify-around py-2 px-2">
        <TouchableOpacity
          className="bg-slate-50 w-16 h-10 items-center justify-center rounded-md"
          onPress={() => onPress(1)}
        >
          <Text>1</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-slate-50 w-16 h-10 items-center justify-center rounded-md"
          onPress={() => onPress(2)}
        >
          <Text>2</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-slate-50 w-16 h-10 items-center justify-center rounded-md"
          onPress={() => onPress(3)}
        >
          <Text>3</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-around py-2 px-2 ">
        <TouchableOpacity
          className="bg-slate-50 w-16 h-10 items-center justify-center rounded-md"
          onPress={() => onPress(4)}
        >
          <Text>4</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-slate-50 w-16 h-10 items-center justify-center rounded-md"
          onPress={() => onPress(5)}
        >
          <Text>5</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-slate-50 w-16 h-10 items-center justify-center rounded-md"
          onPress={() => onPress(6)}
        >
          <Text>6</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-around py-2 px-2">
        <TouchableOpacity
          className="bg-slate-50 w-16 h-10 items-center justify-center rounded-md"
          onPress={() => onPress(7)}
        >
          <Text>7</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-slate-50 w-16 h-10 items-center justify-center rounded-md"
          onPress={() => onPress(8)}
        >
          <Text>8</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-slate-50 w-16 h-10 items-center justify-center rounded-md"
          onPress={() => onPress(9)}
        >
          <Text>9</Text>
        </TouchableOpacity>
      </View>
      <View className="flex-row justify-around py-2 px-2">
        <TouchableOpacity
          className="bg-slate-50 w-16 h-10 items-center justify-center rounded-md"
          onPress={() => onPress("987x/")}
        >
          <Text>987x/</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-slate-50 w-16 h-10 items-center justify-center rounded-md"
          onPress={() => onPress(0)}
        >
          <Text>0</Text>
        </TouchableOpacity>
        <TouchableOpacity
          className="bg-slate-50 w-16 h-10 items-center justify-center rounded-md"
          onPress={onClear}
        >
          <Text>{"Clear"}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className="bg-slate-50 w-16 h-10 items-center justify-center rounded-md"
        onPress={onHide}
      >
        <Text>{"Hide"}</Text>
      </TouchableOpacity>
    </>
  );
}

export default NumberKeypad;
