import React from "react";
import { Pressable, Text, View } from "react-native";

function Subscription({ sub }) {
  const { data } = sub;
  return (
    <View className="bg-white p-6 rounded-md shadow-md shadow-gray-300 m-4">
      {data && data?.length > 0 ? (
        <>
          <Text>You don't have any subscription</Text>
        </>
      ) : null}
    </View>
  );
}

export default Subscription;
