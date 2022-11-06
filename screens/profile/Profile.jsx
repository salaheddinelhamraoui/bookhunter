import { useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useState } from "react";
import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";
import Subscription from "../../components/Subscription";
import { getSubscriptionData } from "../../utils/Profile.service";

const data = [
  { label: "United State", value: "United State" },
  { label: "Canada", value: "Canada" },
  { label: "Mexico", value: "Mexico" },
];

function Profile() {
  const user = useSelector((state) => state.userSlice.data);
  const isFocused = useIsFocused();
  const [userProfileSubscription, setUserProfileSubscription] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getSubscriptionData(user.id, user.stripe_customer_id)
      .then((res) => {
        setUserProfileSubscription(res);
        setIsLoading(false);
      })
      .catch((err) => console.log(JSON.stringify(err)));
    return () => console.log("not focused");
  }, [isFocused]);

  return (
    <ScrollView>
      {isLoading ? <Loading /> : null}
      <View className="bg-white p-6 rounded-md shadow-md shadow-gray-300 m-4">
        <View>
          <TextInput
            mode="outlined"
            label={"First Name"}
            className="bg-gray-200"
          />
        </View>
        <View>
          <TextInput
            mode="outlined"
            label={"Last Name"}
            className="bg-gray-200"
          />
        </View>
        <View>
          <TextInput mode="outlined" label={"Email"} className="bg-gray-200" />
        </View>
        <View>
          <Dropdown
            data={data}
            maxHeight={300}
            labelField="label"
            valueField="value"
            placeholder={"triggerData?.FBASlot"}
            searchPlaceholder="Search..."
            value={"triggerData?.FBASlot"}
            onChange={(item) => {}}
            className="border-[0.2px] rounded-md px-2 py-2 mt-2 bg-gray-200"
          />
        </View>
      </View>
      <Subscription sub={userProfileSubscription} />
    </ScrollView>
  );
}

export default Profile;
