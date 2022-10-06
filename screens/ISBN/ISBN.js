import { useState } from "react";
import { Button, Text, TouchableOpacity, View } from "react-native";
import { Searchbar } from "react-native-paper";
import { MaterialCommunityIcons } from "@expo/vector-icons";

function ISBN() {
  const [searchQuery, setSearchQuery] = useState("");
  const onChangeSearch = (query) => setSearchQuery(query);

  return (
    <>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 30,
        }}
      >
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: "#15803D",
          }}
        >
          <Text>Sell</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: "#D74B4B",
          }}
        >
          <Text>Buy</Text>
        </TouchableOpacity>
      </View>
      <Searchbar
        placeholder="ISBN"
        onChangeText={onChangeSearch}
        value={searchQuery}
        style={{
          marginHorizontal: 20,
          marginVertical: 10,
        }}
      />
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
        <Text>OR</Text>
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
          marginHorizontal: 20,
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
          <MaterialCommunityIcons name="barcode-scan" size={24} color="white" />
          <Text
            style={{ marginHorizontal: 5, fontWeight: "bold", color: "white" }}
          >
            SCAN BARCODE
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
}

export default ISBN;
