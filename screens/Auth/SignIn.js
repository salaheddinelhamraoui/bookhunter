import React from "react";
import {
  Pressable,
  SafeAreaView,
  Text,
  View,
  Platform,
  StatusBar,
} from "react-native";
import { TextInput } from "react-native-paper";
import { FONTS } from "../../constants";
import { FontAwesome } from "@expo/vector-icons";

function SignIn() {
  return (
    <SafeAreaView>
      {Platform.OS !== "android" && (
        <Pressable className="self-center h-1 bg-gray-300 w-16 my-4 rounded-xl"></Pressable>
      )}
      <View
        className="mx-4"
        style={{
          marginTop:
            Platform.OS === "android"
              ? parseInt(StatusBar.currentHeight + 16)
              : 16,
        }}
      >
        <Text
          style={{ fontFamily: FONTS.JosefinSansBold }}
          className="text-5xl mb-4"
        >
          Lets Sign you in
        </Text>
        <View>
          <Text
            style={{ fontFamily: FONTS.JosefinSansBold }}
            className="text-2xl"
          >
            Welcome Back,
          </Text>
          <Text
            style={{ fontFamily: FONTS.JosefinSansBold }}
            className="text-2xl mb-8"
          >
            You have been missed
          </Text>
        </View>
        <View className="gap-3">
          <TextInput
            outlineColor="#6fbfbf"
            activeOutlineColor="#393e59"
            mode="outlined"
            label="Email"
            keyboardType="email-address"
            placeholder="example@gmail.com"
          />
          <TextInput
            outlineColor="#6fbfbf"
            placeholder="Password"
            activeOutlineColor="#393e59"
            mode="outlined"
            label="Password"
            secureTextEntry={true}
          />
          <Pressable>
            <Text
              style={{ fontFamily: FONTS.JosefinSansBold }}
              className="underline self-end"
            >
              Forgot Password?
            </Text>
          </Pressable>
        </View>
        <Pressable className="bg-darkBlue my-5 py-4 rounded-md">
          <Text
            style={{ fontFamily: FONTS.JosefinSansBold }}
            className="text-center text-lg text-white"
          >
            Sign In
          </Text>
        </Pressable>
        <View className="flex-row w-full items-center">
          <Text className="h-[1px] bg-darkBlue flex-grow mr-2"></Text>
          <Text
            style={{ fontFamily: FONTS.JosefinSansBold }}
            className="text-lg "
          >
            or
          </Text>
          <Text className="h-[1px] bg-darkBlue flex-grow ml-2"></Text>
        </View>
        <View className="flex-row gap-2 justify-center my-3">
          <Pressable>
            <FontAwesome name="twitter" size={24} color="#010326" />
          </Pressable>
          <Pressable>
            <FontAwesome name="facebook-square" size={24} color="#010326" />
          </Pressable>
          <Pressable>
            <FontAwesome name="google" size={24} color="#010326" />
          </Pressable>
          <Pressable>
            <FontAwesome name="instagram" size={24} color="#010326" />
          </Pressable>
        </View>
        <View className="flex-row justify-center">
          <Text
            style={{ fontFamily: FONTS.JosefinSansBold }}
            className="text-lg"
          >
            Dont have account?
          </Text>
          <Pressable>
            <Text
              style={{ fontFamily: FONTS.JosefinSansBold }}
              className="text-lg underline ml-2 text-darkTeal"
            >
              Sign Up
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

export default SignIn;
