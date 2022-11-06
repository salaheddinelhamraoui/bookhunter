import React, { useState } from "react";
import { useEffect } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { TextInput } from "react-native-paper";
import { FONTS, SIZES } from "../constants";

function ProfileData({ data, userData }) {
  const [newUserData, setNewUserData] = useState();

  useEffect(() => {
    setNewUserData({ ...userData.subscription, ...userData.user });
  }, [userData]);
  return (
    <View className="bg-white p-6 rounded-md shadow-md shadow-gray-300 m-4">
      <Text
        style={{ fontFamily: FONTS.JosefinSansBold }}
        className="text-2xl text-center"
      >
        Personal Information
      </Text>
      <View>
        <TextInput
          disabled
          onChangeText={(text) =>
            setNewUserData((prev) => {
              return {
                ...prev,
                firstName: text,
              };
            })
          }
          mode="outlined"
          label={"First Name"}
          className="bg-gray-200 my-2"
          value={newUserData?.firstName}
        />
      </View>
      <View>
        <TextInput
          disabled
          onChangeText={(text) =>
            setNewUserData((prev) => {
              return {
                ...prev,
                lastName: text,
              };
            })
          }
          mode="outlined"
          label={"Last Name"}
          className="bg-gray-200 my-2"
          value={newUserData?.lastName}
        />
      </View>
      <View>
        <TextInput
          disabled
          onChangeText={(text) =>
            setNewUserData((prev) => {
              return {
                ...prev,
                email: text,
              };
            })
          }
          mode="outlined"
          label={"Email"}
          className="bg-gray-200 my-2"
          value={newUserData?.email}
        />
      </View>
      <View>
        <Dropdown
          disabled
          data={data}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={"country"}
          searchPlaceholder="Search..."
          value={data[newUserData?.counter]?.value}
          onChange={(item) => {
            data[newUserData?.counter].value;
          }}
          className="border-[0.2px] rounded-md px-2 py-2 my-3 bg-gray-200"
        />
      </View>
      {/* <View>
        <TextInput
          disabled={true}
          onChangeText={(text) =>
            setNewUserData((prev) => {
              return {
                ...prev,
              };
            })
          }
          mode="outlined"
          label={"Old password"}
          className="bg-gray-200 my-2"
          secureTextEntry={true}
        />
      </View>
      <View>
        <TextInput
          disabled={true}
          onChangeText={(text) =>
            setNewUserData((prev) => {
              return {
                ...prev,
              };
            })
          }
          mode="outlined"
          label={"New password"}
          className="bg-gray-200 my-2"
          secureTextEntry={true}
        />
      </View> */}
      <TouchableOpacity className="w-full">
        <View className="mt-4 bg-[#6fbfbf]  rounded-lg px-4 py-2">
          <Text
            className="text-center"
            style={{
              fontFamily: FONTS.JosefinSansBold,
              fontSize: SIZES.medium,
              color: "white",
            }}
          >
            Save
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

export default ProfileData;
