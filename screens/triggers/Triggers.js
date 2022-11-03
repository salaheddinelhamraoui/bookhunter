import { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  Image,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import { FONTS, SIZES } from "../../constants";
import { getTriggersSet } from "../../utils/Triggers.service";
import TriggerSetCard from "./TriggerSetCard";

const Triggers = ({ navigation }) => {
  const user = useSelector((state) => state.userSlice.data);
  const id = user.id;

  const [triggersSet, setTriggersSet] = useState([]);

  useEffect(() => {
    getTriggersSet(id).then((res) => setTriggersSet(res.data));
  }, [id]);
  return (
    <SafeAreaView>
      <ScrollView>
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
            Triggers help with calculating what is profitable. Use our default
            buying criteria or create your own.
          </Text>
        </View>
        <View className="flex flex-row flex-wrap mx-4 my-2 mt-4 items-center justify-between">
          {triggersSet.length > 0
            ? triggersSet.map((triggerSet, i) => (
                <TriggerSetCard
                  key={"trrigerId:" + i}
                  navigation={navigation}
                  triggerSet={triggerSet}
                />
              ))
            : null}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Triggers;
