import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, Text } from "react-native";
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
import Triggers from "../triggers/Triggers";
import EditTrigger from "../triggers/EditTrigger";
import { login, logout } from "../../features/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { initializeCartRedux } from "../../features/cardSlice";
import Toast from "react-native-root-toast";

const Drawer = createDrawerNavigator();

function Home({ navigation, route }) {
  const { user } = route.params;
  const dispatch = useDispatch();

  async function signOut() {
    try {
      console.log("SIGNOUT");
      await AsyncStorage.clear();
      dispatch(logout());
      navigation.replace("FIRST LAUNCH");
    } catch (error) {
      navigation.replace("FIRST LAUNCH");
      console.log(error);
    }
  }

  async function initializeCart() {
    try {
      const cartStringify = await AsyncStorage.getItem("cartData");
      const cartJson = await JSON.parse(cartStringify);
      if (cartJson?.qty > 0) {
        dispatch(initializeCartRedux(cartJson));
      }
      return;
    } catch (error) {
      console.log(error);
      Toast.show("Something goes wrong, Please try again!", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.CENTER,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
        containerStyle: {
          backgroundColor: "#FF8787",
          height: 60,
          justifyContent: "center",
        },
      });
    }
  }

  useEffect(() => {
    console.log("USEEFFECT");
    dispatch(login(user));
    initializeCart();
  }, [user]);

  return (
    <NavigationContainer independent={true}>
      <NavBar />
      <Drawer.Navigator
        useLegacyImplementation={true}
        initialRouteName="ISBN SCANNER"
        screenOptions={{
          headerShown: false,
        }}
        drawerContent={(props) => {
          return (
            <DrawerContentScrollView {...props}>
              <DrawerItemList {...props} />
              <DrawerItem label="Sign Out" onPress={signOut} />
            </DrawerContentScrollView>
          );
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
          name="EditTrigger"
          component={EditTrigger}
          options={{
            drawerItemStyle: { display: "none" },
          }}
        />
        {user?.accessToken && (
          <Drawer.Screen
            name="TRIGGERS"
            component={Triggers}
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
        )}
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
