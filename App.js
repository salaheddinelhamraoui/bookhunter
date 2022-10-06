import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet, Platform, SafeAreaView } from "react-native";
import ISBN from "./screens/ISBN/ISBN";

export default function App() {
  return (
    <SafeAreaView style={styles.AndroidSafeArea}>
      <View className="flex-1 bg-white">
        {/* <Text className="bg-slate-600">hello</Text> */}
        <ISBN />
        <StatusBar style="auto" />
      </View>
    </SafeAreaView>
  );
}

const styles = {
  AndroidSafeArea: {
    flex: 1,
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
};
