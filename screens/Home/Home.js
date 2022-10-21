import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image } from "react-native";
import NavBar from "../../components/NavBar";
import { assets, FONTS, SIZES } from "../../constants";
import Cart from "../cart/Cart";
import Contact from "../contact/Contact";
import Faq from "../faq/Faq";
import ISBN from "../ISBN/ISBN";
import ISBNResult from "../ISBN/ISBNResult";
import Scanner from "../ISBN/Scanner";
import PrivacyPolicy from "../privacyPolicy/PrivacyPolicy";
import TermsOfUse from "../termsOfUse/TermsOfUse";

const Drawer = createDrawerNavigator();

function Home() {
  return (
    <NavigationContainer independent={true}>
      <NavBar />
      <Drawer.Navigator
        useLegacyImplementation={true}
        initialRouteName="ISBN SCANNER"
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
        <Drawer.Screen
          name="CART"
          component={Cart}
          options={{
            drawerItemStyle: {
              display: "none",
            },
          }}
        />
        <Drawer.Screen
          name="ISBN RESULT"
          component={ISBNResult}
          options={{
            drawerItemStyle: {
              display: "none",
            },
          }}
        />
        <Drawer.Screen
          name="SCANNER"
          component={Scanner}
          options={{
            drawerItemStyle: {
              display: "none",
            },
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Home;
