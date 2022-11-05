import { useIsFocused } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View, Text, ScrollView, SafeAreaView } from "react-native";
import { ActivityIndicator, FAB } from "react-native-paper";
import { useSelector } from "react-redux";
import { FONTS, SIZES } from "../../constants";
import {
  addTriggersSet,
  getTriggersSet,
  updateTriggerSet,
} from "../../utils/Triggers.service";
import TriggerSetCard from "./TriggerSetCard";
import Toast from "react-native-root-toast";

const Triggers = ({ navigation }) => {
  const user = useSelector((state) => state.userSlice.data);
  const isFocused = useIsFocused();
  const id = user.id;

  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);
  const [triggersSet, setTriggersSet] = useState([]);

  useEffect(() => {
    setTriggersSet([]);
    setIsLoading(true);
    if (isFocused) {
      getTriggersSet(id)
        .then((res) => setTriggersSet(res.data))
        .finally(() => setIsLoading(false));
    }
  }, [id, isFocused]);

  const addNewTriggerSet = () => {
    setIsLoading2(true);
    addTriggersSet(id)
      .then((res) => Toast.show(res.data.message))
      .then(() => {
        getTriggersSet(id).then((res) => setTriggersSet(res.data));
      })
      .catch((err) => console.log(JSON.stringify(err)))
      .finally(() => setIsLoading2(false));
  };

  const inactiveTriggerSet = (triggerSetId) => {
    setIsLoading(true);
    triggersSet.map((triggerSet) => {
      if (triggerSet.active === "true" && triggerSet._id !== triggerSetId) {
        updateTriggerSet(id, {
          ...triggerSet,
          active: "false",
          TriggerId: triggerSet._id,
        });
      }
      if (triggerSet._id === triggerSetId) {
        updateTriggerSet(id, {
          ...triggerSet,
          active: "true",
          TriggerId: triggerSet._id,
        });
      }
    });
    getTriggersSet(id)
      .then((res) => setTriggersSet(res.data))
      .finally(() => setIsLoading(false));
  };

  return (
    <>
      {isLoading ? (
        <>
          <View className="flex-1 absolute h-full w-full z-[999] bg-slate-600 opacity-10"></View>
          <ActivityIndicator className=" flex-1 absolute top-1/2 right-1/2 z-50" />
        </>
      ) : null}
      <SafeAreaView>
        <ScrollView>
          {isFocused ? (
            <>
              <View className="mx-4 my-4 bg-white px-4 py-4 rounded-lg">
                <Text
                  className="text-center"
                  style={{
                    fontFamily: FONTS.JosefinSansBold,
                    fontSize: SIZES.extraMedium,
                  }}
                >
                  Triggers
                </Text>
              </View>
              <View className="mx-4 bg-white px-4 py-4 mb-2 rounded-lg">
                <Text
                  className="text-center px-1"
                  style={{
                    fontFamily: FONTS.textRegular,
                    fontSize: SIZES.font,
                  }}
                >
                  Triggers help with calculating what is profitable. Use our
                  default buying criteria or create your own.
                </Text>
              </View>
              <View className="flex flex-row flex-wrap mx-4 my-2 mt-4 items-center justify-between">
                {triggersSet.length > 0
                  ? triggersSet.map((triggerSet, i) => (
                      <TriggerSetCard
                        inactiveTriggerSet={inactiveTriggerSet}
                        key={"trrigerId:" + i}
                        navigation={navigation}
                        triggerSet={triggerSet}
                        userId={user.id}
                      />
                    ))
                  : null}
              </View>
            </>
          ) : null}
        </ScrollView>
      </SafeAreaView>

      <FAB
        icon="plus"
        className="absolute bottom-3 right-3 bg-lightTeal"
        onPress={addNewTriggerSet}
      />
    </>
  );
};

export default Triggers;
