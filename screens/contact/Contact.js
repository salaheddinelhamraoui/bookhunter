import { View, Text, ScrollView } from "react-native";
import React from "react";
import { FONTS, SIZES } from "../../constants";

const Contact = () => {
  return (
    <ScrollView>
      <View className="mx-4 my-4 bg-white px-4 py-4 rounded-lg">
        <Text
          className="text-center"
          style={{
            fontFamily: FONTS.JosefinSansBold,
          }}
        >
          CONTACT US
        </Text>
      </View>
      <View className="mx-4 bg-white px-4 py-4 rounded-lg mb-6">

        <Text
          className=""
          style={{
            fontFamily: FONTS.textRegular,
            fontSize: SIZES.medium,
          }}
        >
          Should you experience any problems or wish to share any comments, suggestions, or feedback for this site, please let us know using the form below.
        </Text>
        <Text
          style={{
            fontFamily: FONTS.JosefinSansBold,
            fontSize: SIZES.medium,
          }}
        >
          {'\n'}
          Support@BookHunter.com
        </Text>
        <Text style={{
          fontFamily: FONTS.JosefinSansBold,
          fontSize: SIZES.medium,
        }}>{"\n"}Join Our{" "}
          <Text className="text-blue-500">Facebook Community</Text>
        </Text>
      </View>
    </ScrollView>
  );
};

export default Contact;
