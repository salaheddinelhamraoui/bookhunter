import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { FONTS, SIZES } from "../../constants";
import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";
import { addMember } from "../../utils/Team.service";
import { useSelector } from "react-redux";
import { getQuantity, getUserData } from "../../utils/Profile.service";
import { useNavigation } from "@react-navigation/native";
import Loading from "../../components/Loading";
import Toast from "react-native-root-toast";

const data = [
  { label: "Hidden Mode", value: "hm" },
  { label: "Full Mode", value: "fm" },
];

const data_2 = [
  { label: "Database", value: "db" },
  { label: "Database + Live", value: "dbl" },
];

const EditMember = ({ route }) => {
  const oldMember = route.params?.member;
  const navigation = useNavigation();
  const user = useSelector((state) => state.userSlice.data);

  const [isLoading, setIsLoading] = useState(false);
  const [member, setMember] = useState(oldMember);

  // const addNewMember = async () => {
  //   setIsLoading(true);
  //   try {
  //     const data = await setSubId();
  //     const userData = await getCounter();
  //     await setMember((prev) => {
  //       return {
  //         ...prev,
  //         subID: data?.id,
  //         counter: userData?.counter,
  //       };
  //     });
  //     const { message } = await addMember(user.id, member);
  //     Toast.show(message);
  //     navigation.navigate("TEAMS");
  //   } catch (error) {
  //     Toast.show("Invalid fields, Please try again!");
  //   } finally {
  //     setIsLoading(false);
  //     setMember({
  //       firstName: "",
  //       lastName: "",
  //       username: "",
  //       email: "",
  //       role: "...",
  //       type: "...",
  //       counter: 0,
  //       subID: "",
  //     });
  //   }
  // };

  const setSubId = async () => {
    try {
      return await getQuantity(user.id);
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  const getCounter = async () => {
    try {
      return await getUserData(user.id);
    } catch (error) {
      console.log(JSON.stringify(error));
    }
  };

  return (
    <SafeAreaView>
      {isLoading ? <Loading /> : null}
      <ScrollView>
        <View className="mx-4 my-4 mb-0 bg-white px-4 py-4 rounded-lg">
          <Text
            className="text-center"
            style={{
              fontFamily: FONTS.JosefinSansBold,
              fontSize: SIZES.medium,
            }}
          >
            Edit Member
          </Text>
        </View>
        <View className="flex flex-col bg-white mx-4 my-4 rounded-lg px-4 py-4">
          <View>
            <Text
              className="mb-2"
              style={{
                fontFamily: FONTS.textRegular,
              }}
            >
              First Name
            </Text>
            <TextInput
              onChangeText={(text) => {
                setMember((prev) => {
                  return { ...prev, firstName: text };
                });
              }}
              outlineColor={"#6fbfbf"}
              activeOutlineColor={"#393e59"}
              mode="outlined"
              label="First Name"
              placeholder="First Name"
              value={member.firstName}
              className="border-[0.2px] rounded-lg px-2 py-2"
            />
          </View>

          <View className="mt-4">
            <Text
              className="mb-2"
              style={{
                fontFamily: FONTS.textRegular,
              }}
            >
              Last Name
            </Text>
            <TextInput
              onChangeText={(text) => {
                setMember((prev) => {
                  return { ...prev, lastName: text };
                });
              }}
              outlineColor={"#6fbfbf"}
              activeOutlineColor={"#393e59"}
              mode="outlined"
              label="Last Name"
              placeholder="Last Name"
              value={member.lastName}
              className="border-[0.2px] rounded-lg px-2 py-2"
            />
          </View>
          <View className="mt-4">
            <Text
              className="mb-2"
              style={{
                fontFamily: FONTS.textRegular,
              }}
            >
              Username
            </Text>
            <TextInput
              editable={false}
              outlineColor={"#6fbfbf"}
              activeOutlineColor={"#393e59"}
              mode="outlined"
              label="Username"
              placeholder="Username"
              value={member.username}
              className="border-[0.2px] rounded-lg px-2 py-2 bg-gray-100"
            />
          </View>
          <View className="mt-4">
            <Text
              className="mb-2"
              style={{
                fontFamily: FONTS.textRegular,
              }}
            >
              Email
            </Text>
            <TextInput
              onChangeText={(text) => {
                setMember((prev) => {
                  return { ...prev, email: text };
                });
              }}
              outlineColor={"#6fbfbf"}
              activeOutlineColor={"#393e59"}
              mode="outlined"
              label="Email"
              placeholder="Email"
              value={member.email}
              className="border-[0.2px] rounded-lg px-2 py-2"
            />
          </View>
          <View className="mt-4">
            <Text
              className="mb-2"
              style={{
                fontFamily: FONTS.textRegular,
              }}
            >
              Mode
            </Text>
            <Dropdown
              data={data}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={member.role}
              onChange={(item) => {
                setMember((prev) => {
                  return { ...prev, role: item.label };
                });
              }}
              className="border-[0.2px] rounded-lg px-2 py-2"
            />
          </View>
          <View className="mt-4">
            <Text
              className="mb-2"
              style={{
                fontFamily: FONTS.textRegular,
              }}
            >
              Type
            </Text>
            <Dropdown
              data={data_2}
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={member.type}
              onChange={(item) => {
                setMember((prev) => {
                  return { ...prev, type: item.label };
                });
              }}
              className="border-[0.2px] rounded-lg px-2 py-2"
            />
          </View>
          <View className="flex items-center justify-center">
            <TouchableOpacity
              className="w-[200px]"
              // onPress={addNewMember}
            >
              <View className="mt-4 bg-[#6fbfbf]  rounded-lg px-4 py-3">
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
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditMember;
