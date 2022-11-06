import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Image, View } from "react-native";
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
import { login, reset } from "../../features/userSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { initializeCartRedux } from "../../features/cardSlice";
import Toast from "react-native-root-toast";
import Teams from "../teams/Teams";
import AddMember from "../teams/AddMember";
import Vendors from "../vendors/Vendors";
import { MaterialIcons, Ionicons, Entypo } from "@expo/vector-icons";
import Profile from "../profile/Profile";
import EditMember from "../teams/EditMember";

const Drawer = createDrawerNavigator();

function Home({ navigation, route }) {
  const { user } = route.params;
  const dispatch = useDispatch();

  async function signOut() {
    try {
      await AsyncStorage.clear();
      await dispatch(reset());
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
            // <DrawerContentScrollView
            //   {...props}
            //   style={{ backgroundColor: "red" }}
            // >
            <View className=" py-2 flex-1 justify-between">
              <View>
                <DrawerItemList {...props} />
              </View>
              {!user?.accessToken ? (
                <View>
                  <DrawerItem
                    label="Sign In"
                    onPress={() => navigation.navigate("FIRST LAUNCH")}
                    style={{
                      bottom: 0,
                    }}
                    labelStyle={{
                      fontFamily: FONTS.JosefinSansBold,
                      fontSize: SIZES.medium,
                    }}
                    icon={() => (
                      <MaterialIcons name="logout" size={24} color="black" />
                    )}
                  />
                </View>
              ) : null}
              {user?.accessToken ? (
                <View>
                  <DrawerItem
                    label="Sign Out"
                    onPress={signOut}
                    style={{
                      bottom: 0,
                    }}
                    labelStyle={{
                      fontFamily: FONTS.JosefinSansBold,
                      fontSize: SIZES.medium,
                    }}
                    icon={() => (
                      <MaterialIcons name="logout" size={24} color="black" />
                    )}
                  />
                </View>
              ) : null}
            </View>

            // {/* </DrawerContentScrollView> */}
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
        {/* EditMember */}
        <Drawer.Screen
          name="EditMember"
          component={EditMember}
          options={{
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="EditTrigger"
          component={EditTrigger}
          options={{
            drawerItemStyle: { display: "none" },
          }}
        />
        <Drawer.Screen
          name="AddMember"
          component={AddMember}
          options={{
            drawerItemStyle: { display: "none" },
          }}
        />

        {user?.accessToken && (
          <>
            <Drawer.Screen
              name="PROFILE"
              component={Profile}
              options={{
                drawerIcon: () => (
                  <Ionicons
                    name="ios-settings-outline"
                    size={24}
                    color="black"
                  />
                ),

                drawerLabelStyle: {
                  fontFamily: FONTS.JosefinSansBold,
                  fontSize: SIZES.medium,
                },
              }}
            />
            <Drawer.Screen
              name="TRIGGERS"
              component={Triggers}
              options={{
                drawerIcon: () => (
                  <MaterialIcons name="touch-app" size={24} color="black" />
                ),

                drawerLabelStyle: {
                  fontFamily: FONTS.JosefinSansBold,
                  fontSize: SIZES.medium,
                },
              }}
            />
            <Drawer.Screen
              name="TEAMS"
              component={Teams}
              options={{
                drawerIcon: () => (
                  <Ionicons name="people-outline" size={24} color="black" />
                ),
                drawerLabelStyle: {
                  fontFamily: FONTS.JosefinSansBold,
                  fontSize: SIZES.medium,
                },
              }}
            />
          </>
        )}
        <Drawer.Screen
          name="VENDORS"
          component={Vendors}
          options={{
            drawerIcon: () => <Entypo name="shop" size={24} color="black" />,
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
