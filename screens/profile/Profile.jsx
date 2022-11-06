import { useIsFocused } from "@react-navigation/native";
import React, { useEffect } from "react";
import { useState } from "react";
import { Text, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import { ScrollView } from "react-native-gesture-handler";
import { TextInput } from "react-native-paper";
import { useSelector } from "react-redux";
import Loading from "../../components/Loading";
import ProfileData from "../../components/ProfileData";
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
    if (!isFocused) return;
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
      <ProfileData data={data} userData={userProfileSubscription} />
      <Subscription sub={userProfileSubscription} />
    </ScrollView>
  );
}

export default Profile;
