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
import Toast from "react-native-root-toast";
import CheckBox from "../../components/CheckBox";
import { FONTS } from "../../constants";
import { signUpAPI } from "../../utils/auth.service";

function SignUp({ navigation }) {
  const [checked, setChecked] = useState(false);

  const [username, setUsername] = useState();
  const [isValidUsername, setIsValidUsername] = useState();

  const [firstName, setFirstName] = useState();
  const [isValidFirstName, setIsValidFirstName] = useState();

  const [lastName, setLastName] = useState();
  const [isValidLastName, setIsValidLastName] = useState();

  const [email, setEmail] = useState();
  const [isValidEmail, setIsValidEmail] = useState();

  const [password, setPassword] = useState();
  const [isValidPwd, setIsValidPwd] = useState();

  const [confirmPassword, setConfirmPassword] = useState();
  const [isValidCPwd, setIsValidCPwd] = useState();

  const [formIsValid, setFormIsValid] = useState(false);

  const [errMsg, setErrMsg] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [err, setErr] = useState(false);

  function handleInputChange(type, str) {
    const containSpecialCaractere = new RegExp(/[$-/:-?{-~!"^_`\[\]]/);
    const containNumber = new RegExp(/[0-9]/);
    const isEmailValid = new RegExp(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/);
    switch (type) {
      case "USERNAME":
        if (str.length <= 6) {
          setIsValidUsername(false);
          setUsername(str.replaceAll(" ", ""));
          setFormIsValid(false);
          setErrMsg("Invalid Username");
        } else {
          setIsValidUsername(true);
          setUsername(str.replaceAll(" ", ""));
          setFormIsValid(true);
          setErrMsg("");
        }
        break;
      case "FIRSTNAME":
        if (containNumber.test(str) || containSpecialCaractere.test(str)) {
          setIsValidFirstName(false);
          setFirstName(str);
          setFormIsValid(false);
          setErrMsg("Invalid first name");
        } else {
          setIsValidFirstName(true);
          setFormIsValid(true);
          setFirstName(str);
          setErrMsg("");
        }
        break;
      case "LASTNAME":
        if (containNumber.test(str) || containSpecialCaractere.test(str)) {
          setIsValidLastName(false);
          setLastName(str);
          setFormIsValid(false);
          setErrMsg("Invalid last name");
        } else {
          setIsValidLastName(true);
          setLastName(str);
          setFormIsValid(true);
          setErrMsg("");
        }
        break;
      case "EMAIL":
        if (!isEmailValid.test(str)) {
          setIsValidEmail(false);
          setEmail(str);
          setFormIsValid(false);
          setErrMsg("Invalid Email");
        } else {
          setIsValidEmail(true);
          setEmail(str);
          setFormIsValid(true);
          setErrMsg("");
        }
        break;
      case "PWD":
        if (
          !containNumber.test(str) ||
          !containSpecialCaractere.test(str) ||
          str.length < 8
        ) {
          setIsValidPwd(false);
          setPassword(str);
          setFormIsValid(false);
          setErrMsg("Invalid Password");
        } else {
          setIsValidPwd(true);
          setPassword(str);
          setFormIsValid(true);
          setErrMsg("");
        }
        break;
      case "CPWD":
        if (
          !containNumber.test(str) ||
          !containSpecialCaractere.test(str) ||
          password !== str ||
          str.length < 8
        ) {
          setIsValidCPwd(false);
          setConfirmPassword(str);
          setFormIsValid(false);
          setErrMsg("Invalid Password");
        } else {
          setIsValidCPwd(true);
          setConfirmPassword(str);
          setFormIsValid(true);
          setErrMsg("");
        }
        break;
      default:
        break;
    }
  }

  async function handleFormSubmition() {
    setIsLoading(true);
    const response = await signUpAPI(
      username,
      firstName,
      lastName,
      email,
      password,
      confirmPassword
    );

    setIsLoading(false);
    if (response.error) {
      setErr(true);
      Toast.show(response.data.message, {
        duration: Toast.durations.LONG,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        containerStyle: {
          height: 60,
          justifyContent: "center",
        },
      });
    } else {
      navigation.goBack();
    }
  }

  const handleCheckBox = () => {
    setChecked((prev) => {
      setFormIsValid(!prev);
      return !prev;
    });
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
            <Pressable className="self-center h-1 bg-gray-300 w-16 my-4 rounded-xl"></Pressable>
          )}

          <ScrollView showsVerticalScrollIndicator={false}>
            <Text
              style={{ fontFamily: FONTS.JosefinSansBold }}
              className="text-5xl mb-4"
            >
              Lets Register Your Account
            </Text>
            <View className="gap-1">
              <TextInput
                onChangeText={(text) => handleInputChange("USERNAME", text)}
                outlineColor={username && !isValidUsername ? "red" : "#6fbfbf"}
                activeOutlineColor={
                  username && !isValidUsername ? "red" : "#393e59"
                }
                mode="outlined"
                label="Username"
                value={username}
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
                onChangeText={(text) => handleInputChange("FIRSTNAME", text)}
                outlineColor={
                  firstName && !isValidFirstName ? "red" : "#6fbfbf"
                }
                activeOutlineColor={
                  firstName && !isValidFirstName ? "red" : "#393e59"
                }
                mode="outlined"
                label="First Name"
                value={firstName}
                placeholder="First Name"
              />
              {firstName && !isValidFirstName && (
                <Text
                  style={{ fontFamily: FONTS.JosefinSansBold }}
                  className="text-red-400"
                >
                  {errMsg}
                </Text>
              )}
              <TextInput
                onChangeText={(text) => handleInputChange("LASTNAME", text)}
                outlineColor={lastName && !isValidLastName ? "red" : "#6fbfbf"}
                activeOutlineColor={
                  lastName && !isValidLastName ? "red" : "#393e59"
                }
                value={lastName}
                mode="outlined"
                label="Last Name"
                placeholder="Last Name"
              />
              {lastName && !isValidLastName && (
                <Text
                  style={{ fontFamily: FONTS.JosefinSansBold }}
                  className="text-red-400"
                >
                  {errMsg}
                </Text>
              )}
              <TextInput
                onChangeText={(text) => handleInputChange("EMAIL", text)}
                outlineColor={email && !isValidEmail ? "red" : "#6fbfbf"}
                activeOutlineColor={email && !isValidEmail ? "red" : "#393e59"}
                value={email}
                mode="outlined"
                label="Email"
                keyboardType="email-address"
                placeholder="example@gmail.com"
              />
              <TextInput
                onChangeText={(text) => handleInputChange("PWD", text)}
                outlineColor={password && !isValidPwd ? "red" : "#6fbfbf"}
                activeOutlineColor={password && !isValidPwd ? "red" : "#393e59"}
                value={password}
                placeholder="Password"
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
              <TextInput
                onChangeText={(text) => handleInputChange("CPWD", text)}
                outlineColor={
                  confirmPassword && !isValidCPwd ? "red" : "#6fbfbf"
                }
                activeOutlineColor={
                  confirmPassword && !isValidCPwd ? "red" : "#393e59"
                }
                value={confirmPassword}
                placeholder="Password Cofirmation"
                mode="outlined"
                label="Password Cofirmation"
                secureTextEntry={true}
              />
              {confirmPassword && !isValidCPwd && (
                <Text
                  style={{ fontFamily: FONTS.JosefinSansBold }}
                  className="text-red-400"
                >
                  {errMsg}
                </Text>
              )}
            </View>
            <Pressable
              disabled={!formIsValid || !checked}
              className={`my-5 py-4 rounded-md ${
                formIsValid && checked
                  ? "bg-darkBlue"
                  : "bg-greyBlue opacity-70"
              }`}
              onPress={handleFormSubmition}
            >
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
