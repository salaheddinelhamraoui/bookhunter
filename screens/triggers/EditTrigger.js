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
  addTrigger,
  deleteTriggerSet,
  getTriggers,
  getTriggerSet,
  updateTriggerSet,
} from "../../utils/Triggers.service";
import Toast from "react-native-root-toast";
import { ActivityIndicator } from "react-native-paper";
import { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";
import Loading from "../../components/Loading";

const data = [
  { label: "FBA", value: "fba" },
  { label: "MF", value: "mf" },
];

const data_2 = [
  { label: "Min/Max", value: "minmax" },
  { label: "Ave", value: "ave" },
];

const EditTrigger = ({ navigation, route }) => {
  const { triggerSet, userId } = route.params;
  const isFocused = useIsFocused();
  const [isLoading, setIsLoading] = useState(false);
  const [triggerSetData, setTriggerSetData] = useState();
  const [triggersData, setTriggersData] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    //! ******* Get TRIGGER SET*/
    getTriggerSetData();

    //! ******* Get TRIGGERS LIST*/
    getTriggersList();
  }, [isFocused]);

  //* DELETE TRIGGER SET
  const deleteSet = () => {
    setIsLoading(true);
    deleteTriggerSet(triggerSet._id)
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

  //* UPDATE TRIGGER SET
  const updateSet = () => {
    setIsLoading(true);
    updateTriggerSet(userId, {
      ...triggerSetData,
      TriggerId: triggerSet._id,
    })
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

  //* GET TRIGGER SET
  const getTriggerSetData = () => {
    getTriggerSet(triggerSet._id)
      .then((res) => res.data)
      .then((data) => {
        setTriggerSetData({ ...data });
        setIsLoading(false);
      })
      .catch((err) => console.log(JSON.stringify(err)));
  };

  //* GET TRRIGERS LIST
  const getTriggersList = () => {
    setIsLoading(true);
    getTriggers(triggerSet._id)
      .then((res) => {
        setTriggersData(res.data);
      })
      .catch((err) => console.log(JSON.stringify(err)))
      .finally(() => setIsLoading(false));
  };
  //*ADD NEW TRIGGER
  const addNewTrigger = () => {
    addTrigger(userId, triggerSet._id)
      .then((res) => Toast.show(res.data.message))
      .catch((err) => console.log(JSON.stringify(err)))
      .finally(() => getTriggersList());
  };



  return (
    <SafeAreaView>
      {isLoading ? <Loading /> : null}
      <ScrollView>
        {/* //* START TRIGGER SET */}

        <>
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
                  setTriggerSetData((prev) => {
                    return {
                      ...prev,
                      description: text,
                    };
                  });
                }}
                outlineColor={"#6fbfbf"}
                activeOutlineColor={"#393e59"}
                mode="outlined"
                label="Title"
                value={triggerSetData?.description || "BookHunter"}
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
                placeholder={
                  triggerSetData?.fulfillement
                    ? triggerSetData?.fulfillement
                    : "..."
                }
                searchPlaceholder="Search..."
                value={triggerSetData?.fulfillement || "MF"}
                onChange={(item) => {
                  setTriggerSetData((prev) => {
                    return {
                      ...prev,
                      fulfillement: item.value,
                      MFCostPerLBS: null,
                      MFFixed: null,
                      FBACostPerLBS: null,
                    };
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
                Sales Rank Type
              </Text>
              <Dropdown
                data={data_2}
                search
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={triggerSetData?.salesRankType || "Min/Max"}
                searchPlaceholder="Search..."
                value={triggerSetData?.salesRankType || data_2[0].label}
                onChange={(item) => {
                  setTriggerSetData((prev) => {
                    return {
                      ...prev,
                      salesRankType: item.value,
                      MFCostPerLBS: null,
                      MFFixed: null,
                      FBACostPerLBS: null,
                    };
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
                Buy Cost
              </Text>
              <TextInput
                onChangeText={(text) => {
                  setTriggerSetData((prev) => {
                    return {
                      ...prev,
                      buyCost: text,
                    };
                  });
                }}
                value={triggerSetData?.buyCost}
                outlineColor={"#6fbfbf"}
                activeOutlineColor={"#393e59"}
                mode="outlined"
                label="Buy Cost"
                placeholder="Buy Cost"
                className="border-[0.2px] rounded-lg px-2 py-2"
              />
            </View>
            {triggerSetData?.fulfillement &&
              triggerSetData?.fulfillement.toUpperCase() === "MF" ? (
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
                    onChangeText={(text) => {
                      setTriggerSetData((prev) => {
                        return {
                          ...prev,
                          MFFixed: text,
                        };
                      });
                    }}
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
                    onChangeText={(text) =>
                      setTriggerSetData((prev) => {
                        return {
                          ...prev,
                          MFCostPerLBS: text,
                        };
                      })
                    }
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

            {triggerSetData?.fulfillement &&
              triggerSetData?.fulfillement.toUpperCase() === "FBA" ? (
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
                      setTriggerSetData((prev) => {
                        return {
                          ...prev,
                          FBACostPerLBS: text,
                        };
                      });
                    }}
                    value={triggerSetData?.FBACostPerLBS}
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
        </>





        {triggersData.length > 0 &&
          triggersData.map((trigger, i) => (
            <TriggerCard
              refresh={getTriggersList}
              trigger={trigger}
              userId={userId}
              key={trigger._id || i}
            />
          ))}

        <View className="flex items-center justify-center mx-4 ">
          <TouchableOpacity className="w-full" onPress={addNewTrigger}>
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
