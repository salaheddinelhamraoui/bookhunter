import { useState } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  ScrollView,
  Image,
} from "react-native";
import Scanner from "./Scanner";
import { Searchbar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FONTS, COLORS, assets } from "../../constants";
import FocusedStatusBar from "../../components/FocusedStatusBar";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";

function ISBN() {
  const [ISBN, setISBN] = useState([]);
  const [searchType, setSearchType] = useState("sell");
  const [openScanner, setOpenScanner] = useState(false);
  const navigation = useNavigation();

  function getScannedISBN(isbn) {
    setISBN(isbn);
    setOpenScanner(false);
    navigation.navigate("ISBN RESULT", {
      isbn: isbn,
      type: searchType,
    });
  }

  function onISBNChange(isbn) {
    var character = "[$&+,:;=?@#|'<>.^*()%!-]";
    var regex = new RegExp(character, "g");
    isbn = isbn.replace(regex, "");
    setISBN(isbn);
  }

  function search() {
    if (ISBN.length >= 10) {
      navigation.navigate("ISBN RESULT", {
        isbn: ISBN,
        type: searchType,
      });
    } else {
      Toast.show("Invalid ISBN", {
        duration: Toast.durations.SHORT,
        position: Toast.positions.BOTTOM,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });
    }
  }

  return (
    <>
      {!openScanner ? (
        <SafeAreaView style={{ flex: 1, marginHorizontal: 20 }}>
          <FocusedStatusBar backgroundColor={COLORS.black} />
          <ScrollView>
            <View>
              <View className="flex flex-row items-center justify-center mt-12 mb-4 ">
                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    backgroundColor: searchType === "buy" ? "#82d9d9" : "grey",
                  }}
                  onPress={() => setSearchType("buy")}
                >
                  <Text
                    className="text-white text-2xl"
                    style={{ fontFamily: FONTS.bold }}
                  >
                    Buy
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    backgroundColor: searchType === "sell" ? "#82d9d9" : "grey",
                  }}
                  onPress={() => setSearchType("sell")}
                >
                  <Text
                    className="text-white text-2xl"
                    style={{ fontFamily: FONTS.bold }}
                  >
                    Sell
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 20,
                    backgroundColor: searchType === "rent" ? "#82d9d9" : "grey",
                  }}
                  onPress={() => setSearchType("rent")}
                >
                  <Text
                    className="text-white text-2xl"
                    style={{ fontFamily: FONTS.bold }}
                  >
                    Rent
                  </Text>
                </TouchableOpacity>
              </View>
              <Searchbar
                onSubmitEditing={search}
                placeholder="ISBN Code"
                value={ISBN}
                keyboardType="decimal-pad"
                onChangeText={(isbn) => onISBNChange(isbn)}
              />
              <TouchableOpacity
                onPressIn={search}
                className={` ${
                  ISBN.length >= 10 ? "bg-[#82d9d9]" : "bg-gray-400"
                } py-5 rounded-sm mt-2`}
              >
                <Text
                  className="text-center text-gray-50 text-lg"
                  style={{ fontFamily: FONTS.JosefinSansBold }}
                >
                  Search
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                className="mt-4"
              >
                <Text
                  style={{
                    height: 2,
                    width: "40%",
                    backgroundColor: "#888",
                    marginHorizontal: 5,
                  }}
                />
                <Text
                  className="text-black text-2xl"
                  style={{ fontFamily: FONTS.bold }}
                >
                  OR
                </Text>
                <Text
                  style={{
                    height: 2,
                    width: "40%",
                    backgroundColor: "#888",
                    marginHorizontal: 5,
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={() => {
                  setOpenScanner(true);
                }}
                style={{
                  marginVertical: 10,
                  paddingVertical: 20,
                  alignItems: "center",
                  backgroundColor: "#393e59",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="barcode-scan"
                    size={24}
                    color="white"
                  />
                  <Text
                    style={{ fontFamily: FONTS.bold }}
                    className="text-white text-2xl ml-2"
                  >
                    SCAN BARCODE
                  </Text>
                </View>
              </TouchableOpacity>
              <View className="rounded-lg">
                <Image
                  source={assets.barcode}
                  resizeMode="contain"
                  className="w-[80%] h-[230px] mx-auto mt-4 rounded-lg"
                />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      ) : (
        <Scanner
          getScannedISBN={getScannedISBN}
          closeScanner={() => setOpenScanner(false)}
        />
      )}
    </>
  );
}

export default ISBN;
