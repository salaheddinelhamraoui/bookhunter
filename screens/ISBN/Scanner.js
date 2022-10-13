import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { BarCodeScanner } from "expo-barcode-scanner";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FONTS } from "../../constants";
import Toast from "react-native-root-toast";
import { FontAwesome } from "@expo/vector-icons";

export default function Scanner({ getScannedISBN, closeScanner }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [text, setText] = useState("No ISBN Scanned");

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

  // What happens when we scan the bar code
  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    setText(data);
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
    <View className="flex-1 ">
      <View style={styles.barcodebox} className="mt-8">
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
          style={({ height: 400, width: 400 }, StyleSheet.absoluteFill)}
        />
      </View>
      <View className="py-4 align-middle flex-row justify-center gap-5">
        {scanned && <FontAwesome name="barcode" size={24} color="black" />}
        <Text
          className="text-center text-lg"
          style={{ fontFamily: FONTS.JosefinSansBold }}
        >
          {text}
        </Text>
      </View>

      {scanned && (
        <View className="flex-row gap-10 justify-center">
          <TouchableOpacity
            onPress={() => {
              setText("No ISBN Scanned");
              setScanned(false);
            }}
            className="bg-red-400 py-3 px-2 rounded-lg w-[140px]"
          >
            <Text
              style={{ fontFamily: FONTS.JosefinSansBold }}
              className="text-base text-center text-white"
            >
              Scanne Again?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => getScannedISBN(text)}
            className="bg-green-400 py-3 px-2 rounded-lg w-[140px]"
          >
            <Text
              style={{ fontFamily: FONTS.JosefinSansBold }}
              className="text-base text-center text-white"
            >
              Confirme
            </Text>
          </TouchableOpacity>
        </View>
      )}
      <View style={{ margin: 20 }} className=" flex-1">
        <TouchableOpacity
          onPress={closeScanner}
          className=" bg-red-500 py-3 px-2 rounded-lg "
        >
          <Text
            style={{ fontFamily: FONTS.JosefinSansBold }}
            className="text-base text-center text-white"
          >
            Cancel
          </Text>
        </TouchableOpacity>
      </View>
    </View>
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
    height: 300,
    overflow: "hidden",
  },
});
