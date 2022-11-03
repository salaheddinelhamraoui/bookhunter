import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { FONTS, SIZES } from "../../constants";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";
import TriggerCard from "./TriggerCard";

const data = [
  { label: "FBA", value: "fba" },
  { label: "MF", value: "mf" },
];

const data_2 = [
  { label: "Min/Max", value: "minmax" },
  { label: "Ave", value: "ave" },
];

const EditTrigger = ({ navigation, route }) => {
  const { FBACostPerLBS, _id, buyCost, description, fulfillement } =
    route.params.triggerSet;

  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const [title, setTitle] = useState(description);
  const [buyC, setBuyCost] = useState(buyCost);
  const [fbaCostPerLBS, setFBACostPerLBS] = useState(FBACostPerLBS);
  const [fulFillement, setFulfillement] = useState(fulfillement);

  const [value2, setValue2] = useState(null);
  const [isFocus2, setIsFocus2] = useState(false);

  return (
    <SafeAreaView>
      <ScrollView>
        <View className="mx-4 my-4 mb-0 bg-white px-4 py-4 rounded-lg">
          <Text
            className="text-center"
            style={{
              fontFamily: FONTS.JosefinSansBold,
              fontSize: SIZES.extraMedium,
            }}
          >
            Trigger Title
          </Text>
        </View>
        <View className="flex items-center justify-center mx-4 ">
          <TouchableOpacity className="w-full ">
            <View className="mt-4 bg-red-500  rounded-lg px-4 py-4">
              <Text
                className="text-center"
                style={{
                  fontFamily: FONTS.JosefinSansBold,
                  fontSize: SIZES.medium,
                  color: "white",
                }}
              >
                Remove Trigger Set
              </Text>
            </View>
          </TouchableOpacity>
        </View>
        <View className="flex flex-col bg-white mx-4 my-4 rounded-lg px-4 py-4">
          <View>
            <Text
              className="mb-2"
              style={{
                fontFamily: FONTS.textRegular,
              }}
            >
              Title
            </Text>
            <TextInput
              onChangeText={(text) => {}}
              outlineColor={"#6fbfbf"}
              activeOutlineColor={"#393e59"}
              mode="outlined"
              label="Title"
              value={title}
              placeholder="Title"
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
              Fulfilment
            </Text>
            <Dropdown
              data={data}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={fulFillement ? fulFillement : "..."}
              searchPlaceholder="Search..."
              value={fulFillement}
              onFocus={() => setIsFocus(true)}
              onBlur={() => setIsFocus(false)}
              onChange={(item) => {
                setFulfillement(item.value);
                setIsFocus(false);
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
              Sales Rank Type
            </Text>
            <Dropdown
              data={data_2}
              search
              maxHeight={300}
              labelField="label"
              valueField="value"
              placeholder={!isFocus2 ? "Select item" : "..."}
              searchPlaceholder="Search..."
              value={value2}
              onFocus={() => setIsFocus2(true)}
              onBlur={() => setIsFocus2(false)}
              onChange={(item) => {
                setValue2(item.value);
                setIsFocus2(false);
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
              Buy Cost
            </Text>
            <TextInput
              onChangeText={(text) => {}}
              outlineColor={"#6fbfbf"}
              activeOutlineColor={"#393e59"}
              mode="outlined"
              label="Buy Cost"
              placeholder="Buy Cost"
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
              Mf Fixed Cost
            </Text>
            <TextInput
              onChangeText={(text) => {}}
              outlineColor={"#6fbfbf"}
              activeOutlineColor={"#393e59"}
              mode="outlined"
              label="Mf Fixed Cost"
              placeholder="Mf Fixed Cost"
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
              Mf Cost Per Lb
            </Text>
            <TextInput
              onChangeText={(text) => {}}
              outlineColor={"#6fbfbf"}
              activeOutlineColor={"#393e59"}
              mode="outlined"
              label="Mf Cost Per Lb"
              placeholder="Mf Cost Per Lb"
              className="border-[0.2px] rounded-lg px-2 py-2"
            />
          </View>
          <View className="flex items-center justify-center">
            <TouchableOpacity className="w-[250px]">
              <View className="mt-4 bg-[#6fbfbf]  rounded-lg px-4 py-2">
                <Text
                  className="text-center"
                  style={{
                    fontFamily: FONTS.JosefinSansBold,
                    fontSize: SIZES.medium,
                    color: "white",
                  }}
                >
                  Save Trigger Set
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <TriggerCard />
        <TriggerCard />
        <View className="flex items-center justify-center mx-4 ">
          <TouchableOpacity className="w-full ">
            <View className="mb-4 bg-[#6fbfbf] rounded-lg px-4 py-4">
              <Text
                className="text-center"
                style={{
                  fontFamily: FONTS.JosefinSansBold,
                  fontSize: SIZES.medium,
                  color: "white",
                }}
              >
                Add New Trigger
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditTrigger;

// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: 'white',
//         padding: 16,
//     },
//     dropdown: {
//         height: 50,
//         borderColor: 'gray',
//         borderWidth: 0.5,
//         borderRadius: 8,
//         paddingHorizontal: 8,
//     },
//     icon: {
//         marginRight: 5,
//     },
//     label: {
//         position: 'absolute',
//         backgroundColor: 'white',
//         left: 22,
//         top: 8,
//         zIndex: 999,
//         paddingHorizontal: 8,
//         fontSize: 14,
//     },
//     placeholderStyle: {
//         fontSize: 16,
//     },
//     selectedTextStyle: {
//         fontSize: 16,
//     },
//     iconStyle: {
//         width: 20,
//         height: 20,
//     },
//     inputSearchStyle: {
//         height: 40,
//         fontSize: 16,
//     },
// });
