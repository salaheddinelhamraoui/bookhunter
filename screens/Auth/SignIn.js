import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useCallback, useState } from "react";
import {
  Pressable,
  SafeAreaView,
  Text,
  View,
  Platform,
  StatusBar,
  Linking,
  Alert,
} from "react-native";
import { TextInput } from "react-native-paper";
import Toast from "react-native-root-toast";
import { FONTS } from "../../constants";
import { signInAPI } from "../../utils/auth.service";

function SignIn({ navigation }) {
  const [username, setUsername] = useState("");
  const [isValidUsername, setIsValidUsername] = useState();

  const [password, setPassword] = useState();
  const [isValidPwd, setIsValidPwd] = useState();

  const [errMsg, setErrMsg] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  const url = "https://bookhunter.com/sendEmail";
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(`Can't open this URL: ${url}`);
    }
  }, []);

  const checkFormIsValid = () => {
    if (isValidPwd && isValidUsername) {
      return true;
    }
    return false;
  };

  function handleInputChange(type, str) {
    const containSpecialCaractere = new RegExp(/[$-/:-?{-~!"^_`\[\]]/);
    const containNumber = new RegExp(/[0-9]/);
    switch (type) {
      case "USERNAME":
        if (str.length <= 2) {
          setIsValidUsername(false);
          setUsername(str);
          setErrMsg("Invalid Username");
        } else {
          setIsValidUsername(true);
          setUsername(str);
          setErrMsg("");
        }
        break;
      case "PWD":
        if (str.length <= 6) {
          setIsValidPwd(false);
          setPassword(str);
          setErrMsg("Invalid Password");
        } else {
          setIsValidPwd(true);
          setPassword(str);
          setErrMsg("");
        }
        break;
      default:
        break;
    }
  }

  const submitForm = async () => {
    setIsLoading(true);
    try {
      const req = await signInAPI(username, password);
      const data = await req.data;

      if (data.accessToken) {
        setIsLoading(false);
        await AsyncStorage.setItem("loginData", JSON.stringify({ data: data }));
        navigation.replace("HOME", { user: data });
      } else {
        setIsLoading(false);
        Toast.show("Username or Password Incorrect, Please try again!", {
          duration: Toast.durations.SHORT,
          position: Toast.positions.CENTER,
          shadow: true,
          animation: true,
          hideOnPress: true,
          delay: 0,
          containerStyle: {
            backgroundColor: "#FF8787",
            height: 60,
            justifyContent: "center",
          },
        });
      }
    } catch (error) {
      setIsLoading(false);
      Toast.show("Username or Password Incorrect, Please try again!", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        containerStyle: {
          backgroundColor: "#FF8787",
          height: 60,
          justifyContent: "center",
        },
      });
    }
  };
  return (
    <SafeAreaView>
      {Platform.OS !== "android" && (
        <Pressable className="self-center h-1 bg-gray-300 w-16 my-4 rounded-xl"></Pressable>
      )}
      {isLoading && (
        <View className="flex-1 h-[130%] w-full bg-slate-200 opacity-80 absolute z-50 justify-center">
          <Text className="text-center text-black ">Loading...</Text>
        </View>
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
          className="text-5xl mb-4 mt-8"
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
            autoCapitalize="none"
            onChangeText={(text) => handleInputChange("USERNAME", text)}
            outlineColor="#6fbfbf"
            activeOutlineColor="#393e59"
            mode="outlined"
            label="Username"
            placeholder="Username"
          />
          {username && !isValidUsername && (
            <Text
              style={{ fontFamily: FONTS.JosefinSansBold }}
              className="text-red-400"
            >
              {errMsg}
            </Text>
          )}
          <TextInput
            autoCapitalize="none"
            onChangeText={(text) => handleInputChange("PWD", text)}
            outlineColor="#6fbfbf"
            placeholder="Password"
            activeOutlineColor="#393e59"
            mode="outlined"
            label="Password"
            secureTextEntry={true}
          />
          {password && !isValidPwd && (
            <Text
              style={{ fontFamily: FONTS.JosefinSansBold }}
              className="text-red-400"
            >
              {errMsg}
            </Text>
          )}
          <Pressable onPress={handlePress}>
            <Text
              style={{ fontFamily: FONTS.JosefinSansBold }}
              className="underline self-end"
            >
              Forgot Password?
            </Text>
          </Pressable>
        </View>
        <Pressable
          onPress={submitForm}
          className={`my-5 py-4 rounded-md ${
            checkFormIsValid() ? "bg-darkBlue" : "bg-greyBlue opacity-50"
          }`}
          disabled={checkFormIsValid() ? false : true}
        >
          <Text
            style={{ fontFamily: FONTS.JosefinSansBold }}
            className="text-center text-lg text-white"
          >
            Sign In
          </Text>
        </Pressable>
        <View className="flex-row justify-center">
          <Text
            style={{ fontFamily: FONTS.JosefinSansBold }}
            className="text-lg"
          >
            Dont have account?
          </Text>
          <Pressable onPress={() => navigation.navigate("SIGNUP")}>
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
