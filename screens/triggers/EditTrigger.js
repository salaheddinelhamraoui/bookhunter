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
import {
  deleteTriggerSet,
  updateTriggerSet,
} from "../../utils/Triggers.service";
import Toast from "react-native-root-toast";
import { ActivityIndicator } from "react-native-paper";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

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
  const { userId } = route.params;

  const isFocused = useIsFocused;

  const [isLoading, setIsLoading] = useState(false);

  const [title, setTitle] = useState(description);
  const [buyC, setBuyCost] = useState(buyCost);
  const [fbaCostPerLBS, setFBACostPerLBS] = useState(FBACostPerLBS);
  const [fulFillement, setFulfillement] = useState(() => {
    return fulfillement ? fulfillement : data[0].value;
  });
  const [salesRankType, setSalesRankType] = useState(data_2[0].label);
  const [MFFixed, setMFFixedCost] = useState();
  const [MFCostPerLBS, setMFCostPerLB] = useState();

  useEffect(() => {}, [isFocused]);

  const deleteSet = () => {
    setIsLoading(true);
    deleteTriggerSet(_id)
      .then(() => {
        setIsLoading(false);
        navigation.navigate("TRIGGERS");
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
        setIsLoading(false);
      })
      .finally(() => Toast.show("Triggers set had been deleted"));
  };

  // TODO: Update Triggers Set need to know the attributes that comes with before continue working on it

  const updateSet = () => {
    const triggerSetData = {
      description: title,
      fulfillement: fulFillement.toUpperCase(),
      buyCost: buyC,
      FBACostPerLBS: fbaCostPerLBS,
      MFFixed,
      MFCostPerLBS,
      salesRankType,
      TriggerId: _id,
    };

    setIsLoading(true);
    updateTriggerSet(userId, triggerSetData)
      .then(() => {
        setIsLoading(false);
        navigation.navigate("TRIGGERS");
      })
      .catch((err) => {
        console.log(JSON.stringify(err));
        setIsLoading(false);
      })
      .finally(() => Toast.show("Triggers set had been updated"));
  };

  return (
    <SafeAreaView>
      {isLoading ? (
        <>
          <View className="flex-1 absolute h-full w-full z-[999] bg-slate-600 opacity-10"></View>
          <ActivityIndicator className=" flex-1 absolute top-1/2 right-1/2 z-50" />
        </>
      ) : null}
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
          <TouchableOpacity className="w-full" onPress={deleteSet}>
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
              onChangeText={(text) => {
                setTitle(text);
              }}
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
              onChange={(item) => {
                setFulfillement(item.value);
                setFBACostPerLBS(null);
                setMFCostPerLB(null);
                setMFFixedCost(null);
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
              placeholder={!salesRankType ? "Select item" : salesRankType}
              searchPlaceholder="Search..."
              value={salesRankType}
              onChange={(item) => {
                setSalesRankType(item.value);
                setFBACostPerLBS(null);
                setMFCostPerLB(null);
                setMFFixedCost(null);
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
              onChangeText={(text) => {
                setBuyCost(text);
              }}
              value={buyC}
              outlineColor={"#6fbfbf"}
              activeOutlineColor={"#393e59"}
              mode="outlined"
              label="Buy Cost"
              placeholder="Buy Cost"
              className="border-[0.2px] rounded-lg px-2 py-2"
            />
          </View>
          {fulFillement.toUpperCase() === "MF" ? (
            <>
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
                  onChangeText={(text) => setMFFixedCost(text)}
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
                  onChangeText={(text) => setMFCostPerLB(text)}
                  outlineColor={"#6fbfbf"}
                  activeOutlineColor={"#393e59"}
                  mode="outlined"
                  label="Mf Cost Per Lb"
                  placeholder="Mf Cost Per Lb"
                  className="border-[0.2px] rounded-lg px-2 py-2"
                />
              </View>
            </>
          ) : null}

          {fulFillement.toUpperCase() === "FBA" ? (
            <>
              <View className="mt-4">
                <Text
                  className="mb-2"
                  style={{
                    fontFamily: FONTS.textRegular,
                  }}
                >
                  FBA COST PER LB
                </Text>
                <TextInput
                  onChangeText={(text) => {
                    setFBACostPerLBS(text);
                  }}
                  value={fbaCostPerLBS}
                  outlineColor={"#6fbfbf"}
                  activeOutlineColor={"#393e59"}
                  mode="outlined"
                  label="FBA COST PER LB"
                  placeholder="FBA COST PER LB"
                  className="border-[0.2px] rounded-lg px-2 py-2"
                />
              </View>
            </>
          ) : null}

          <View className="flex items-center justify-center">
            <TouchableOpacity className="w-[250px]" onPress={updateSet}>
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
