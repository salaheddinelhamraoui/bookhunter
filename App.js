import "react-native-gesture-handler";
import "react-native-get-random-values";
import React from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import NavBar from "./components/NavBar";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import Home from "./screens/Home/Home";
import StackNavigation from "./screens/Welcome/StackNavigation";
import { createStackNavigator } from "@react-navigation/stack";

const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#F2F2F2",
  },
};

export default function App() {
  const [loaded] = useFonts({
    GoldleafBoldPersonalUseBold: require("./assets/fonts/GoldleafBoldPersonalUseBold-eZ4dO.ttf"),
    JosefinSans: require("./assets/fonts/JosefinSans-VariableFont_wght.ttf"),
    JosefinSansBold: require("./assets/fonts/JosefinSans-Bold.ttf"),
    RajdhaniMedium: require("./assets/fonts/Rajdhani-Medium.ttf"),
    RajdhaniRegular: require("./assets/fonts/Rajdhani-Regular.ttf"),
  });

  if (!loaded) return null;

  const Stack = createStackNavigator();

  return (
    <Provider store={store}>
      <NavigationContainer independent={true}>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="FIRST LAUNCH" component={StackNavigation} />
          <Stack.Screen name="HOME" component={Home} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
