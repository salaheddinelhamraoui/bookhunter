import React from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { useFonts } from "expo-font";
import ISBN from "./screens/ISBN/ISBN";
import NavBar from "./shared/components/NavBar";
import { Text, Image } from "react-native";
import { store } from "./redux/store";
import { Provider } from "react-redux";
import { assets, FONTS, SIZES } from "./constants";
import Contact from "./screens/contact/Contact";
import PrivacyPolicy from "./screens/privacyPolicy/PrivacyPolicy";
import Faq from "./screens/faq/Faq";
import TermsOfUse from "./screens/termsOfUse/TermsOfUse";

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
    JosefinSans: require("./assets/fonts/JosefinSans-VariableFont_wght.ttf"),
    JosefinSansBold: require("./assets/fonts/JosefinSans-Bold.ttf"),
    RajdhaniMedium: require("./assets/fonts/Rajdhani-Medium.ttf"),
    RajdhaniRegular: require("./assets/fonts/Rajdhani-Regular.ttf"),
  });

  if (!loaded) return null;

  return (
    <Provider store={store}>
      <NavigationContainer theme={theme}>
        <NavBar />
        <Drawer.Navigator
          useLegacyImplementation={true}
          initialRouteName="ISBN"
          screenOptions={{
            headerShown: false,
          }}
        >
          <Drawer.Screen
            name="ISBN SCANNER"
            component={ISBN}
            options={{
              drawerIcon: () => (
                <Image
                  source={assets.ISBN}
                  resizeMode="contain"
                  className="w-[25px] h-[25px]"
                />
              ),

              drawerLabelStyle: {
                fontFamily: FONTS.JosefinSansBold,
                fontSize: SIZES.medium,
              },
            }}
          />
          <Drawer.Screen
            name="FAQs"
            component={Faq}
            options={{
              drawerIcon: () => (
                <Image
                  source={assets.faq}
                  resizeMode="contain"
                  className="w-[25px] h-[25px]"
                />
              ),
              drawerLabelStyle: {
                fontFamily: FONTS.JosefinSansBold,
                fontSize: SIZES.medium,
              },
            }}
          />
          <Drawer.Screen
            name="CONTACT"
            component={Contact}
            options={{
              drawerIcon: () => (
                <Image
                  source={assets.contact}
                  resizeMode="contain"
                  className="w-[25px] h-[25px]"
                />
              ),
              drawerLabelStyle: {
                fontFamily: FONTS.JosefinSansBold,
                fontSize: SIZES.medium,
              },
            }}
          />
          <Drawer.Screen
            name="PRIVACY POLICY"
            component={PrivacyPolicy}
            options={{
              drawerIcon: () => (
                <Image
                  source={assets.account}
                  resizeMode="contain"
                  className="w-[25px] h-[25px]"
                />
              ),
              drawerLabelStyle: {
                fontFamily: FONTS.JosefinSansBold,
                fontSize: SIZES.medium,
              },
            }}
          />
          <Drawer.Screen
            name="TERMS OF USE"
            component={TermsOfUse}
            options={{
              drawerIcon: () => (
                <Image
                  source={assets.terms}
                  resizeMode="contain"
                  className="w-[25px] h-[25px]"
                />
              ),
              drawerLabelStyle: {
                fontFamily: FONTS.JosefinSansBold,
                fontSize: SIZES.medium,
              },
            }}
          />
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
    </Provider>
  );
}
