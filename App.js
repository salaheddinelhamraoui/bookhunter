import "react-native-gesture-handler";
import "react-native-get-random-values";
import React, { useEffect, useState } from "react";
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import Home from "./screens/Home/Home";
import StackNavigation from "./screens/Welcome/StackNavigation";
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";


const theme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#F2F2F2",
  },
};
const Stack = createStackNavigator();

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  console.log(user, isLoggedIn);

  const checkIfIsAlreadyLoggedIn = async () => {
    try {
      const dataString = await AsyncStorage.getItem("loginData");
      const jsonData = await JSON.parse(dataString);
      console.log(dataString);
      if (!jsonData?.data) {
        setUser(null);
        setIsLoggedIn(false);
        return;
      }
      setIsLoggedIn(true);
      setUser(jsonData?.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkIfIsAlreadyLoggedIn();
  }, []);

  const [loaded] = useFonts({
    GoldleafBoldPersonalUseBold: require("./assets/fonts/GoldleafBoldPersonalUseBold-eZ4dO.ttf"),
    JosefinSans: require("./assets/fonts/JosefinSans-VariableFont_wght.ttf"),
    JosefinSansBold: require("./assets/fonts/JosefinSans-Bold.ttf"),
    RajdhaniMedium: require("./assets/fonts/Rajdhani-Medium.ttf"),
    RajdhaniRegular: require("./assets/fonts/Rajdhani-Regular.ttf"),
  });

  if (!loaded) return null;

  return (
    <Provider store={store}>
      <NavigationContainer independent={true}>
        <Stack.Navigator
          screenOptions={{ headerShown: false }}
          initialRouteName={isLoggedIn ? "HOME" : "FIRST LAUNCH"}
        >
          <Stack.Screen name="FIRST LAUNCH" component={StackNavigation} />

          <Stack.Screen
            name={"HOME"}
            component={Home}
            initialParams={{ user }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
