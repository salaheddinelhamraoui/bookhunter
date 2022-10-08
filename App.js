import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useFonts } from "expo-font";
import ISBN from "./screens/ISBN/ISBN";
import NavBar from "./shared/components/NavBar";
import { Text } from "react-native";
import TEST from "./screens/ISBN/TEST";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#F2F2F2",
  },
};
const Drawer = createDrawerNavigator();

export default function App() {
  const [loaded] = useFonts({
    GoldleafBoldPersonalUseBold: require("./assets/fonts/GoldleafBoldPersonalUseBold-eZ4dO.ttf"),
  });

  if (!loaded) return null;

  return (
    <>
      <NavigationContainer theme={theme}>
        <NavBar />
        <Drawer.Navigator
          useLegacyImplementation={true}
          initialRouteName="ISBN"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Drawer.Screen name="ISBN" component={ISBN} />
          <Drawer.Screen name="TEST" component={TEST} />
        </Drawer.Navigator>
        {/* <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="ISBN"
        >
          <Stack.Screen name="ISBN" component={ISBN} />
        </Stack.Navigator> */}
      </NavigationContainer>
    </>
  );
}
