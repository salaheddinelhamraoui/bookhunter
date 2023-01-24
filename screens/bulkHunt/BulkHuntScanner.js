import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  StyleSheet,
  Button,
  useWindowDimensions,
  Pressable,
} from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FONTS } from "../../constants";
import Toast from "react-native-root-toast";
import { useIsFocused, useNavigation } from "@react-navigation/native";

export default function BulkHuntScanner({ route }) {
  const [hasPermission, setHasPermission] = useState(null);
  const windowWidth = useWindowDimensions().width;
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [isbns, setIsbns] = useState([]);

  function showToast(text) {
    Toast.show(text, {
      duration: Toast.durations.SHORT,
      position: Toast.positions.BOTTOM,
      shadow: true,
      animation: true,
      hideOnPress: true,
      delay: 0,
    });
  }

  const askForCameraPermission = () => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  };

  // Request Camera Permission
  useEffect(() => {
    askForCameraPermission();
  }, []);

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ data }) => {
    // sleep(1000).then(() => setIsbns((prev) => [...prev, data]));

    navigation.navigate("BULK HUNT", {
      isbn: data,
      type: "sell",
    });
    showToast("QR Code Scanned");
  };

  // Check permissions and return the screens
  if (hasPermission === null) {
    return showToast("Requesting for camera permission");
  }
  if (hasPermission === false) {
    return (
      <View className="flex-1">
        <Text style={{ margin: 10 }}>No access to camera</Text>
        <Button
          title={"Allow Camera"}
          onPress={() => askForCameraPermission()}
        />
      </View>
    );
  }

  // Return the View
  return (
    <>
      {isFocused && (
        <View className="flex-1 w-full mt-12">
          {/* <Pressable onPress={() => setIsbns([])}>
            <Text>CLEAR</Text>
          </Pressable> */}
          <View style={styles.barcodebox} className="mt-8 w-full">
            <BarCodeScanner
              onBarCodeScanned={handleBarCodeScanned}
              style={{ height: 600, width: windowWidth }}
            />
          </View>
          <View className="py-4 align-middle flex-row justify-center gap-5">
            <Text
              className="text-center text-lg"
              style={{ fontFamily: FONTS.JosefinSansBold }}
            >
              Place Over Barcode
            </Text>
          </View>
          <View className="absolute w-full bottom-5 mx-auto flex-1">
            <TouchableOpacity
              onPress={() => navigation.navigate("BULK HUNT")}
              className="mx-auto bg-greyBlue py-3 px-2 rounded-lg w-[200px]"
            >
              <Text
                style={{ fontFamily: FONTS.JosefinSansBold }}
                className="text-base text-center text-white"
              >
                Back
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  maintext: {
    fontSize: 16,
    margin: 20,
  },
  barcodebox: {
    alignItems: "center",
    justifyContent: "center",
    height: 150,
    overflow: "hidden",
  },
});
