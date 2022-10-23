import React, { useEffect } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import {
  Image,
  Pressable,
  SafeAreaView,
  Text,
  View,
  ScrollView,
} from "react-native";
import { assets, FONTS } from "../../constants";

const Stack = createStackNavigator();

function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView>
        <View className="">
          <Image
            source={assets.auth}
            resizeMode="contain"
            className="w-full h-[60vh] mt-28"
          />
        </View>
        <View className="flex-row justify-center items-center mx-4">
          <Pressable
            onPress={() => navigation.navigate("SIGNIN")}
            className="bg-darkTeal px-10 py-4 rounded-l-md"
          >
            <Text
              className="text-white text-lg"
              style={{ fontFamily: FONTS.JosefinSansBold }}
            >
              Sign In
            </Text>
          </Pressable>
          <Pressable
            onPress={() => navigation.navigate("SIGNUP")}
            className="bg-darkBlue px-10 py-4 rounded-r-md"
          >
            <Text
              className="text-white  text-lg"
              style={{ fontFamily: FONTS.JosefinSansBold }}
            >
              Sign Up
            </Text>
          </Pressable>
        </View>
        <Pressable onPress={() => navigation.replace("HOME")}>
          <Text
            className="text-gray-500 text-center mt-4 text-lg"
            style={{ fontFamily: FONTS.JosefinSansBold }}
          >
            Login as a guest {">"}
          </Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

export default function StackNavigation() {
  return (
    <Stack.Navigator
      initialRouteName="WELCOME"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        presentation: "modal",
        headerMode: "screen",
      }}
    >
      <Stack.Screen name="WELCOME" component={WelcomeScreen} />
      <Stack.Screen name="SIGNIN" component={SignIn} />
      <Stack.Screen name="SIGNUP" component={SignUp} />
    </Stack.Navigator>
  );
}
