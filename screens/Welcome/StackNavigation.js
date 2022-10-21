import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
import { NavigationContainer } from "@react-navigation/native";
import { Image, Pressable, SafeAreaView, Text, View } from "react-native";
import { assets, FONTS } from "../../constants";
const Stack = createStackNavigator();

function WelcomeScreen({ navigation }) {
  return (
    <SafeAreaView className="flex-1">
      <View className="flex-1">
        <Image source={assets.goals} resizeMode="cover" className="w-full" />
      </View>
      <View className="flex-1  flex-row justify-center items-center mx-4">
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
    </SafeAreaView>
  );
}

export default function StackNavigation({ theme }) {
  return (
    <NavigationContainer theme={theme}>
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
    </NavigationContainer>
  );
}
