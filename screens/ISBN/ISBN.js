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
import FocusedStatusBar from "../../shared/FocusedStatusBar";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-root-toast";

function ISBN() {
  const [ISBN, setISBN] = useState([]);
  const [searchType, setSearchType] = useState("buy");
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
                    backgroundColor: searchType === "buy" ? "#15803D" : "grey",
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
                    backgroundColor: searchType === "sell" ? "#15803D" : "grey",
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
                    backgroundColor: searchType === "rent" ? "#15803D" : "grey",
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
                className={` ${
                  ISBN.length >= 10 ? "bg-[#15803D]" : "bg-gray-500"
                } py-5 rounded-sm mt-2`}
              >
                <Text
                  onPress={search}
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
                  backgroundColor: "#4E8098",
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

              <View className="bg-white mt-4 px-4 py-4 rounded-lg">
                <Text
                  className="text-center"
                  style={{
                    fontFamily: FONTS.textBold,
                    lineHeight: 20,
                  }}
                >
                  BookHunter is the Ultimate Book Scouting Tool! Imagine every
                  single book you touch you’ll know if it’s profitable or not.
                  When you scan a book, you can see how much profit you’ll make
                  if you sold it on Amazon while at the same time see how much
                  profit you’ll make if you sold it to vendors!
                </Text>
                <Image
                  source={assets.barcode}
                  resizeMode="contain"
                  className="w-[80%] h-[80px] mx-auto mt-4"
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
