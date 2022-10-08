import { useState } from "react";
import {
  Button,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
} from "react-native";
// import { Searchbar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { FONTS, COLORS } from "../../constants";
import FocusedStatusBar from "../../shared/FocusedStatusBar";
import InputSearch from "../../shared/components/InputSearch";
import NumberKeypad from "../../shared/components/NumberKeypad";

function ISBN() {
  const [searchQuery, setSearchQuery] = useState("");
  const [ISBN, setISBN] = useState([]);
  const [keypadIsShown, setKeypadIsShown] = useState(true);

  const onChangeSearch = (query) => setSearchQuery(query);
  const onKeypadPress = (data) => {
    setISBN((prev) => [...prev, data]);
  };
  const clear = () => {
    setISBN([]);
  };

  const toggleKeypad = () => {
    setKeypadIsShown((prev) => !prev);
  };

  return (
    <>
      <SafeAreaView style={{ flex: 1, marginHorizontal: 20 }}>
        <FocusedStatusBar backgroundColor={COLORS.black} />

        <View className="flex flex-row items-center justify-center mt-12 mb-4">
          <TouchableOpacity
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
              backgroundColor: "#15803D",
            }}
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
              backgroundColor: "#D74B4B",
            }}
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
              backgroundColor: "#DC582A",
            }}
          >
            <Text
              className="text-white text-2xl"
              style={{ fontFamily: FONTS.bold }}
            >
              Rent
            </Text>
          </TouchableOpacity>
        </View>
        {/* <Searchbar
          placeholder="ISBN"
          onChangeText={onChangeSearch}
          value={searchQuery}
          style={{
            marginVertical: 10,
            fontFamily: FONTS.bold,
          }}
        /> */}
        <InputSearch ISBN={ISBN} onShow={() => setKeypadIsShown(true)} />
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
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
      </SafeAreaView>
      {keypadIsShown && (
        <View className="flex-1 bg-slate-500 mt-28">
          <NumberKeypad
            onPress={onKeypadPress}
            onClear={clear}
            onHide={toggleKeypad}
          />
        </View>
      )}
    </>
  );
}

export default ISBN;
