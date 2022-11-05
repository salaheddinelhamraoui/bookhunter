import { View, Text, TextInput, TouchableOpacity, Image } from "react-native";
import { FONTS, SIZES, assets } from "../../constants";
import { Dropdown } from "react-native-element-dropdown";
import { useState } from "react";
import {
  deleteTriggerById,
  updateTriggerById,
} from "../../utils/Triggers.service";

const data = [
  { label: "Skip", value: "skip" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
];

const data2 = [
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "10", value: "10" },
  { label: "Highest", value: "highest" },
];

const data3 = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

const data4 = [
  { label: "Yes", value: "yes" },
  { label: "No", value: "no" },
];

const TriggerCard = ({ trigger, refresh }) => {
  const [triggerData, setTriggerData] = useState({ ...trigger });

  const updateTrigger = (triggerId) => {
    updateTriggerById(triggerId, triggerData)
      .then((res) => console.log(res.data))
      .catch((err) => console.log(JSON.stringify(err)));
  };

  const deleteTrigger = () => {
    deleteTriggerById(triggerData?._id)
      .catch((err) => console.log(JSON.stringify(err)))
      .finally(() => refresh());
  };

  return (
    <View className="flex flex-col bg-white mx-4 my-4 rounded-lg px-4 py-4">
      <TouchableOpacity
        className="absolute top-[-10] right-[-10] bg-red-500 w-[25px] h-[25px] rounded-full"
        onPress={deleteTrigger}
      >
        <Image
          source={assets.close}
          style={{ width: 10, height: 10 }}
          className="m-auto"
        />
      </TouchableOpacity>
      <>
        <View className="flex flex-row items-center mt-2">
          <Text
            className="w-[70%]"
            style={{
              fontFamily: FONTS.textRegular,
              fontSize: SIZES.extraMedium,
            }}
          >
            Min Huntscore
          </Text>
          <TextInput
            onBlur={() => {
              updateTrigger(triggerData._id);
            }}
            onChangeText={(text) => {
              setTriggerData((prev) => {
                return { ...prev, minTracker: text };
              });
            }}
            outlineColor={"#6fbfbf"}
            activeOutlineColor={"#393e59"}
            mode="outlined"
            label="TRIGGER"
            placeholder="TRIGGER"
            value={triggerData?.minTracker}
            className="border-[0.2px] rounded-lg px-1 py-1 w-[30%] text-center"
          />
        </View>
        <View className="flex flex-row items-center mt-2">
          <Text
            className="w-[70%]"
            style={{
              fontFamily: FONTS.textRegular,
              fontSize: SIZES.extraMedium,
            }}
          >
            Max Huntscore
          </Text>
          <TextInput
            onBlur={() => {
              updateTrigger(triggerData._id);
            }}
            onChangeText={(text) => {
              setTriggerData((prev) => {
                return { ...prev, maxTracker: text };
              });
            }}
            outlineColor={"#6fbfbf"}
            activeOutlineColor={"#393e59"}
            mode="outlined"
            label="TRIGGER"
            placeholder="TRIGGER"
            value={triggerData?.maxTracker}
            className="border-[0.2px] rounded-lg px-1 py-1 w-[30%] text-center"
          />
        </View>
        <View className="flex flex-row items-center mt-2">
          <Text
            className="w-[70%]"
            style={{
              fontFamily: FONTS.textRegular,
              fontSize: SIZES.extraMedium,
            }}
          >
            Min Rank
          </Text>
          <TextInput
            onBlur={() => {
              updateTrigger(triggerData._id);
            }}
            onChangeText={(text) => {
              setTriggerData((prev) => {
                return {
                  ...prev,
                  minRank: text,
                };
              });
            }}
            outlineColor={"#6fbfbf"}
            activeOutlineColor={"#393e59"}
            mode="outlined"
            label="TRIGGER"
            placeholder="TRIGGER"
            value={triggerData?.minRank}
            className="border-[0.2px] rounded-lg px-1 py-1 w-[30%] text-center"
          />
        </View>
        <View className="flex flex-row items-center mt-2">
          <Text
            className="w-[70%]"
            style={{
              fontFamily: FONTS.textRegular,
              fontSize: SIZES.extraMedium,
            }}
          >
            Max Rank
          </Text>
          <TextInput
            onChangeText={(text) => {
              setTriggerData((prev) => {
                return {
                  ...prev,
                  maxRank: text,
                };
              });
            }}
            outlineColor={"#6fbfbf"}
            activeOutlineColor={"#393e59"}
            mode="outlined"
            label="TRIGGER"
            placeholder="TRIGGER"
            value={triggerData?.maxRank}
            className="border-[0.2px] rounded-lg px-1 py-1 w-[30%] text-center"
          />
        </View>
      </>

      <>
        <View className="flex flex-row items-center mt-2">
          <Text
            className="w-[70%]"
            style={{
              fontFamily: FONTS.textRegular,
              fontSize: SIZES.extraMedium,
            }}
          >
            Fba Slot
          </Text>
          <Dropdown
            onBlur={() => {
              updateTrigger(triggerData._id);
            }}
            data={data}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={triggerData?.FBASlot}
            searchPlaceholder="Search..."
            value={triggerData?.FBASlot}
            onChange={(item) => {
              setTriggerData((prev) => {
                return { ...prev, FBASlot: item.value };
              });
            }}
            className="border-[0.2px] rounded-lg px-2 py-1 w-[30%]"
          />
        </View>
        <View className="flex flex-row items-center mt-2">
          <Text
            className="w-[70%]"
            style={{
              fontFamily: FONTS.textRegular,
              fontSize: SIZES.extraMedium,
            }}
          >
            Used Slot
          </Text>
          <Dropdown
            onBlur={() => {
              updateTrigger(triggerData._id);
            }}
            data={data2}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={triggerData?.usedSlot}
            searchPlaceholder="Search..."
            value={triggerData?.usedSlot}
            onChange={(item) => {
              setTriggerData((prev) => {
                return { ...prev, usedSlot: item.value };
              });
            }}
            className="border-[0.2px] rounded-lg px-2 py-1 w-[30%]"
          />
        </View>
        <View className="flex flex-row items-center mt-2">
          <Text
            className="w-[70%]"
            style={{
              fontFamily: FONTS.textRegular,
              fontSize: SIZES.extraMedium,
            }}
          >
            Bb Compare
          </Text>
          <Dropdown
            onBlur={() => {
              updateTrigger(triggerData._id);
            }}
            data={data3}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={triggerData?.BBCompare}
            searchPlaceholder="Search..."
            value={triggerData?.BBCompare}
            onChange={(item) => {
              setTriggerData((prev) => {
                return { ...prev, BBCompare: item.value };
              });
            }}
            className="border-[0.2px] rounded-lg px-2 py-1 w-[30%]"
          />
        </View>
      </>

      <>
        <View className="flex flex-row items-center mt-2">
          <Text
            className="w-[70%]"
            style={{
              fontFamily: FONTS.textRegular,
              fontSize: SIZES.extraMedium,
            }}
          >
            % Off Amazon
          </Text>
          <TextInput
            onBlur={() => {
              updateTrigger(triggerData._id);
            }}
            onChangeText={(text) => {
              setTriggerData((prev) => {
                return {
                  ...prev,
                  offAmazon: text,
                };
              });
            }}
            outlineColor={"#6fbfbf"}
            activeOutlineColor={"#393e59"}
            mode="outlined"
            label="TRIGGER"
            placeholder="TRIGGER"
            value={triggerData?.offAmazon}
            className="border-[0.2px] rounded-lg px-1 py-1 w-[30%] text-center"
          />
        </View>
        <View className="flex flex-row items-center mt-2">
          <Text
            className="w-[70%]"
            style={{
              fontFamily: FONTS.textRegular,
              fontSize: SIZES.extraMedium,
            }}
          >
            Target Profit
          </Text>
          <TextInput
            onBlur={() => {
              updateTrigger(triggerData._id);
            }}
            onChangeText={(text) => {
              setTriggerData((prev) => {
                return {
                  ...prev,
                  targetProfit: text,
                };
              });
            }}
            outlineColor={"#6fbfbf"}
            activeOutlineColor={"#393e59"}
            mode="outlined"
            label="TRIGGER"
            placeholder="TRIGGER"
            value={triggerData?.targetProfit}
            className="border-[0.2px] rounded-lg px-1 py-1 w-[30%] text-center"
          />
        </View>
        <View className="flex flex-row items-center mt-2">
          <Text
            className="w-[70%]"
            style={{
              fontFamily: FONTS.textRegular,
              fontSize: SIZES.extraMedium,
            }}
          >
            Always Reject
          </Text>
          <Dropdown
            data={data4}
            search
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={triggerData?.alwaysReject}
            searchPlaceholder="Search..."
            value={triggerData?.alwaysReject}
            onChange={(item) => {
              setTriggerData((prev) => {
                return {
                  ...prev,
                  alwaysReject: item.value,
                };
              });
            }}
            onBlur={() => {
              updateTrigger(triggerData._id);
            }}
            className="border-[0.2px] rounded-lg px-2 py-1 w-[30%]"
          />
        </View>
      </>
    </View>
  );
};

export default TriggerCard;
