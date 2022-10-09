import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ISBN from "./ISBN";
import ISBNResult from "./ISBNResult";

const Tab = createNativeStackNavigator();

function ISBNHome() {
  return (
    <Tab.Navigator
      initialRouteName="ISBN"
      screenOptions={{ headerShown: false }}
    >
      <Tab.Screen name="ISBN" component={ISBN} />
      <Tab.Screen name="ISBN RESULT" component={ISBNResult} />
    </Tab.Navigator>
  );
}

export default ISBNHome;
