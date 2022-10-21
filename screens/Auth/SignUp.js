import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  Text,
  View,
} from "react-native";
import { TextInput } from "react-native-paper";
import CheckBox from "../../components/CheckBox";
import { FONTS } from "../../constants";

function SignUp() {
  const [checked, setChecked] = useState(false);
  const handleCheckBox = () => {
    setChecked((prev) => !prev);
  };

  return (
    <SafeAreaView>
      <View
        className="mx-4"
        style={{
          marginTop:
            Platform.OS === "android"
              ? parseInt(StatusBar.currentHeight + 16)
              : 16,
        }}
      >
        <KeyboardAvoidingView behavior="height">
          {Platform.OS !== "android" && (
            <Pressable className="self-center h-2 bg-gray-300 w-16 my-4 rounded-xl"></Pressable>
          )}

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text
              style={{ fontFamily: FONTS.JosefinSansBold }}
              className="text-5xl mb-4"
            >
              Lets Register Account
            </Text>
            {/* <View>
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
          </View> */}
            <View className="gap-1">
              <TextInput
                outlineColor="#6fbfbf"
                activeOutlineColor="#393e59"
                mode="outlined"
                label="First Name"
                placeholder="First Name"
              />
              <TextInput
                outlineColor="#6fbfbf"
                activeOutlineColor="#393e59"
                mode="outlined"
                label="First Name"
                placeholder="Last Name"
              />
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
              <TextInput
                outlineColor="#6fbfbf"
                placeholder="Password Cofirmation"
                activeOutlineColor="#393e59"
                mode="outlined"
                label="Password Cofirmation"
                secureTextEntry={true}
              />
            </View>
            <Pressable className="bg-darkBlue my-5 py-4 rounded-md">
              <Text
                style={{ fontFamily: FONTS.JosefinSansBold }}
                className="text-center text-lg text-white"
              >
                Sign Up
              </Text>
            </Pressable>
            <CheckBox handleCheckBox={handleCheckBox} isChecked={checked}>
              <Text
                onPress={handleCheckBox}
                style={{ fontFamily: FONTS.JosefinSansBold }}
                className="text-center text-base text-darkBlue"
              >
                I agree{" "}
                <Text className="text-darkTeal underline">
                  to the Master Subscription Agreement
                </Text>
              </Text>
            </CheckBox>
          </ScrollView>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  );
}

export default SignUp;
