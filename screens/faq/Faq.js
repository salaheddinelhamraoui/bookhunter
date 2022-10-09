import { View, Text, ScrollView } from "react-native";
import React from "react";
import { FONTS, SIZES } from "../../constants";

const Faq = () => {
  return (
    <ScrollView>
      <View className="mx-4 my-4 bg-white px-4 py-4 rounded-lg">
        <Text
          className="text-center"
          style={{
            fontFamily: FONTS.JosefinSansBold,
          }}
        >
          FAQs
        </Text>
      </View>
      <View className="mx-4 bg-white px-4 py-4 rounded-lg mb-6">
        <Text
          className=""
          style={{
            fontFamily: FONTS.textRegular,
          }}
        ></Text>
      </View>
    </ScrollView>
  );
};

export default Faq;
